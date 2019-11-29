import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

import auth from '@react-native-firebase/auth';
import crashlytics from '@react-native-firebase/crashlytics';

function Crashlytics() {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={() => {
          // submit some logs that will appear alongside the crash report
          crashlytics().log('Crashing...!');
          crashlytics().log('Woops!');

          crashlytics().setAttribute('where', 'London');

          // set user properties so we can filter crashes by
          // a specific user on the Firebase Console
          const user = auth().currentUser;
          if (user != null) {
            crashlytics().setUserId(user.uid);

            // not all users have an email or display name
            // e.g. anonymous users
            crashlytics().setUserName(user.displayName || 'N/A');
            crashlytics().setUserEmail(user.email || 'N/A');
          }

          // force the app to crash for testing purposes
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
