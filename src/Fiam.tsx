import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

import iid from '@react-native-firebase/iid';

iid()
  .get()
  .then(console.log);

function InAppMessaging() {
  const [id, setId] = React.useState<string>('');

  React.useEffect(() => {
    iid()
      .get()
      .then(setId);
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        label={'Instance ID for testing:'}
        value={id}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '90%',
    fontSize: 20,
  },
});

export default InAppMessaging;
