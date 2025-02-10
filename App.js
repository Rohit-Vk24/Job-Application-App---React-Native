// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import JobsScreen from './screens/JobsScreen';
import BookmarksScreen from './screens/BookmarksScreen';
import JobDetailsScreen from './screens/JobDetailsScreen';
import { BookmarkProvider } from './context/BookmarkContext';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function JobsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Jobs" component={JobsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <BookmarkProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName = route.name === 'JobsStack' ? 'briefcase' : 'bookmark';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen name="JobsStack" component={JobsStack} options={{ title: 'Jobs Portal' }} />
          <Tab.Screen name="Bookmarks" component={BookmarksScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </BookmarkProvider>
  );
}
