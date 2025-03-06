import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

const CartScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const [cart, setCart] = useState<Product[]>(route.params.cart || []);

    const updateQuantity = (id: string, change: number) => {
        setCart(prevCart => {
            return prevCart
                .map(item => item.id === id ? { ...item, quantity: item.quantity + change } : item)
                .filter(item => item.quantity > 0);
        });
    };

    const renderCartItem = ({ item }: { item: Product }) => (
        <View style={styles.cartItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>Php {item.price * item.quantity}</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, -1)}>
                    <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={() => updateQuantity(item.id, 1)}>
                    <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.headerButton}>Go Back</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Food Panduck</Text>
            </View>

            {cart.length > 0 ? (
                <FlatList
                    data={cart}
                    renderItem={renderCartItem}
                    keyExtractor={item => item.id}
                />
            ) : (
                <Text style={styles.emptyCart}>Your cart is empty.</Text>
            )}

            {cart.length > 0 && (
                <TouchableOpacity
                    style={styles.checkoutButton}
                    onPress={() => navigation.navigate('Checkout', { cart })}
                >
                    <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
                </TouchableOpacity>
            )}
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
        backgroundColor: '#f5f5f5',
    },
    headerButton: { 
        fontSize: 17, 
        color: 'black', 
        fontWeight: 'bold' 
    },
    headerTitle: { 
        fontSize: 25, 
        fontWeight: 'bold' 
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10,
    },
    priceContainer: {
        width: 80,
        alignItems: 'flex-end',
        marginRight: 50,
    },
    productPrice: {
        fontSize: 16,
    },
    quantityContainer: { 
        flexDirection: 'row', 
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: 'darkgreen',
        padding: 6,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    quantityText: { 
        color: 'white', 
        fontSize: 14, 
        fontWeight: 'bold' 
    },
    quantity: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        marginHorizontal: 5 
    },
    emptyCart: { 
        fontSize: 18, 
        textAlign: 'center', 
        marginTop: 50,
        color: 'gray',
    },
    checkoutButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'darkgreen',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    checkoutButtonText: { 
        fontSize: 14, 
        color: 'white', 
        fontWeight: 'bold' 
    },
});

export default CartScreen;
