import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

const CartScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const [cart, setCart] = useState<Product[]>(route.params?.cart || []);

    const updateQuantity = (id: string, change: number) => {
        setCart((prevCart) => {
            return prevCart
                .map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + change } : item
                )
                .filter(item => item.quantity > 0); // Remove item if quantity is 0
        });
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const renderCartItem = ({ item }: { item: Product }) => (
        <View style={styles.cartItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <View style={styles.priceContainer}>
                <Text style={styles.productPrice}>Php {item.price * item.quantity}</Text>
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, -1)}
                >
                    <Text style={styles.quantityText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, 1)}
                >
                    <Text style={styles.quantityText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
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
                <View style={styles.totalContainer}>
                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total:</Text>
                        <Text style={styles.totalPrice}>Php {totalPrice}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.checkoutButton}
                        onPress={() => navigation.navigate('Checkout', { cart })}
                    >
                        <Text style={styles.checkoutButtonText}>Checkout</Text>
                    </TouchableOpacity>
                </View>
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
    backButton: {
        marginTop: 20,
        marginBottom: 15,
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
        fontWeight: 'bold',
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
        fontWeight: 'bold',
    },
    quantity: {
        fontSize: 16,
        fontWeight: 'bold',
        marginHorizontal: 5,
    },
    emptyCart: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
        color: 'gray',
    },
    totalContainer: {
        backgroundColor: 'white',
        borderRadius: 4,
        padding: 15,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
   
    totalLabel: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    totalPrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    checkoutButton: {
        backgroundColor: 'darkgreen',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 4,
        alignItems: 'center',
    },
    checkoutButtonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default CartScreen;