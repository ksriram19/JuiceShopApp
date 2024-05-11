import React, { useState } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';

const menuItems = [
    { id: '1', name: 'Apple Juice', image: 'https://t4.ftcdn.net/jpg/02/52/93/81/360_F_252938192_JQQL8VoqyQVwVB98oRnZl83epseTVaHe.jpg' },
    { id: '2', name: 'Orange Juice', image: 'https://img.freepik.com/free-vector/orange-fresh-fruit-icon_24877-83904.jpg' },
    { id: '3', name: 'Mango Juice', image: 'https://thumbs.dreamstime.com/b/sticker-red-mango-sticker-red-mango-illustration-115543984.jpg' },
    // Add more menu items as needed
];

export default function App() {
    const [orderList, setOrderList] = useState([]);
    const [currentOrderId, setCurrentOrderId] = useState(1);
    const [previousOrders, setPreviousOrders] = useState([]);

    // Function to add item to the order list
    const addItemToOrder = (itemName) => {
        const existingItemIndex = orderList.findIndex(item => item.name === itemName);
        if (existingItemIndex >= 0) {
            // Increment the quantity if the item is already in the order list
            const updatedOrderList = [...orderList];
            updatedOrderList[existingItemIndex].quantity += 1;
            setOrderList(updatedOrderList);
        } else {
            // Add a new item to the order list with quantity 1
            setOrderList([...orderList, { name: itemName, quantity: 1 }]);
        }
    };

    // Function to place a new order
    const placeNewOrder = () => {
        const newOrder = {
            id: currentOrderId,
            items: orderList,
        };

        // Save the current order in the previous orders list
        setPreviousOrders([...previousOrders, newOrder]);

        // Increment order ID for the next order
        setCurrentOrderId(currentOrderId + 1);

        // Clear the current order list
        setOrderList([]);
    };

    // Function to remove entire order
    const clearOrderList = () => {
        setOrderList([]);
    };

    // Function to remove a specific previous order
    const removeOrder = (orderId) => {
        const updatedOrders = previousOrders.filter(order => order.id !== orderId);
        setPreviousOrders(updatedOrders);

        // Reset current order ID to maximum ID in the updated orders list + 1
        const maxOrderId = updatedOrders.length > 0 ? Math.max(...updatedOrders.map(order => order.id)) : 0;
        setCurrentOrderId(maxOrderId + 1);
    };

    return (
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <Text style={styles.heading}>Juice Menu</Text>
                <FlatList
                    data={menuItems}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.menuItem}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <Text style={styles.menuItemText}>{item.name}</Text>
                            <Button title="Add" onPress={() => addItemToOrder(item.name)} />
                        </View>
                    )}
                />
            </View>

            <View style={styles.orderContainer}>
                <Text style={styles.heading}>Order List (Order #{currentOrderId})</Text>
                <FlatList
                    data={orderList}
                    keyExtractor={(item) => item.name}
                    renderItem={({ item }) => (
                        <View style={styles.orderItem}>
                            <Text style={styles.orderItemText}>
                                {item.name} x {item.quantity}
                            </Text>
                        </View>
                    )}
                />
                <Button title="Place New Order" onPress={placeNewOrder} />
                <Button title="Clear Order" onPress={clearOrderList} />

                <Text style={styles.heading}>Previous Orders</Text>
                <FlatList
                    data={previousOrders}
                    keyExtractor={(order) => order.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.previousOrder}>
                            <View style={styles.previousOrderHeader}>
                                <Text style={styles.orderText}>Order #{item.id}</Text>
                                <TouchableOpacity onPress={() => removeOrder(item.id)}>
                                    <Text style={styles.crossMarkButton}>×</Text>
                                </TouchableOpacity>
                            </View>
                            {item.items.map((orderItem) => (
                                <Text key={orderItem.name}>
                                    - {orderItem.name} x {orderItem.quantity}
                                </Text>
                            ))}
                        </View>
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    menuContainer: {
        width: '50%',
        padding: 10,
        backgroundColor: '#e0f7fa',
    },
    orderContainer: {
        width: '50%',
        padding: 10,
        backgroundColor: '#ffecb3',
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#00796b',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#e0f7fa',
        padding: 10,
        borderRadius: 8,
    },
    menuItemText: {
        marginLeft: 10,
        flex: 1,
        color: '#00796b',
    },
    orderItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        backgroundColor: '#fff9c4',
        padding: 10,
        borderRadius: 8,
    },
    orderItemText: {
        fontSize: 16,
        color: '#f57c00',
    },
    previousOrder: {
        padding: 10,
        backgroundColor: '#c8e6c9',
        borderRadius: 8,
        marginBottom: 10,
    },
    previousOrderHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    orderText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#388e3c',
    },
    crossMarkButton: {
        fontSize: 24,
        color: '#d32f2f',
        marginLeft: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
});
