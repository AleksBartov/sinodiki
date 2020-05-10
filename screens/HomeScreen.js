import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../App'
import Animated, { Value } from 'react-native-reanimated';

import { COLORS } from '../constants/colors';
import { withSpringTransition, withTransition } from 'react-native-redash';
import OZdraviiCard from '../components/OZdraviiCard';
import OUpokoeniiCard from '../components/OUpokoeniiCard';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.middle,
  },
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {

  },
  username: {

  },
  logout: {
    marginRight: 11,
  }
});



export default function HomeScreen({navigation, route}) {

  const { signOut } = React.useContext(AuthContext);

  const STEP = 140;

  const activeOne = new Value(0);
  const activeTwo = new Value(0);
  const secondActive = new Value(false);

  const transitionOne = withTransition(activeOne);
  const transitionTwo = withTransition(activeTwo);


  return (
    <SafeAreaView style={styles.container}>
      <View style={ styles.header }>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={{ fontFamily: 'Montserrat-Bold', color: COLORS.darkest, fontSize: 19 }} >МОИ СИНОДИКИ</Text>
          </View>
          <View style={styles.username}>
            <Text style={{ fontFamily: 'Montserrat-Light', color: COLORS.light, fontSize: 14 }} >{route.params?.username}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logout}>
          <Ionicons name="ios-log-out" size={34} color={COLORS.deepBlue} onPress={signOut} />
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }} >
        <OUpokoeniiCard cardColor={COLORS.deepBlue} type='О УПОКОЕНИИ' username={route.params?.username} {...{ activeTwo, activeOne, transitionTwo, STEP, secondActive, navigation }}/>
        <OZdraviiCard cardColor={COLORS.green} type='О ЗДРАВИИ' username={route.params?.username} {...{ activeOne, activeTwo, transitionOne, STEP, secondActive, navigation }} />
      </View>
    </SafeAreaView>
  );
}




/* const scales = [
  new Value(1.2),
  new Value(1)
];

const opacities = [
  new Value(1),
  new Value(.5)
]

const zIndexes = [
  new Value(100),
  new Value(1)
]

const yTranslations = [
  new Value(0),
  new Value(50)
]

{
  cards.map((card, index) => {
    return (
      <Card key={index} type={card.type} username={route.params?.username} {...{ zIndexes, navigation, offsets, index, scales, opacities, yTranslations}} />
    )
  })
} */