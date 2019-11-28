import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Button, HelperText, TextInput} from 'react-native-paper';
import {GoogleSignin} from '@react-native-community/google-signin';

import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

function Auth() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [
    currentUser,
    setCurrentUser,
  ] = React.useState<FirebaseAuthTypes.User | null>(null);

  /**
   * Watch for user authentication state changes & update local state
   */
  React.useEffect(() => {
    return auth().onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  // Wait for Firebase callback
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  // User is signed in
  if (currentUser) {
    return (
      <View style={styles.container}>
        <Text>Welcome, {currentUser.displayName || currentUser.email}</Text>
        <Button
          style={styles.element}
          mode="contained"
          onPress={() => auth().signOut()}>
          Sign Out
        </Button>
      </View>
    );
  }

  return (
    <ScrollView>
      <CreateAccount />
      <SignIn />
      <GoogleSignIn />
    </ScrollView>
  );
}

/**
 * Create User Account Flow
 */
function CreateAccount() {
  const [email] = React.useState<string>('mike@invertase.co.uk');
  const [password] = React.useState<string>('123456');
  const [error, setError] = React.useState<string>('');

  async function createAccount() {
    try {
      setError('');
      await auth().createUserWithEmailAndPassword(email, password);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <View style={styles.card}>
      <Text>New user?</Text>
      <TextInput
        style={styles.element}
        mode="outlined"
        label="Email Address"
        value={email}
      />
      <TextInput
        style={styles.element}
        mode="outlined"
        label="Password"
        value={password}
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
      <Button
        style={styles.element}
        mode="contained"
        onPress={() => createAccount()}>
        Create Account
      </Button>
    </View>
  );
}

/**
 * Sign In Flow
 */
function SignIn() {
  const [email] = React.useState<string>('mike@invertase.co.uk');
  const [password] = React.useState<string>('123456');
  const [error, setError] = React.useState<string>('');

  async function signIn() {
    try {
      setError('');
      await auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <View style={styles.card}>
      <Text>Existing Account?</Text>
      <TextInput
        style={styles.element}
        mode="outlined"
        label="Email Address"
        value={email}
      />
      <TextInput
        style={styles.element}
        mode="outlined"
        label="Password"
        value={password}
      />
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
      <Button style={styles.element} mode="contained" onPress={() => signIn()}>
        Sign In
      </Button>
    </View>
  );
}

/**
 * Google sign in
 */
function GoogleSignIn() {
  const [error, setError] = React.useState<string>('');

  async function googleSignIn() {
    try {
      setError('');
      // Setup Google Sign In
      await GoogleSignin.configure({
        webClientId:
          '523166875826-93es6cdqcpason5rprn2gthfv4ivjn6f.apps.googleusercontent.com',
      });

      // Sign user in and obtain tokens
      const {idToken} = await GoogleSignin.signIn();

      // Create a new Firebase credential
      const credential = auth.GoogleAuthProvider.credential(idToken);

      // Sign user in with credential
      await auth().signInWithCredential(credential);
    } catch (e) {
      setError(e.message);
    }
  }

  return (
    <View style={styles.card}>
      <Text>Google Account?</Text>
      <HelperText type="error" visible={!!error}>
        {error}
      </HelperText>
      <Button
        style={styles.element}
        mode="contained"
        color={'#CF4332'}
        onPress={() => googleSignIn()}>
        Sign In with Google
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 8,
    margin: 8,
  },
  element: {
    marginTop: 8,
  },
});

export default Auth;
