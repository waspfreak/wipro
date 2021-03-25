import React from 'react';
import { Button, Text, ScrollView } from 'react-native';
import styles from './styles';
import { useGlobalStore } from '../../stores/globalStore';

export const User = () => {
  const [oneTaskStore, dispatch] = useGlobalStore();
  const { userStatus, signOut } = oneTaskStore;

  console.log('oneTaskStore', oneTaskStore);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>The User screen aka 'My stuff' lives here</Text>
      <Button
        title="Test global state"
        onPress={() =>
          dispatch({ type: 'SIGN_IN', payload: { userStatus: false } })
        }
      />
      <Button title="Sign Out" tertiary onPress={signOut} />
      <Text>{JSON.stringify({ userStatus })}</Text>
    </ScrollView>
  );
};

export default User;
