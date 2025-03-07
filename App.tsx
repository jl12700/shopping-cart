import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: 'darkgreen',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Food Panduck"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitle: () => (
              <Text style={styles.headerTitle}>Food Panduck</Text>
            ),
            headerRight: () => (
              <TouchableOpacity
                style={{ marginRight: 10 }} 
                onPress={() => {
                  console.log("Cart button pressed"); 
                  navigation.navigate('Cart');
                }}
              >
                <Ionicons name="cart-outline" size={26} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={({ navigation }) => ({
            headerTitle: () => (
              <Text style={styles.headerTitle}>Cart</Text> 
            ),
            headerLeft: () => (
              <View style={styles.headerLeftContainer}>
                <TouchableOpacity
                  onPress={() => {
                    console.log("Back button pressed");
                    navigation.goBack();
                  }}
                >
                  <Ionicons name="arrow-back" size={26} color="white" />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={({ navigation }) => ({
            headerTitle: () => (
              <Text style={styles.headerTitle}>Checkout</Text> 
            ),
            headerLeft: () => (
              <View style={styles.headerLeftContainer}>
                <TouchableOpacity
                  onPress={() => {
                    console.log("Back button pressed"); 
                    navigation.goBack();
                  }}
                >
                  <Ionicons name="arrow-back" size={26} color="white" />
                </TouchableOpacity>
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 23, 
    fontWeight: 'bold', 
    color: 'white', 
  },
  headerLeftContainer: {
    marginLeft: 15, 
  },
});