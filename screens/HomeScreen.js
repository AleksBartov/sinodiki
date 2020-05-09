import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../App'
import Animated, { Value, add, cond, eq, set, or, greaterThan, lessThan, Easing, and, interpolate, useCode, block, neq } from 'react-native-reanimated';

import { customFonts } from '../App';
import { COLORS } from '../constants/colors';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { panGestureHandler, timing, useValues } from 'react-native-redash';

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

const cards = [
  {
    type: 'о здравии'
  },
  {
    type: 'о упокоении'
  }
]

const offsets = cards.map((_, index) => {
  return (
    {
      x: new Value(0),
      y: new Value( index === 0 ? 0 : 50 ),
    }
  )
});


export default function HomeScreen({navigation, route}) {

  const { signOut } = React.useContext(AuthContext);

  const scales = [
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
        {
          cards.map((card, index) => {
            return (
              <Card key={index} type={card.type} username={route.params?.username} {...{ zIndexes, navigation, offsets, index, scales, opacities}} />
            )
          })
        }
      </View>
    </SafeAreaView>
  );
}
