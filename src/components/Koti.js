import React from 'react';
import { StyleSheet } from 'react-native';

// React Native Paper
import { FAB, Provider as PaperProvider } from 'react-native-paper';

export default function Koti( { navigation } ) {
  
    return (
      <PaperProvider>

       <FAB
       style={styles.icon}
       label="QR-koodinlukija"
       icon="qrcode-scan"
       title="Koodinlukija"
       onPress={ () => navigation.navigate('Koodinlukija')} 
       />
       
       <FAB
        style={styles.icon}
       label="Otto-automaatin paikannus"
       icon="piggy-bank"
       title="EtsiAutomaatti"
       onPress={ () => navigation.navigate('Automaattipaikannin')} 
       />
     
      </PaperProvider>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    icon : {
      padding : 10,
      marginTop : 50,
      margin : 20
    },
   
  });
