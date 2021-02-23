import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

// React Native Paper
import { FAB, Provider as PaperProvider, Appbar } from 'react-native-paper';

// Json
import data from "./data.json";

// Paikannus
import * as Location from 'expo-location';

// Etäisyyden laskenta (En saanut omia laskureita toimimaan oikein)
import { getDistance } from 'geolib';

export default function Automaattipaikannin() {

  // Oman sijainnin paikannuksen tilamuuttujat
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Automaatit
  const [automaatit, setAutomaatit] = useState([]);

  const [etaisyys, setEtaisyys] = useState(null);

  // Napin disablointi
  const [disablointi, setDisablointi] = useState(true);

  const laskeEtaisyys = () => {

    let automaatitArray = [];

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
         
    })
    // Luodaan automaatit tietorakenne, missä mukana etäisyys
    setAutomaatit(automaatitArray);
  } 


  // PIENIN ETÄISYYS ETSITTÄVÄ

  // Pyydetään lupaa hakea sijainti heti kun sovellus avataan
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Jos lupa annetaan niin haetaan sijainti, päivitetään tilamuuttujat ja lasketaan etäisyys
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
      setDisablointi(false);

    })();
  }, [etaisyys]);


  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
   
    text = JSON.stringify(location);
  }

  return (
    <View >
      <Text>Oma sijaintisi tällä hetkellä:</Text>
      <Text>LAT: {latitude} </Text>
      <Text>LON: {longitude} </Text>
      

      <FAB
          label="Paikanna lähin Otto-automaatti"
          disabled={disablointi}
          onPress={() => {
            laskeEtaisyys();
          }}
      />

      {(automaatit != "")

      ?<Text>{JSON.stringify(automaatit)}</Text>
      : null
      }

    </View>
  );
}

