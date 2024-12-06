import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/loginScreens/SplashScreen';

const Stack = createStackNavigator();

export default Navigation = ()=>{
    return(
       <NavigationContainer>
         <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="Splash"
        >

            <Stack.Screen name="Splash" component={SplashScreen} />
            {/* <Stack.Screen name="Screen2" component={Screen2} /> */}

        </Stack.Navigator>
       </NavigationContainer>
    )
}