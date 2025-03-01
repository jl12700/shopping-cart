import React, { useContext } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { CartContext } from '../context/CartContext';

const CheckoutScreen = ({ navigation }) => {
  const { cart, clearCart } = useContext(CartContext);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    Alert.alert('Checkout successful', '', [
      { text: 'OK', onPress: () => {
        clearCart();
        navigation.navigate('Home');
      }}
    ]);
  };

  return (
    <View>
      {cart.map((item) => (
        <Text key={item.id}>{item.name} - ${item.price} x {item.quantity}</Text>
      ))}
      <Text>Total: ${totalPrice}</Text>
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
};

export default CheckoutScreen;
