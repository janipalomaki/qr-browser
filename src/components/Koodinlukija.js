import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { WebView } from 'react-native-webview';

// React Native Paper
import { FAB, Provider as PaperProvider, Appbar } from 'react-native-paper';

export default function Koodinlukija() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const [uri, setUri] = useState("");
  const [openWebsite, setOpenWebsite] = useState(false);

  useEffect(() => {
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
   
    if (data.includes("https://") === true || data.includes("http://") === true){
      setScanned(true);
      setUri(data);
      setHasPermission(null);
      setOpenWebsite(true);

    } else {
      setScanned(false);
      setHasPermission(null);
      alert("Skannausta ei voitu suorittaa! QR-koodissa saattaa olla virhe. Yritä uudelleen");
    }
    
  };

  const kaynnistaSkannaustila = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  }


  if (hasPermission === null) {
    return (
      <PaperProvider>
      
          <FAB
          label="Lue QR-koodi"
          style={styles.icon}
          icon="qrcode-scan"
          onPress={kaynnistaSkannaustila}
          />
  
      {(openWebsite === true) // Näytetään QR-koodin lataaman url:n verkkosivu
        ?<WebView source={{ uri: uri }} style={{ marginTop: 20 }} />
        : null
      }
     
      </PaperProvider>
    )
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  // Bar code scanner
  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && setScanned(false) }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appbar : {
    marginTop: 50
  },
  icon : {
    marginLeft : 20,
    marginBottom : 30,
    padding : 10,
    marginTop : 50,
    margin : 20
  },
});
