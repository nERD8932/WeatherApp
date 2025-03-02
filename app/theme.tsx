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
      padding: 10,
      fontWeight: 500,
    },
    textTertiary:{
      paddingHorizontal:10,
      textAlign: 'left',
      flex: 1,
    },
    textInput: {
      fontSize: 20, 
      fontWeight: 500,
      padding: 10,
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
    },
    list: {
      alignContent:'flex-start',
      textAlign: 'left',
      backgroundColor: '#000',
      flex: 1,
      flexDirection: 'row',
      alignItems: "center",
      padding: 5,
      paddingHorizontal:20,
      margin:10,
      borderRadius: 10
    },
    delete:{
      backgroundColor: '#ff5555',
      float: 'left',
      marginLeft: 'auto'
    }
});

export default styles;