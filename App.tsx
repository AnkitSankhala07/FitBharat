import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import { SplashScreen } from './screens/SplashScreen';
import { LoginScreen } from './screens/LoginScreen';
import { RegisterScreen } from './screens/RegisterScreen';
import { LogWorkoutScreen } from './screens/LogWorkoutScreen';
import { DashboardScreen } from './screens/DashboardScreen';
import { WorkoutHistoryScreen } from './screens/WorkoutHistoryScreen';
import { WorkoutAnalysisScreen } from './screens/WorkoutAnalysisScreen';
import { NutritionScreen } from './screens/NutritionScreen';
import { LogMealScreen } from './screens/LogMealScreen';
import { BMIScreen } from './screens/BMIScreen';
import { SleepScreen } from './screens/SleepScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { AdminScreen } from './screens/AdminScreen';
import { BottomNavigation } from './components/BottomNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            tabBar={(props) => <BottomNavigation {...props} />}
            screenOptions={{ headerShown: false }}
            initialRouteName="Home"
        >
            <Tab.Screen name="Home" component={DashboardScreen} />
            <Tab.Screen name="Workout" component={WorkoutHistoryScreen} />
            <Tab.Screen name="Nutrition" component={NutritionScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{ headerShown: false }}
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Register" component={RegisterScreen} />
                <Stack.Screen name="LogWorkout" component={LogWorkoutScreen} />
                <Stack.Screen name="LogMeal" component={LogMealScreen} />
                <Stack.Screen name="BMI" component={BMIScreen} />
                <Stack.Screen name="Sleep" component={SleepScreen} />
                <Stack.Screen name="Admin" component={AdminScreen} />
                <Stack.Screen name="WorkoutAnalysis" component={WorkoutAnalysisScreen} />
                <Stack.Screen name="Main" component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
