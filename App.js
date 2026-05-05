import { enableScreens } from 'react-native-screens';
enableScreens();

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Sari screens import karein
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import SelectRoleScreen from './screens/SelectRoleScreen';
import RegisterStoreScreen from './screens/RegisterStoreScreen';
import StoreDashScreen from './screens/StoreDashScreen';
import EmployeeScreen from './screens/EmployeeScreen';
import EmployeeStatusScreen from './screens/EmployeeStatusScreen';
import AddEmployeeScreen from './screens/AddEmployeeScreen';
import CustomerDashboardScreen from './screens/CustomerDashboardScreen';
import ProfileScreen from './screens/ProfileScreen'; 
import ProductScreen from './screens/ProductScreen'; 
import AddStoreProductScreen from './screens/AddStoreProductScreen';
import CreateListScreen from './screens/CreateListScreen'; //
import CreateStoreScreen from './screens/CreateStoreScreen';
import ListProductScreen from './screens/ListProductScreen';
import ReviewListScreen from './screens/ReviewListScreen';
import ListDetailsScreen from './screens/ListDetailsScreen';
import TrolleyDashboardScreen from './screens/TrolleyDashboardScreen';
import ConnectTrolleyScreen from './screens/ConnectTrolleyScreen';
import CashierDashboardScreen from './screens/CashierDashboardScreen';
import FriendsScreen from './screens/FriendsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ 
          headerShown: false,
          animation: 'slide_from_right'
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="SelectRole" component={SelectRoleScreen} />
        <Stack.Screen name="RegisterStore" component={RegisterStoreScreen} />
        <Stack.Screen name="StoreDashboard" component={StoreDashScreen} />
        <Stack.Screen name="EmployeeScreen" component={EmployeeScreen} />
        <Stack.Screen name="EmployeeStatusScreen" component={EmployeeStatusScreen} />
        <Stack.Screen name="AddEmployeeScreen" component={AddEmployeeScreen} /> 
        <Stack.Screen name="CustomerDashboardScreen" component={CustomerDashboardScreen} /> 
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} /> 
        <Stack.Screen name="ProductScreen" component={ProductScreen} /> 
        <Stack.Screen name="AddStoreProductScreen" component={AddStoreProductScreen} /> 
        <Stack.Screen name="CreateListScreen" component={CreateListScreen} /> 
        <Stack.Screen name="CreateStoreScreen" component={CreateStoreScreen} />
        <Stack.Screen name="CashierDashboardScreen" component={CashierDashboardScreen} />
        <Stack.Screen name="ListProductScreen" component={ListProductScreen} />
        <Stack.Screen name="ReviewListScreen" component={ReviewListScreen} />
        <Stack.Screen name="ListDetailsScreen" component={ListDetailsScreen} />
        <Stack.Screen name="ConnectTrolleyScreen" component={ConnectTrolleyScreen} />
        <Stack.Screen name="TrolleyDashboardScreen" component={TrolleyDashboardScreen} />
        <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
}

