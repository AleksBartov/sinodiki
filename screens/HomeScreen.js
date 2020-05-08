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
const STEP = 70;

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

const offsets = [
  {
    x: new Value(0),
    y: new Value(0),
  }
];


export default function HomeScreen({navigation, route}) {

  const { signOut } = React.useContext(AuthContext);

  const { gestureHandler, state, translation } = panGestureHandler();
  const { gestureHandler: gestureHandlerTwo, state: stateTwo, translation: translationTwo } = panGestureHandler();

  const [ 
          translateX,
          translateY,
          translateXTwo,
          translateYTwo,
          zIndex,
          zIndexTwo,
          scale,
          scaleTwo,
          opacity,
          opacityTwo
        ] = useValues([ 0, 0, 0, 50, 100, 1, 1.2, 1, 1, .5 ]);

  useCode(() => block([
    cond(
      eq(state, State.ACTIVE),
      [
        set(scaleTwo, timing({ duration: 400, from: scaleTwo, to: 1.2, easing: Easing.linear })),
        set(translateYTwo, timing({ duration: 400, from: translateYTwo, to: 0, easing: Easing.linear })),
        set(opacityTwo, timing({ duration: 400, from: opacityTwo, to: 1, easing: Easing.linear })),
        set(translateX, translation.x),
        set(translateY, translation.y),
      ],
      cond(
        eq(state, State.END),
        cond(
          and(
            and(greaterThan(translation.x, -STEP), lessThan(translation.x, STEP)),
            and(greaterThan(translation.y, -STEP), lessThan(translation.y, STEP)),
          ),
          [
            set(scaleTwo, timing({ duration: 400, from: scaleTwo, to: 1, easing: Easing.linear })),
            set(translateYTwo, timing({ duration: 400, from: translateYTwo, to: 50, easing: Easing.linear })),
            set(opacityTwo, timing({ duration: 400, from: opacityTwo, to: .5, easing: Easing.linear })),
            set(translateX, timing({ duration: 500, from: translateX, to: 0, easing: Easing.bezier(.1,1.08,.95,.95) })),
            set(translateY, timing({ duration: 500, from: translateY, to: 0, easing: Easing.bezier(.1,1.08,.95,.95) })),
          ],
          [
            set(zIndexTwo, 100),
            set(zIndex, 1),
            set(scale, timing({ duration: 400, from: scale, to: 1, easing: Easing.linear })),
            set(opacity, timing({ duration: 400, from: opacity, to: .5, easing: Easing.linear })),
            set(translateX, timing({ duration: 500, from: translateX, to: 0, easing: Easing.bezier(.1,1.08,.95,.95) })),
            set(translateY, timing({ duration: 500, from: translateY, to: 50, easing: Easing.bezier(.1,1.08,.95,.95) })),
          ]
        )
      )
    ),
    cond(
      eq(stateTwo, State.ACTIVE),
      [
        set(scale, timing({ duration: 400, from: 1, to: 1.2, easing: Easing.linear })),
        set(translateY, timing({ duration: 400, from: 50, to: 0, easing: Easing.linear })),
        set(opacity, timing({ duration: 400, from: .5, to: 1, easing: Easing.linear })),
        set(translateXTwo, translationTwo.x),
        set(translateYTwo, translationTwo.y),
      ],
      cond(
        eq(stateTwo, State.END),
        cond(
          and(
            and(greaterThan(translationTwo.x, -STEP), lessThan(translationTwo.x, STEP)),
            and(greaterThan(translationTwo.y, -STEP), lessThan(translationTwo.y, STEP)),
          ),
          [
            set(scale, timing({ duration: 400, from: scale, to: 1, easing: Easing.linear })),
            set(translateY, timing({ duration: 400, from: translateY, to: 50, easing: Easing.linear })),
            set(opacity, timing({ duration: 400, from: opacity, to: .5, easing: Easing.linear })),
            set(translateXTwo, timing({ duration: 500, from: translateXTwo, to: 0, easing: Easing.bezier(.1,1.08,.95,.95) })),
            set(translateYTwo, timing({ duration: 500, from: translateYTwo, to: 0, easing: Easing.bezier(.1,1.08,.95,.95) })),
          ],
          [
            set(zIndex, 100),
            set(zIndexTwo, 1),
            set(scaleTwo, timing({ duration: 400, from: scaleTwo, to: 1, easing: Easing.linear })),
            set(opacityTwo, timing({ duration: 400, from: opacityTwo, to: .5, easing: Easing.linear })),
            set(translateXTwo, timing({ duration: 500, from: translateXTwo, to: 0, easing: Easing.bezier(.1,1.08,.95,.95) })),
            set(translateYTwo, timing({ duration: 500, from: translateYTwo, to: 50, easing: Easing.bezier(.1,1.08,.95,.95) })),
          ]
        )
      )
    )
  ]), [])



  
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
        <PanGestureHandler {...gestureHandler}>
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              marginTop: 110,
              marginLeft: width/2 - width/4,
              width: width /2,
              height: width /1.5,
              borderRadius: 6,
              backgroundColor: COLORS.lightest,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [
                { translateX },
                { translateY },
                { scale },
              ],
              zIndex,
              opacity,
            }}>
            <Text>О ЗДРАВИИ</Text>
          </Animated.View>
        </PanGestureHandler>
        <PanGestureHandler {...gestureHandlerTwo}>
          <Animated.View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              marginTop: 110,
              marginLeft: width/2 - width/4,
              width: width /2,
              height: width /1.5,
              borderRadius: 6,
              backgroundColor: COLORS.deepBlue,
              justifyContent: 'center',
              alignItems: 'center',
              transform: [
                { translateX: translateXTwo },
                { translateY: translateYTwo },
                { scale: scaleTwo },
              ],
              zIndex: zIndexTwo,
              opacity: opacityTwo,
            }}>
            <Text>О УПОКОЕНИИ</Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </SafeAreaView>
  );
}



/* const translateX = cond(
  eq(state, State.ACTIVE),
  set(offsets[0].x, translation.x),
  cond(
    eq(state,State.END),
    timing({ duration: 400, from: translation.x, to: 0, easing: Easing.linear })
  ));
const translateY = cond(
  eq(state, State.ACTIVE),
  set(offsets[0].y, translation.y),
  cond(
    and(
      eq(state, State.END),
      or(
        greaterThan(translation.y, 100),
        lessThan(translation.y, -100),
        greaterThan(translation.x, 100),
        lessThan(translation.x, -100)
      )
    ),
    timing({ duration: 400, from: translation.y, to: 100, easing: Easing.linear }),
    cond(eq(state, State.END), timing({ duration: 400, from: translation.y, to: 0, easing: Easing.linear }))
  )); */



/* {
  cards.map((card, index) => {
    return (
      <Card key={index} type={card.type} username={route.params?.username} {...{navigation, offsets, index}} />
    )
  })
} */
