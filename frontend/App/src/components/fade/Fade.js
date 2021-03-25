import React, { useEffect, useState } from 'react';
import { Animated, ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';

const Fade = ({ onFadeComplete, duration, style, children, trigger }) => {
  const [viewOpacity, setViewOpacity] = useState(new Animated.Value(0));
  useEffect(() => {
    if (trigger) {
      Animated.timing(viewOpacity, {
        toValue: 1,
        duration
      }).start(onFadeComplete || (() => {}));
    } else {
      setViewOpacity(new Animated.Value(0));
    }
  }, [duration, onFadeComplete, trigger, viewOpacity]);

  return (
    <Animated.View style={[{ opacity: viewOpacity }].concat(style || [])}>
      {children}
    </Animated.View>
  );
};

Fade.propTypes = {
  onFadeComplete: PropTypes.func,
  duration: PropTypes.number,
  style: ViewPropTypes.style,
  children: PropTypes.node,
  trigger: PropTypes.bool
};

export default Fade;
