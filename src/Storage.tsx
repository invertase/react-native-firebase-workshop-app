import * as React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight,
  Alert,
} from 'react-native';
import {ProgressBar, Colors} from 'react-native-paper';

import CameraRoll from '@react-native-community/cameraroll';
import storage from '@react-native-firebase/storage';

function Storage() {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [photos, setPhotos] = React.useState<string[]>([]);

  const [uploading, setUploading] = React.useState<boolean>(false);
  const [transferred, setTransferred] = React.useState<number>(0); // 0 - 100

  /**
   * Fetch camera roll images
   */
  React.useEffect(() => {
    CameraRoll.getPhotos({
      first: 20,
    }).then(({edges}) => {
      setPhotos(edges.map(edge => edge.node.image.uri));
      setLoading(false);
    });
  }, []);

  /**
   * Prompt the user to confirm image uploading
   */
  function showAlert(uri: string) {
    Alert.alert(
      'Upload Image',
      'Click OK to upload your image to Firebase Cloud Storage!',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'OK',
          onPress: () => uploadImage(uri),
        },
      ],
    );
  }

  /**
   * Upload the image to the storage bucket
   */
  async function uploadImage(uri: string) {
    setUploading(true);
    setTransferred(0);

    const task = storage()
      .ref('camera-roll-image.jpg')
      .putFile(uri, {
        customMetadata: {
          uploadedBy: 'Elliot Hesp',
        },
      });

    // Set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
      );
    });

    try {
      await task;
    } catch (e) {
      console.error(e);
    }

    setUploading(false);

    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!',
    );
  }

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

  /**
   * Render uploading progress bar
   */
  if (uploading) {
    return (
      <View style={styles.loading}>
        <Text>Image Uploading...</Text>
        <ProgressBar
          progress={transferred}
          color={Colors.orange500}
          style={styles.progressBar}
        />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={{padding: 5}}>
        <Text style={{fontSize: 20}}>Select an image to upload:</Text>
      </View>
      {photos.map(photo => (
        <TouchableHighlight key={photo} onPress={() => showAlert(photo)}>
          <Image source={{uri: photo}} style={styles.photo} />
        </TouchableHighlight>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressBar: {
    width: 250,
    marginVertical: 16,
  },
  photo: {
    width: '100%',
    height: 300,
  },
});

export default Storage;
