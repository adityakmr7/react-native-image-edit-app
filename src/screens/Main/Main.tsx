import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Platform } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
function Main({navigation}: {navigation:any}) {
    const [image, setImage] = useState(null);
    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
        })();
      }, []);
    const _handleFileUpload = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });
      
          console.log(result);
      
          if (!result.cancelled) {
            setImage(result.uri);
          }
        navigation.navigate('home', {
            imageUrl: result.uri
        })
    }
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={_handleFileUpload}>
            <Icon name="plus-circle" size={ 100} color="#000000"/>
 </TouchableWithoutFeedback>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    }
})
export default Main;