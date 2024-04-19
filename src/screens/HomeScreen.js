import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TodoItem from '../components/TodoItem'; // make sure this path is correct according to your file structure

const HomeScreen = ({ navigation }) => {
    const [todoList, setTodoList] = useState([]);

    useEffect(() => {
        loadTodoList();
    }, []);

    const loadTodoList = async () => {
        try {
            const storedTodoList = await AsyncStorage.getItem('todoList');
            const todos = storedTodoList ? JSON.parse(storedTodoList) : [];
            setTodoList(todos);
        } catch (error) {
            console.error("Failed to load the todo list.", error);
        }
    };

    const navigateToAddEditItem = (item) => {
        navigation.navigate('AddEditEntry', { item });
    };

    const deleteTodoItem = async (id) => {
        const filteredTodoList = todoList.filter((item) => item.id !== id);
        setTodoList(filteredTodoList);
        await AsyncStorage.setItem('todoList', JSON.stringify(filteredTodoList));
    };

    const renderItem = ({ item }) => (
        <TodoItem
            item={item}
            onEdit={() => navigateToAddEditItem(item)}
            onDelete={() => deleteTodoItem(item.id)}
        />
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={todoList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
            <Button
                title="Add Todo"
                onPress={() => navigation.navigate('AddEditEntry')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
});

export default HomeScreen;
