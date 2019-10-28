import * as React from 'react';
import {View, Text, Image, StyleSheet, TouchableHighlight} from 'react-native';
import {NavigationParams} from 'react-navigation';

interface Button {
  asset: any;
  title: string;
  screen: string;
}

const buttons: Button[] = [
  {
    asset: require('../assets/firestore.png'),
    title: 'Cloud Firestore',
    screen: 'Firestore',
  },
  {
    asset: require('../assets/auth.png'),
    title: 'Authentication',
    screen: 'Auth',
  },
  {
    asset: require('../assets/storage.png'),
    title: 'Cloud Storage',
    screen: 'Storage',
  },
  {
    asset: require('../assets/crashlytics.png'),
    title: 'Crashlytics',
    screen: 'Crashlytics',
  },
  {
    asset: require('../assets/fiam.png'),
    title: 'In-App Messaging',
    screen: 'Fiam',
  },
  {
    asset: require('../assets/config.png'),
    title: 'Remote Config',
    screen: 'Config',
  },
];

interface Props {
  navigation: NavigationParams;
}

function Home({navigation}: Props) {
  return (
    <View>
      <View style={styles.hero}>
        <Image
          source={require('../assets/rn-firebase.png')}
          style={{width: 120, height: 120}}
        />
        <Text style={styles.heroText}>React Native + Firebase</Text>
      </View>
      <View style={styles.cards}>
        {buttons.map(button => (
          <View key={button.screen} style={styles.cardContainer}>
            <TouchableHighlight
              style={styles.card}
              underlayColor={'#f5f5f5'}
              onPress={() => navigation.navigate(button.screen)}>
              <>
                <Image source={button.asset} style={styles.cardImage} />
                <Text>{button.title}</Text>
              </>
            </TouchableHighlight>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: '#fff',
    paddingVertical: 32,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  heroText: {
    marginTop: 16,
    fontSize: 20,
  },
  cards: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  cardContainer: {
    width: '50%',
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    height: 130,
    marginHorizontal: 8,
    marginBottom: 16,
    elevation: 8,
    borderRadius: 10,
  },
  cardImage: {
    width: 70,
    height: 70,
    marginBottom: 8,
  },
});

export default Home;
