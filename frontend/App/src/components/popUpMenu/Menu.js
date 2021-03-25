import React from 'react';
import styles from './styles';
import PropTypes from 'prop-types';
import {
  Animated,
  Dimensions,
  Easing,
  Modal,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes
} from 'react-native';

const STATES = {
  MEASURING: 'MEASURING',
  CALCULATING: 'CALCULATING',
  SHOWN: 'SHOWN',
  HIDDEN: 'HIDDEN',
  ANIMATING: 'ANIMATING'
};

const ANIMATION_DURATION = 300;
const EASING = Easing.bezier(0.4, 0, 0.2, 1);
const SCREEN_INDENT = 8;

export const Position = Object.freeze({
  TOP_LEFT: 'TOP_LEFT',
  TOP_RIGHT: 'TOP_RIGHT'
});

const normalizeOffset = extraOffset => {
  const reducer = ({ left, top }, [prop, value]) => {
    if (prop === 'left') {
      left += value;
    } else if (prop === 'right') {
      left -= value;
    } else if (prop === 'top') {
      top += value;
    } else if (prop === 'bottom') {
      top -= value;
    }
    return { left, top };
  };

  return Object.entries(extraOffset).reduce(reducer, { left: 0, top: 0 });
};

const getSummarizedOffset = offsetList => {
  const reducer = (acc, { left, top }) => ({
    left: acc.left + left,
    top: acc.top + top
  });
  return offsetList.reduce(reducer, { left: 0, top: 0 });
};

const getMenuOffset = (stickTo, component, menu) => {
  if (stickTo === Position.TOP_RIGHT) {
    const left = component.left;
    const top = component.top;
    return { left, top };
  }

  if (stickTo === Position.TOP_LEFT) {
    const left = component.left;
    const top = component.top;
    return { left, top };
  }

  return null;
};

const getComputedOffset = (func, left, top, width, height) => {
  if (func) {
    const extraOffset = func(left, top, width, height);
    return normalizeOffset(extraOffset);
  }
  return null;
};

