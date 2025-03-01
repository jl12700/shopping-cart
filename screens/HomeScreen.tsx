import React, { useContext } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { CartContext } from '../context/CartContext';

const products = [
  { id: '1', name: 'Product 1', price: 10 },
  { id: '2', name: 'Product 2', price: 20 },
];

const HomeScreen = ({ navigation }) => {
  const { addToCart, cart } = useContext(CartContext);

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.name} - ${item.price}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(item)} />
          </View>
        )}
      />
      <Button
        title="Go to Cart"
        onPress={() => navigation.navigate('Cart')}
        disabled={cart.length === 0}
      />
    </View>
  );
};

export default HomeScreen;
