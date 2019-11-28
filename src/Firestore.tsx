import * as React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {Divider} from 'react-native-paper';

import firestore from '@react-native-firebase/firestore';

interface MovieProps {
  key: string; // Firestore ID
  director: string;
  genre: string;
  poster: string;
  rated: string;
  released: string;
  runtime: string;
  score: number;
  title: string;
  year: number;
}

function FirestoreScreen() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [movies, setMovies] = React.useState<MovieProps[]>([]);

  /**
   * Subscribe to a Firestore collection
   * On any changes, update local state with the data!
   */
  React.useEffect(() => {
    return (
      firestore()
        .collection('movies')
        .orderBy('year')
        .orderBy('score', 'desc')
        // .where('title', 'in', ['Joker', 'The Dark Knight'])
        // .where('genre', 'array-contains-any', ['Sci-Fi', 'Fantasy'])
        .where('year', '>=', 2003)
        .onSnapshot(query => {
          const items: MovieProps[] = [];

          query.forEach(document => {
            items.push({
              ...document.data(),
              key: document.id,
            } as MovieProps);
          });

          setMovies(items);
          setLoading(false);
        }, console.error)
    );
  }, []);

  /**
   * Render loading spinner
   */
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <FlatList data={movies} renderItem={({item}) => <Movie {...item} />} />
  );
}

function Movie({
  title,
  poster,
  year,
  genre,
  runtime,
  rated,
  score,
}: MovieProps) {
  return (
    <View style={styles.container}>
      <View style={styles.poster}>
        <Image source={{uri: poster}} style={styles.poster} />
      </View>
      <View style={styles.meta}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.info}>Released: {year}</Text>
        <Divider />
        <Text style={styles.info}>Rated: {rated}</Text>
        <Divider />
        <Text style={styles.info}>Genre: {genre}</Text>
        <Divider />
        <Text style={styles.info}>Released: {year}</Text>
        <Divider />
        <Text style={styles.info}>Runtime: {runtime}</Text>
        <Divider />
        <Text style={[styles.info, styles.score]}>Score: {score}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Movie
  container: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 4,
    marginHorizontal: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 8,
  },
  poster: {
    width: 160,
    height: 300,
  },
  meta: {
    flex: 1,
    padding: 8,
  },
  title: {
    fontSize: 18,
    flexWrap: 'wrap',
    fontWeight: 'bold',
  },
  info: {
    marginVertical: 8,
    color: '#9e9e9e',
  },
  score: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default FirestoreScreen;
