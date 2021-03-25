import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import TabBarIcon from '../components/tabBarIcon/TabBarIcon';
import Home from '../screens/home/Home';
import User from '../screens/user/User';
import Activities from '../screens/activities/Activities';
import NewProjectOrTeam from '../screens/newProjectOrTeam/NewProjectOrTeam';
import Hey from '../screens/hey/Hey';
import Find from '../screens/find/Find';
import MakeTopic from '../screens/makeTopic/MakeTopic';
import Topic from '../screens/topic/Topic';

const HomeStack = createStackNavigator({
  Home: Home,
  NewProjectOrTeam: NewProjectOrTeam,
  MakeTopic: MakeTopic,
  Topic: Topic
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  screen: Home,
  title: 'Home',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="Home" />
};

HomeStack.path = 'start';

const UserStack = createStackNavigator({
  Settings: User
});

UserStack.navigationOptions = {
  tabBarLabel: 'Me',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="User" />
};

UserStack.path = 'user';

const ActivitiesStack = createStackNavigator({
  Activities: Activities
});

ActivitiesStack.navigationOptions = {
  tabBarLabel: 'Activity',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="Activity" />
};

ActivitiesStack.path = 'Activity';

const HeyStack = createStackNavigator({
  Hey: Hey
});

HeyStack.navigationOptions = {
  tabBarLabel: 'Hey',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="Hey" />
};

HeyStack.path = 'Hey';

const FindStack = createStackNavigator({
  Find: Find
});

FindStack.navigationOptions = {
  tabBarLabel: 'Find',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="Find" />
};

FindStack.path = 'Find';

const NewProjectOrTeamStack = createStackNavigator({
  NewProjectOrTeam: NewProjectOrTeam,
  MakeTopic: MakeTopic
});

NewProjectOrTeamStack.navigationOptions = {
  screen: NewProjectOrTeam,
  tabBarLabel: 'New project or team'
};
NewProjectOrTeamStack.path = '';

const MakeTopicStack = createStackNavigator({
  MakeTopic: MakeTopic,
  Topic: Topic
});

MakeTopicStack.navigationOptions = {
  screen: MakeTopic,
  tabBarLabel: 'Make a Topic'
};
MakeTopicStack.path = '';

const TopicStack = createStackNavigator({
  Topic: Topic
});

TopicStack.navigationOptions = {
  screen: Topic,
  tabBarLabel: 'Topic'
};
TopicStack.path = '';

const tabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    HeyStack,
    ActivitiesStack,
    FindStack,
    UserStack
  },
  {
    tabBarOptions: {
      labelStyle: {
        fontSize: 12
      }
    }
  }
);

tabNavigator.path = '';

export default tabNavigator;
