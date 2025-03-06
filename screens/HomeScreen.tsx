import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Product {
    id: string;
    name: string;
    price: number;
}

const products: Product[] = [
    { id: '1', name: 'Pizza', price: 250 },
    { id: '2', name: 'Burger', price: 120 },
    { id: '3', name: 'Pasta', price: 170 },
    { id: '4', name: 'Fries', price: 100 },
    { id: '5', name: 'Chicken', price: 140 },
    { id: '6', name: 'Iced Tea', price: 70 },
    { id: '7', name: 'Coke', price: 70 },
];

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity! + 1 } : item
                );
            }
            return [...prevCart, { ...product, quantity: 1 }];
        });
    };

    const renderProduct = ({ item }: { item: Product }) => (
        <View style={styles.productContainer}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>Php {item.price}</Text>
            <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                <Text style={styles.addButtonText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>       
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Food Panduck</Text>
                <TouchableOpacity style={styles.cartButton} onPress={() => navigation.navigate('Cart', { cart })}>
                    <Ionicons name="cart-outline" size={25} color="white" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={products}
                renderItem={renderProduct}
                keyExtractor={item => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 19,
        backgroundColor: '#f5f5f5', 
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 15,
        marginTop: 20, 
    },
    headerTitle: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    cartButton: {
        backgroundColor: 'darkgreen', 
        padding: 5,
        borderRadius: 5, 
        borderWidth: .5, 
        borderColor: 'darkgreen',
    },
    productContainer: {
        marginBottom: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        position: 'relative', 
        backgroundColor: 'white', 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 16,
        marginBottom: 10,
    },
    addButton: {
        position: 'absolute',
        bottom: 25, 
        right: 10,
        backgroundColor: 'darkgreen', 
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    addButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default HomeScreen;