import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';

const TodoItem = ({ item, onEdit, onDelete }) => {
    // Handler when the item is long-pressed
    const handleLongPress = () => {
        Alert.alert(
            'Edit or Delete',
            'Would you like to edit or delete this item?',
            [
                { text: 'Cancel' },
                { text: 'Delete', onPress: () => onDelete(item.id), style: 'destructive' },
                { text: 'Edit', onPress: () => onEdit(item) },
            ],
            { cancelable: true }
        );
    };

    return (
        <Pressable onPress={() => onEdit(item)} onLongPress={handleLongPress} style={({ pressed }) => [
            styles.item,
            pressed ? styles.itemPressed : null,
        ]}>
            <Text style={styles.itemText}>{item.text}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        elevation: 1, // for Android shadow
    },
    itemPressed: {
        backgroundColor: '#e0e0e0', // or any other visible color to denote a press
    },
    itemText: {
        fontSize: 18,
    },
});

export default TodoItem;
