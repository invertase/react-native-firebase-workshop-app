import * as React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {NavigationParams} from 'react-navigation';
import {Button} from 'react-native-paper';

import remoteConfig from '@react-native-firebase/remote-config';

interface Props {
  navigation: NavigationParams;
}

function RemoteConfig({navigation}: Props) {
  // Local dark mode flag
  const [isDarkModeEnabled, setDarkModeEnabled] = React.useState<boolean>(
    false,
  );

  // Whether we can show our feature
  const [showFeatures, setShowFeatures] = React.useState<boolean>(false);

  /**
   * Check Remote Config values & update local state
   */
  async function bootstrap(): Promise<void> {
    // Enable developer mode
    await remoteConfig().setConfigSettings({
      isDeveloperModeEnabled: true,
    });

    // Set default values in-case local/remote is out of sync
    await remoteConfig().setDefaults({
      dark_mode: false,
    });

    // Fetch the remote config details from Firebase & locally activate
    await remoteConfig().fetch();

    // Activate the values for this device
    await remoteConfig().activate();

    // Grab the remote config value
    const darkModeEnabled = await remoteConfig().getValue('dark_mode').value;

    // If enabled, set it locally
    if (darkModeEnabled) {
      setShowFeatures(true);
    }
  }

  // Bootstrap flow when component loads
  React.useEffect(() => {
    bootstrap()
      .then()
      .catch(console.error);
  }, []);

  /**
   * Set React Navigation to dark mode!
   */
  React.useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkModeEnabled ? '#37474f' : '#F9C02D',
      },
      headerTintColor: isDarkModeEnabled ? '#fff' : '#000',
    });
  }, [isDarkModeEnabled]);

  return (
    <>
      <StatusBar
        barStyle={isDarkModeEnabled ? 'light-content' : 'dark-content'}
      />
      <View
        style={[
          styles.container,
          isDarkModeEnabled && styles.darkModeContainer,
        ]}>
        {!showFeatures && (
          <Text style={styles.text}>Sorry, no features available!</Text>
        )}

        {showFeatures && (
          <>
            {!isDarkModeEnabled && (
              <Text
                style={[styles.text, isDarkModeEnabled && styles.darkModeText]}>
                Enable Features:
              </Text>
            )}
            <Button
              color={isDarkModeEnabled ? '#fff' : ''}
              onPress={() => setDarkModeEnabled($ => !$)}
              mode="contained">
              {isDarkModeEnabled ? 'Disable' : 'Enable'} Dark Mode
            </Button>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkModeContainer: {
    backgroundColor: '#607d8b',
  },

  text: {
    fontSize: 16,
    marginBottom: 16,
  },
  darkModeText: {
    color: '#fff',
  },
});

export default RemoteConfig;
