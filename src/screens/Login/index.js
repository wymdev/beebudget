// AuthScreen.js
import React, { useState, useRef } from 'react';
import { View, Text, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginUser  , registerUser } from '../../actions/actions';
import TextInput from 'react-native-text-input-interactive';
import SweetAlert from '../../components/SweetAlert'

export default function AuthScreen({ navigation }) {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  const sweetAlertRef = useRef();

  const handleLogin = async() => {
    if (username && password) {
      // Dispatch the login action
      const user = await dispatch(loginUser(username, password)); // Assuming loginUser takes both username and password
      console.log('LoginInformation>>>>',user);

      // Check if the user was successfully logged in
      if (user && user.success) {
        // Navigate to the Home screen if login is successful
        sweetAlertRef.current.showSweetAlert({
          title: 'Login Success',
          text: '',
          showCancelButton: false,
          cancelButtonText: '',
          confirmButtonText: 'OK',
          onConfirm: () => {
            console.log('OK');
            navigation.replace('Main', { screen: 'Home' });
          },
          onClose: () => {
            console.log('Closing alert');
          },
          type: 'success', // Can be 'info', 'success', 'danger', 'warning'
        });
        // navigation.replace('Main', { screen: 'Home' });
      } else {
        // If login fails, show an alert with an error message
        // Alert.alert('Login Failed', 'Incorrect username or password. Please try again.');
        sweetAlertRef.current.showSweetAlert({
          title: 'Login Failed',
          text: 'Your username or password is incorrect.',
          showCancelButton: false,
          cancelButtonText: '',
          confirmButtonText: 'Try Again',
          onConfirm: () => {
            console.log('Try again');
          },
          onClose: () => {
            console.log('Closing alert');
          },
          type: 'danger', // Can be 'info', 'success', 'danger', 'warning'
        });
      }
    } else {
      // If either username or password is missing, show an alert
      sweetAlertRef.current.showSweetAlert({
        title: 'Login Failed',
        text: 'Please fill both username and password',
        showCancelButton: false,
        cancelButtonText: '',
        confirmButtonText: 'Try Again',
        onConfirm: () => {
          console.log('Try again');
        },
        onClose: () => {
          console.log('Closing alert');
        },
        type: 'warning', // Can be 'info', 'success', 'danger', 'warning'
      });
    }
  };

  // const handleSignup = () => {
  //   if (username && password && password === confirmPassword) {
  //     // Handle the signup logic here (e.g., API call)
  //     Alert.alert('Success', 'Account created successfully!');
  //     setIsLogin(true); // Switch back to login mode after successful signup
  //   } else {
  //     Alert.alert('Error', 'Please fill in all fields and ensure passwords match.');
  //   }
  // };
  const handleSignup = async () => {
    if (username && password && password === confirmPassword) {
      // Call the registerUser action
      const result = await dispatch(registerUser(username, password));
      
      if (result.success) {
        // Show success alert
        sweetAlertRef.current.showSweetAlert({
          title: 'Success',
          text: 'Account created successfully!',
          showCancelButton: false,
          confirmButtonText: 'OK',
          onConfirm: () => setIsLogin(true), // Switch to login mode
          onClose: () => console.log('Closing signup success alert'),
          type: 'success',
        });
        setIsLogin(true);
      } else {
        sweetAlertRef.current.showSweetAlert({
          title: 'Error',
          text: 'Could not create account. Please try again.',
          showCancelButton: false,
          confirmButtonText: 'OK',
          onConfirm: () => console.log('Retry signup'),
          onClose: () => console.log('Closing signup error alert'),
          type: 'danger',
        });
      }
    } else {
      sweetAlertRef.current.showSweetAlert({
        title: 'Error',
        text: 'Please fill in all fields and ensure passwords match.',
        showCancelButton: false,
        confirmButtonText: 'OK',
        onConfirm: () => console.log('Retry signup'),
        onClose: () => console.log('Closing fields error alert'),
        type: 'warning',
      });
    }
  };

  return (
    <View style={styles.container}>
      <SweetAlert ref={sweetAlertRef} />
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
