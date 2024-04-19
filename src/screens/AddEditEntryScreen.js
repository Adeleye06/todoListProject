import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddEditEntryScreen = ({ route, navigation }) => {
    const [keyword, setKeyword] = useState('');
    const [url, setUrl] = useState('');
    const [description, setDescription] = useState('');

    // Check if there's entry data passed for editing
    useEffect(() => {
        if (route.params?.entry) {
            setKeyword(route.params.entry.key);
            setUrl(route.params.entry.url);
            setDescription(route.params.entry.description || '');
        }
    }, [route.params?.entry]); 

    const saveEntry = async () => {
        if (!keyword || !url) {
            Alert.alert('Error', 'Keyword and URL are required.');
            return;
        }

        const entry = JSON.stringify({ url, description });
        try {
            await AsyncStorage.setItem(keyword, entry);
            navigation.goBack();
        } catch (e) {
            Alert.alert('Error', 'Failed to save the entry.');
            console.error('Failed to save the entry.', e);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Keyword:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setKeyword}
                value={keyword}
                placeholder="Enter keyword"
                autoCapitalize="none"
            />
            <Text style={styles.label}>URL:</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUrl}
                value={url}
                placeholder="Enter URL"
                autoCapitalize="none"
                keyboardType="url"
            />
            <Text style={styles.label}>Description (optional):</Text>
            <TextInput
                style={styles.input}
                onChangeText={setDescription}
                value={description}
                placeholder="Enter description"
                multiline
            />
            <Button title="Save" onPress={saveEntry} />
            <Button title="Cancel" onPress={() => navigation.goBack()} color="#999" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    }
});

export default AddEditEntryScreen;
