import * as React from 'react';

import {NavigationNativeContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider as PaperProvider} from 'react-native-paper';

// Screens
import HomeScreen from './src/Home';
import FirestoreScreen from './src/Firestore';
import AuthScreen from './src/Auth';
import StorageScreen from './src/Storage';
import CrashlyticsScreen from './src/Crashlytics';
import FiamScreen from './src/Fiam';
import ConfigScreen from './src/Config';

const Stack = createStackNavigator();

function App() {
  return (
    <PaperProvider>
      <NavigationNativeContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#F9C02D',
            },
            headerTintColor: '#000',
          }}>
          <Stack.Screen
            name="Home"
            options={{title: 'React Native Amsterdam'}}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Firestore"
            options={{title: 'Cloud Firestore'}}
            component={FirestoreScreen}
          />
          <Stack.Screen
            name="Auth"
            options={{title: 'Authentication'}}
            component={AuthScreen}
          />
          <Stack.Screen
            name="Storage"
            options={{title: 'Cloud Storage'}}
            component={StorageScreen}
          />
          <Stack.Screen
            name="Crashlytics"
            options={{title: 'Crashlytics'}}
            component={CrashlyticsScreen}
          />
          <Stack.Screen
            name="Fiam"
            options={{title: 'In-App Messaging'}}
            component={FiamScreen}
          />
          <Stack.Screen
            name="Config"
            options={{title: 'Remote Config'}}
            component={ConfigScreen}
          />
        </Stack.Navigator>
      </NavigationNativeContainer>
    </PaperProvider>
  );
}

export default App;
