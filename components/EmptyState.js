import React from 'react';
import { View, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import styles from '../assets/styles/AppStyles';

const EmptyState = ({ fadeAnim, showEmptyText }) => (
  <View style={styles.emptyContainer}>
    <LottieView
      source={require('../assets/animations/empty_list_cat.json')}
      autoPlay
      loop
      speed={0.5}
      style={styles.catAnimation}
    />
    <View>
      {showEmptyText && (
        <>
          <Animated.Text style={[styles.emptyText, { opacity: fadeAnim }]}>
            Nothing here yet... 🐾
          </Animated.Text>
          <Animated.Text style={[styles.subtleHint, { opacity: fadeAnim }]}>
            Tap the + below to create your first task 📝
          </Animated.Text>
        </>
      )}
    </View>
  </View>
);

export default EmptyState;