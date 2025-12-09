import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";
import * as imagePicker from 'expo-image-picker';
import { useState, useEffect, useRef } from "react";
import * as MediaLibrary from 'expo-media-library';
import { ImageSourcePropType, StyleSheet, View, Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";
import { captureRef } from "react-native-view-shot";
import '../../global.css';

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const [imageSelected, setSelectedImage] = useState<string | undefined>();
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType | undefined>(undefined);
  const imageRef = useRef<View>(null);

  
  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, []);

  const pickerImage = async ()  => {
    let result =  await imagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    })

    if(!result.canceled){
      setSelectedImage(result.assets[0].uri)
    }else{
      Alert.alert("Message","You did not select any image.")
    }
  }


  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = async () => {
     try {
       const localUri = await captureRef(imageRef, {
         height: 440,
         quality: 1,
       });

       await MediaLibrary.saveToLibraryAsync(localUri);
       if (localUri) {
         Alert.alert("Message","Saved!");
       }
     } catch (e) {
       console.log(e);
     }
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    
    <GestureHandlerRootView className=" flex-1 bg-[#303030] justify-center items-center">
      <View ref={imageRef} collapsable={false}>
        <ImageViewer imgSource={PlaceholderImage} selectedImage={imageSelected} />
        {pickedEmoji && (
          <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
        )}
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
      ) : (
        <View>
          <Button label="Upload photo" theme="primary" onPress={pickerImage} />
          <Button
            label="Use this photo"
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
 
  optionsContainer: {
    marginTop:18,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});