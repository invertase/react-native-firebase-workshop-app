import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

import crashlytics from '@react-native-firebase/crashlytics';

function Crashlytics() {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => {
          crashlytics().log('Crashing...!');
          crashlytics().setAttribute('Where', 'Amsterdam');
          crashlytics().crash();
        }}>
        Crash the app!
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Crashlytics;
