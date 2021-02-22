import React, { useState, useEffect } from 'react';
import { Text, StyleSheet } from 'react-native';

// React Native Paper
import { FAB, Provider as PaperProvider, Appbar } from 'react-native-paper';

export default function Koti( { navigation } ) {
  
    return (
      <PaperProvider>

       <FAB
       style={styles.icon}
       label="Lue QR-koodi"
       icon="qrcode-scan"
       title="Koodinlukija"
       onPress={ () => navigation.navigate('Koodinlukija')} 
       />
       
       <FAB
        style={styles.icon}
       label="Etsi lähin Otto automaatti"
       icon="piggy-bank"
       title="EtsiAutomaatti"
       onPress={ () => navigation.navigate('EtsiAutomaatti')} 
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
