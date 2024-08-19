import { StyleSheet, Text, View } from 'react-native';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
          {/* <Stack.Screen options={{ headerShown: false }} name="Main" component={MainScreen} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
