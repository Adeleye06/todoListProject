import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';  // Import HomeScreen
import AddEditEntryScreen from './AddEditEntryScreen';  // Import AddEditEntryScreen
import DetailedViewModal from './DetailedViewModal'; // If you're using a modal managed by navigation

const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Keyword Database' }} />
                <Stack.Screen name="AddEditEntry" component={AddEditEntryScreen} options={{ title: 'Add/Edit Entry' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
