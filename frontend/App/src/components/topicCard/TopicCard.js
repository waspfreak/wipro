import React, { useState, useCallback } from 'react';
import styles from './styles';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import ThumbnailInitials from '../thumbnailInitials/ThumbnailInitials';
import { iconPing } from '../../assets/images/index';
import { trimStringTolength } from '../../utils/stringUtils';

const useComponentSize = () => {
  const [state, setState] = useState({
    titleNumberOfLines: null,
    titleHeight: null
  });

  const onLayout = useCallback(event => {
    const numberOfLines = event.nativeEvent.lines.length;
    const totalHeight = event.nativeEvent.lines.reduce(
      (acc, line) => acc + line.height,
      0
    );
    setState({
      titleNumberOfLines: numberOfLines,
      titleHeight: totalHeight
    });
  }, []);

  return [state, onLayout];
};

const TopicCard = ({ title, description, onPress, members }) => {
  const totalMembers = members ? members.length : 1;
  const maxThumbnails = 4;
  const [state, onLayout] = useComponentSize();
  /* Title take precedence, the longer it is, the less description to be displayed */
  const showDescription = state.titleHeight < 50;
  const titleCharLimit = state.titleHeight > 50 ? 40 : 60;
  const summaryCharLimit = state.titleHeight > 50 ? 20 : 45;

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(title)}>
      <View style={styles.topContainer}>
        <View style={styles.titleContainer}>
          <Text onTextLayout={onLayout} style={styles.title} testID="Title">
            {trimStringTolength(title, titleCharLimit)}
          </Text>
        </View>
        <TouchableOpacity>
          <View style={styles.iconContainer}>
            <Image source={iconPing} />
          </View>
        </TouchableOpacity>
      </View>
      {showDescription && (
        <View>
          <Text style={styles.summary}>
            {trimStringTolength(description, summaryCharLimit)}
          </Text>
        </View>
      )}
      <View style={styles.membersContainer}>
        <View style={styles.members}>
          {members &&
            members.map((member, index) => {
              return (
                index < maxThumbnails && (
                  <ThumbnailInitials key={index} name={member} size={25} />
                )
              );
            })}

          {members && totalMembers >= maxThumbnails && (
            <ThumbnailInitials
              key={totalMembers.length}
              name="test"
              size={25}
              extraMembers={totalMembers - maxThumbnails}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

TopicCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onPress: PropTypes.func,
  members: PropTypes.array
};
export default TopicCard;
