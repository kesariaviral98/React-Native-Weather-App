import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Index from './index';
import Details from './details';

const Stack = createNativeStackNavigator();

const RootLayout = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Index}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={Details}
        options={{
          title: 'Weather Details',
          headerStyle: { backgroundColor: '#1a1a2e' },
          headerTintColor: '#ffffff',
        }}
      />
    </Stack.Navigator>
  );
}

export default RootLayout;