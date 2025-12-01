import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import '../global.css';

type Props = {
    label: string,
    theme?:'primary',
    onPress: () => void,
}

const Button = ({label, theme, onPress}: Props) => {
    if(theme === 'primary'){
        return (
          <View style={styles.buttonContainer}>
            <Pressable
              style={{...styles.primaryButton, marginTop:10 }}
              onPress={onPress}
            >
              <Ionicons name="cloud-upload-outline" size={24} color="#fff" style={{paddingRight: 10}}/>
              <Text style={styles.buttonLabel}>{label}</Text>
            </Pressable>
          </View>
        );
    }
  return (
    <View style={styles.buttonContainer}>
        <Pressable style = {styles.button} onPress={onPress}>
           <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 68,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 15,
    width: "100%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  primaryButton: {
    borderRadius: 15,
    width: "100%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#505050",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Button