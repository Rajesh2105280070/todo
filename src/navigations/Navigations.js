import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/loginScreens/SplashScreen';
import MainScreen from '../screens/userScreens/MainScreen';
import { Provider } from 'react-redux';
import store from '../redux/store';
import AddTodoScreen from '../screens/userScreens/AddTodoScreen';

const Stack = createStackNavigator();

export default Navigation = ()=>{
    return(
        <Provider store={store}>
       <NavigationContainer>
         <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="Splash"
        >

            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Main" component={MainScreen} />
            <Stack.Screen name="AddTodoScreen" component={AddTodoScreen} />
        </Stack.Navigator>
       </NavigationContainer>
       </Provider>
    )
}