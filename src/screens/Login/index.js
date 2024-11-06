// AuthScreen.js
import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../actions/actions';
import TextInput from 'react-native-text-input-interactive';

export default function AuthScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (username && password) {
      dispatch(loginUser(username)); // Dispatch the login action
    //   navigation.replace('Main',{ screen: 'Home' }); // Navigate to the Home screen
    } else {
      Alert.alert('Error', 'Please enter valid credentials');
    }
  };

  const handleSignup = () => {
    if (username && password && password === confirmPassword) {
      // Handle the signup logic here (e.g., API call)
      Alert.alert('Success', 'Account created successfully!');
      setIsLogin(true); // Switch back to login mode after successful signup
    } else {
      Alert.alert('Error', 'Please fill in all fields and ensure passwords match.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo Image */}
      <Image
        source={require('../../../assets/images/icon.png')} // Adjust the path according to your project structure
        style={styles.logo}
      />
      <Text style={styles.title}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        placeholder="Enter Username"
        placeholderTextColor="#888"
        style={styles.input}
        textInputStyle={styles.textInputStyle}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter Password"
        placeholderTextColor="#888"
        secureTextEntry
        style={styles.input}
        textInputStyle={styles.textInputStyle}
      />
      {!isLogin && (
        <TextInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
          textInputStyle={styles.textInputStyle}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={isLogin ? handleLogin : handleSignup}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>
          {isLogin ? "Don't have an account? Sign Up" : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#26c761', // Background color
  },
  logo: {
    width: 100, // Adjust the width as necessary
    height: 100, // Adjust the height as necessary
    marginBottom: 20, // Space between logo and title
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff', // Change title color to white for better contrast
  },
  input: {
    width: '100%',
    marginBottom: 15,
  },
  textInputStyle: {
    backgroundColor: '#fff', // Input background color
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  button: {
    backgroundColor: '#0056b3', // Darker blue for better visibility
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 30,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff', // Button text color
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleText: {
    marginTop: 15,
    color: '#fff', // Change toggle text color to white for better contrast
    textDecorationLine: 'underline',
  },
});
