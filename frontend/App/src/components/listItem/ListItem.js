import React from 'react';
import styles from './styles';
import PropTypes from 'prop-types';
import { Text, View, TouchableOpacity } from 'react-native';
import ThumbnailInitials from '../thumbnailInitials/ThumbnailInitials';
import Icon from '../icon/Icon';

export const ListItem = ({
  title,
  user,
  date,
  description,
  comments,
  onPress,
  projectName,
  icon,
  color
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.thumb}>
        {icon ? (
          <View
            style={[styles.notification, color && { backgroundColor: color }]}
          >
            <Icon name={icon} fill="#fff" height="14" width="14" />
          </View>
        ) : null}
        <ThumbnailInitials name={user} size={40} />
      </View>
      <View style={styles.textContainer}>
        {projectName ? (
          <Text style={styles.projectName}>{projectName}</Text>
        ) : null}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>
          {/* if is project then not show question sentence} */}
          {!projectName ? 'Question by ' : null}
          {date}
        </Text>
        {/* description of question if is a question } */}
        {description ? (
          <Text style={styles.description}>{description}</Text>
        ) : null}
      </View>

      {/* if is not have comments not show icon} */}
      {comments ? (
        <View style={styles.counterContainer}>
          <Text style={styles.counterText}> {comments}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.string,
  comments: PropTypes.string,
  date: PropTypes.string,
  description: PropTypes.string,
  onPress: PropTypes.func,
  projectName: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string
};
export default ListItem;
