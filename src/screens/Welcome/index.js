import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useDispatch } from 'react-redux';
import { setFirstTimeUser } from '../../actions/actions';
import LottieView from 'lottie-react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const slides = [
  {
    title: "Track Your Spending",
    description: "Keep tabs on your expenses to stay within budget.",
    animation: require('../../../assets/1-finance.json'), // Path to Lottie animation
  },
  {
    title: "Set Savings Goals",
    description: "Save for what matters to you, whether it’s a vacation, a new car, or an emergency fund.",
    animation: require('../../../assets/2-finance.json'), // Path to Lottie animation
  },
  {
    title: "Plan for the Future",
    description: "Invest smartly and secure your financial future.",
    animation: require('../../../assets/3-finance.json'), // Path to Lottie animation
  }
];

export default function WelcomeScreen({ navigation }) {
  const dispatch = useDispatch();
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleContinue = () => {
    dispatch(setFirstTimeUser(false));
    navigation.replace('Login');
  };

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <LottieView source={item.animation} autoPlay loop style={styles.animation} />
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.background}>
      <View style={styles.carouselContainer}>
        <Carousel
          ref={carouselRef}
          data={slides}
          renderItem={renderItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth * 0.85}
          onSnapToItem={(index) => setActiveIndex(index)}
          loop={false}
        />
        <Pagination
          dotsLength={slides.length}
          activeDotIndex={activeIndex}
          containerStyle={styles.paginationContainer}
          dotStyle={styles.activeDot}
          inactiveDotStyle={styles.inactiveDot}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: screenWidth,
    height: screenHeight,
  },
  carouselContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 140,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  animation: {
    width: 300, // Set the size for the Lottie animation
    height: 300, // Adjust the height to maintain a square aspect ratio
    marginTop: 40,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 100,
    paddingHorizontal: 20,
  },
  paginationContainer: {
    position: 'absolute',
    bottom: 130,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeDot: {
    width: 25,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#28a745',
    marginHorizontal: 3,
  },
  inactiveDot: {
    width: 15,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#aaa',
    marginHorizontal: 3,
  },
  button: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    marginLeft: -screenWidth * 0.45,
    width: screenWidth * 0.9,
    backgroundColor: '#28a745',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
