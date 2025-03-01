import React, { useContext } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { CartContext } from '../context/CartContext';

const CartScreen = ({ navigation }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  return (
    <View>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - ${item.price} x {item.quantity}</Text>
            <Button title="+" onPress={() => addToCart(item)} />
            <Button title="-" onPress={() => removeFromCart(item.id)} />
          </View>
        )}
      />
      <Button
        title="Proceed to Checkout"
        onPress={() => navigation.navigate('Checkout')}
        disabled={cart.length === 0}
      />
    </View>
  );
};

export default CartScreen;
