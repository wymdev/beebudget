import React, { useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setFirstTimeUser } from '../../actions/actions';

export default function WelcomeScreen({ navigation }) {
  const dispatch = useDispatch();

  const handleContinue = () => {
    dispatch(setFirstTimeUser(false));
    navigation.replace('Login');
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome to the App!</Text>
      <Button title="Continue" onPress={handleContinue} />
    </View>
  );
}
