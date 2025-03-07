import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { CommonActions } from '@react-navigation/native'; 

interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

const CheckoutScreen: React.FC<{ route: any; navigation: any }> = ({ route, navigation }) => {
    const cart: Product[] = route.params?.cart || []; 

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        Alert.alert(
            "Checkout Successful", 
            "Your order has been placed!", 
            [
                { 
                    text: "OK", 
                    onPress: () => {
                        navigation.dispatch(
                            CommonActions.reset({
                                index: 0,
                                routes: [{ name: 'Food Panduck' }], 
                            })
                        );
                    }
                }
            ]
        );
    };

    const renderCheckoutItem = ({ item }: { item: Product }) => (
        <View style={styles.checkoutItem}>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>Php {item.price * item.quantity}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                renderItem={renderCheckoutItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.flatListContent}
            />

            <View style={styles.totalContainer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total:</Text>
                    <Text style={styles.totalPrice}>Php {totalPrice}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
                    <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 19,
        backgroundColor: '#f5f5f5',
    },
    flatListContent: {
        paddingBottom: 20,
    },
    checkoutItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        borderColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    productName: { 
        fontSize: 18, 
        fontWeight: 'bold',
        flex: 1,
        marginRight: 10,
    },
    productPrice: { 
        fontSize: 16, 
        fontWeight: 'bold',
        color: 'black',
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

export default CheckoutScreen;