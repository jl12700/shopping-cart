import React, { createContext, useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, Button, FlatList, TouchableOpacity, Alert } from 'react-native';

const CartContext = createContext();

const products = [
  { id: 1, name: 'Product A', price: 10 },
  { id: 2, name: 'Product B', price: 20 },
  { id: 3, name: 'Product C', price: 30 },
];

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0);
    });
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

const HomeScreen = ({ navigation }) => {
  const { cart, addToCart } = useContext(CartContext);

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.name} - ${item.price}</Text>
            <Button title="Add to Cart" onPress={() => addToCart(item)} />
          </View>
        )}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        disabled={cart.length === 0}
        style={{ margin: 10, backgroundColor: cart.length > 0 ? 'blue' : 'gray', padding: 10 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const CartScreen = ({ navigation }) => {
  const { cart, updateQuantity } = useContext(CartContext);

  return (
    <View>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.name} - ${item.price * item.quantity} ({item.quantity})</Text>
            <Button title="+" onPress={() => updateQuantity(item.id, 1)} />
            <Button title="-" onPress={() => updateQuantity(item.id, -1)} />
          </View>
        )}
      />
      <Button title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout')} />
    </View>
  );
};

const CheckoutScreen = ({ navigation }) => {
  const { cart, clearCart } = useContext(CartContext);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View>
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.name} - ${item.price * item.quantity} ({item.quantity})</Text>
          </View>
        )}
      />
      <Text style={{ padding: 10, fontSize: 18 }}>Total: ${total}</Text>
      <Button
        title="Checkout"
        onPress={() => {
          Alert.alert('Checkout successful', '', [
            { text: 'OK', onPress: () => {
              clearCart();
              navigation.navigate('Home');
            }}
          ]);
        }}
      />
    </View>
  );
};

const Stack = createStackNavigator();

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Cart" component={CartScreen} />
          <Stack.Screen name="Checkout" component={CheckoutScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}