class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuState: STATES.HIDDEN,
      stickTo: Position.TOP_LEFT,
      component: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      },
      menu: {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      },
      offsets: {
        staticOffset: {
          left: 0,
          top: 0
        },
        computedOffset: {
          left: 0,
          top: 0
        }
      },
      animation: {
        menuSize: new Animated.ValueXY({ x: 0, y: 0 }),
        opacity: new Animated.Value(0)
      }
    };
  }

  componentDidUpdate() {
    const { menuState, menu } = this.state;

    if (menuState === STATES.ANIMATING) {
      return;
    }
    if (menuState === STATES.CALCULATING) {
      const { stickTo, component, offsets } = this.state;

      const baseOffset = getMenuOffset(stickTo, component, menu);
      const allOffsets = [
        baseOffset,
        offsets.staticOffset,
        offsets.computedOffset
      ];
      const finalOffset = getSummarizedOffset(allOffsets);
      this.setState({
        menuState: STATES.SHOWN,
        menu: {
          ...menu,
          left: finalOffset.left,
          top: finalOffset.top
        }
      });
    } else if (menuState === STATES.SHOWN) {
      const { animation } = this.state;
      this.setState(
        {
          menuState: STATES.ANIMATING
        },
        () => {
          Animated.parallel([
            Animated.timing(animation.menuSize, {
              toValue: { x: menu.width, y: menu.height },
              duration: ANIMATION_DURATION,
              easing: EASING
            }),
            Animated.timing(animation.opacity, {
              toValue: 1,
              duration: ANIMATION_DURATION,
              easing: EASING
            })
          ]).start();
        }
      );
    }
  }

  show = (
    componentRef,
    stickTo = null,
    extraOffset = null,
    computeOffset = null
  ) => {
    if (componentRef) {
      componentRef.measureInWindow((x, y, width, height) => {
        const top = Math.max(SCREEN_INDENT, y);
        const left = Math.max(SCREEN_INDENT, x);

        const computedOffset = getComputedOffset(
          computeOffset,
          left,
          top,
          width,
          height
        );
        const oldOffsets = { ...this.state.offsets };
        const newState = {
          menuState: STATES.MEASURING,
          component: { left, top, width, height },
          offsets: {
            ...oldOffsets,
            ...(extraOffset ? { staticOffset: extraOffset } : {}),
            ...(computedOffset ? { computedOffset } : {})
          },
          ...(stickTo ? { stickTo } : {})
        };
        this.setState(newState);
      });
    }
  };

  /* Measure new menu width and height */
  _onMenuLayout = event => {
    const { width, height } = event.nativeEvent.layout;
    const { menuState, menu } = this.state;

    if (menuState === STATES.MEASURING) {
      this.setState({
        menuState: STATES.CALCULATING,
        menu: {
          ...menu,
          width,
          height
        }
      });
    }
  };

  _onDismiss = () => {
    if (this.props.onHidden) {
      this.props.onHidden();
    }
  };

  hide = () => {
    const { animation } = this.state;
    Animated.timing(this.state.animation.opacity, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      easing: EASING
    }).start(() => {
      /* Reset state */
      this.setState(
        {
          menuState: STATES.HIDDEN,
          animation: {
            ...animation,
            menuSize: new Animated.ValueXY({ x: 0, y: 0 }),
            opacity: new Animated.Value(0)
          }
        },
        () => {
          /* Invoke onHidden callback if defined */
          if (Platform.OS !== 'ios' && this.props.onHidden) {
            this.props.onHidden();
          }
        }
      );
    });
  };

  getChevronStyle = () => {};

  render() {
    const dimensions = Dimensions.get('screen');
    const { menu, component, animation, stickTo } = this.state;
    const menuSize = {
      width: animation.menuSize.x,
      height: animation.menuSize.y
    };

    /* Adjust position of menu */
    const transforms = [];

    /* Flip by X axis if menu hits right screen border */
    if (menu.left > dimensions.width - menu.width - SCREEN_INDENT) {
      transforms.push({
        translateX: Animated.multiply(animation.menuSize.x, -1)
      });

      menu.left = Math.min(
        dimensions.width - SCREEN_INDENT,
        menu.left + component.width
      );
    }

    /* Flip by Y axis if menu hits bottom screen border */
    if (menu.top > dimensions.height - menu.height - SCREEN_INDENT) {
      transforms.push({
        translateY: Animated.multiply(animation.menuSize.y, -1)
      });

      menu.top = Math.min(
        dimensions.height - SCREEN_INDENT,
        menu.top + component.height
      );
    }

    const shadowMenuContainerStyle = {
      opacity: animation.opacity,
      transform: transforms,
      left: menu.left,
      top: menu.top
    };

    const { menuState } = this.state;
    const animationStarted = menuState === STATES.ANIMATING;
    const modalVisible =
      menuState === STATES.MEASURING ||
      menuState === STATES.CALCULATING ||
      menuState === STATES.SHOWN ||
      animationStarted;

    const { testID, style, children } = this.props;

    return (
      <View collapsable={false} testID={testID}>
        <Modal
          visible={modalVisible}
          onRequestClose={this.hide}
          supportedOrientations={[
            'portrait',
            'portrait-upside-down',
            'landscape',
            'landscape-left',
            'landscape-right'
          ]}
          transparent
          onDismiss={this._onDismiss}
        >
          <TouchableWithoutFeedback onPress={this.hide}>
            <View style={StyleSheet.absoluteFill}>
              <Animated.View
                {...(!animationStarted ? { onLayout: this._onMenuLayout } : {})}
                style={[
                  styles.shadowMenuContainer,
                  shadowMenuContainerStyle,
                  style
                ]}
              >
                <View>
                  <Animated.View
                    style={[styles.Menu, animationStarted && menuSize]}
                  >
                    <View
                      style={[
                        styles.chevronTopRightMenu,
                        stickTo === Position.TOP_LEFT
                          ? styles.chevronTopLeftMenu
                          : null
                      ]}
                    />
                    {children}
                  </Animated.View>
                </View>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    );
  }
}

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  onHidden: PropTypes.func,
  style: ViewPropTypes.style,
  testID: ViewPropTypes.testID
};

export default Menu;
