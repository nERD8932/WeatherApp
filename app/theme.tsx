import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    bg: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#111111',
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: "center",
      backgroundColor: '#111111',
    },
    txtcontainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    txtcontainersamll: {
      flex: 1,
      alignItems: "center",
      height: '10%'
    },
    textPrimary: {
      fontSize: 30, 
      fontWeight: 800,
      margin: 20,
    },
    textSecondary: {
      fontSize: 20, 
      fontWeight: 500,
    },
    textInput: {
      fontSize: 20, 
      fontWeight: 500,
      justifyContent: "center",
    },
    img: {
      flex:1,
      position: "absolute",
      justifyContent: 'flex-start',
      resizeMode: 'contain',
      resizeMethod: 'auto',
      alignItems: 'center', // Center content horizontally
    },
    button:{
      backgroundColor: '#000',
      padding: 2,
      margin: 10,
      color: '#222'
    }
});

export default styles;