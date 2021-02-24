import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

// React Native Paper
import { FAB, Card, Paragraph, Title, Text } from 'react-native-paper';

// Json
import data from "./data.json";

// Paikannus
import * as Location from 'expo-location';

// Etäisyyden laskenta 
//(En saanut omia laskureita toimimaan oikein, joten käytin laskentaan lisäosaa. Eroa tuli useita kilometrejä...)
import { getDistance } from 'geolib';

export default function Automaattipaikannin() {

  // Oman sijainnin paikannuksen tilamuuttujat
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Automaatit
  const [automaatit, setAutomaatit] = useState([]);
  const [etaisyydet, setEtaisyydet] = useState([]);
  const [lahinAutomaatti, setLahinAutomaatti] = useState(null);

  // Napin disablointi
  const [disablointi, setDisablointi] = useState(true);

  const laskeEtaisyys = () => {

    let automaatitArray = [];
    let etaisyydetArray = [];

    let x1 = Number(latitude);
    let y1 = Number(longitude);

    // Käydään datan sijainnit läpi
    data.map((sijainti, idx) => {

        let x2 = Number(sijainti.koordinaatti_LAT);
        let y2 = Number(sijainti.koordinaatti_LON);

        // Lasketaan etäisyys
        let m = getDistance(
          { latitude: x1, longitude: y1 },
          { latitude: x2, longitude: y2 }
        );

        let km = m / 1000;
        let tulos = km.toFixed(1);

        let automaattiObjekti = {
            "automaatti" : idx,
            "etaisyys" : tulos,
            "katuosoite" : data[idx].katuosoite,
            "postinumero" : data[idx].postinumero,
            "postitoimipaikka" : data[idx].postitoimipaikka
        };


        automaatitArray.push(automaattiObjekti);
        etaisyydetArray.push(tulos);
         
    })
    // Luodaan automaatit tietorakenne, missä mukana etäisyys
    setAutomaatit(automaatitArray);
    setEtaisyydet(etaisyydetArray);
  } 

  const etsiLahinAutomaatti = () => {

    // Sortataan pienin arvo ensimmäiseksi
    let lahin = etaisyydet.sort(function(a, b){return a - b});
    setLahinAutomaatti(lahin[0]); // ensimmäinen eli pienin arvo
  
  }

  // Pyydetään lupaa hakea sijainti heti kun sovellus avataan
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Sovellukselle ei ole annettu lupaa hakea sijaintia! Tarkista asetukset ja yritä uudelleen.');
        return;
      }

      // Jos lupa annetaan niin haetaan sijainti, päivitetään tilamuuttujat ja lasketaan etäisyys
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      laskeEtaisyys();
      setDisablointi(false);

    })();
  }, [etaisyydet]);

  return (
    <View style={styles.container} >
      <FAB
          label="Paikanna lähin Otto-automaatti"
          style={styles.icon}
          disabled={disablointi}
          onPress={() => {
            etsiLahinAutomaatti();
          }}
      />

      {(lahinAutomaatti != null)
      ? automaatit.map((automaatti, idx) => {
        if(automaatti.etaisyys === lahinAutomaatti){
          return(
            <Card
            key={idx}
            >
              <Card.Content>
                <Paragraph style={styles.kortti}>Lähin automaatti sijaitsee {lahinAutomaatti} km päässä!</Paragraph>
                <Title>Osoite:</Title>
                <Paragraph>{automaatti.katuosoite}</Paragraph>
                <Paragraph>0{automaatti.postinumero}</Paragraph>
                <Paragraph>{automaatti.postitoimipaikka}</Paragraph>
              </Card.Content>
      
            </Card>
            )
        }
      })
      : <Text>{errorMsg}</Text>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  appbar : {
    marginTop: 50
  },
  kortti : {
    marginTop: 20,
    fontSize : 16
  },
  icon : {
    marginLeft : 20,
    marginBottom : 30,
    padding : 10,
    marginTop : 50,
    margin : 20
  },
});
