import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";
import * as imagePicker from 'expo-image-picker';
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import '../../global.css';

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const [imageSelected, setSelectedImage] = useState<string | undefined>();
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false)
  const pickerImage = async ()  => {
    let result =  await imagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      quality: 1,
    })

    if(!result.canceled){
      setSelectedImage(result.assets[0].uri)
    }else{
      alert("You didn't select any image")
    }
  }


  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    // implement this later
  };

  const onSaveImageAsync = async () => {
    // implement this later
  };
  return (
    <View className=" flex-1 bg-[#303030] justify-center items-center">
      <ImageViewer imgSource={PlaceholderImage} selectedImage={imageSelected} />
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
    </View>
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