import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Platform, TouchableHighlight, Image } from 'react-native';
import { COLORS } from '../constants/colors';
import { customFonts } from '../App';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, { cond, Value, useCode, block, eq, set, add, Easing } from 'react-native-reanimated';
import { panGestureHandler, timing } from 'react-native-redash';

const { width, height } = Dimensions.get('window');
const SIZE = width - 130;
const CARD_WIDTH = SIZE;
const CARD_HEIGHT = SIZE*1.5;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginTop: 90,
    marginLeft: width/2 - CARD_WIDTH/2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 18,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: COLORS.dark,
    borderColor: COLORS.middle,
    shadowColor: COLORS.lightest,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .6,
    shadowRadius: 10,
    elevation: (Platform.OS === 'android') ? 50 : 0,
  },
});

export default function Card(props) {

  const { type,
    username,
    offsets,
    index,
    navigation,
    opacities,
    zIndexes,
    scales,
    } = props;

  const [ opacity, opacityTwo ] = opacities;
  const [ scale, scaleTwo ] = scales;
  const [ zIndex, zIndexTwo ] = zIndexes;

  const cardColor = type === 'о здравии' ? COLORS.green : COLORS.deepBlue;

  const { gestureHandler, state, translation } = panGestureHandler();
  const translateX = new Value(0);
  const translateY = new Value( index === 0 ? 0 : 50 );

  useCode(() => block(
    cond(
      eq( state, State.ACTIVE),
      [
        set(translateX, translation.x),
        set(translateY, translation.y),
      ],
      cond(
        eq( state, State.END),
        [
          set(translateX, timing({ duration: 500, from: translation.x, to: 0, easing: Easing.bezier(.32,1.25,.94,.93) })),
          set(translateY, timing({ duration: 500, from: translation.y, to: 0, easing: Easing.bezier(.32,1.25,.94,.93) })),
        ]
      )
    )
  ), [])

  return (
      <PanGestureHandler {...gestureHandler} >
        <Animated.View 
          style={[
            styles.container,
            {
              transform: [
                { translateX },
                { translateY },
                { scale: index === 0 ? scale : scaleTwo },
              ],
              zIndex: index === 0 ? zIndex : zIndexTwo,
              opacity: index === 0 ? opacity : opacityTwo,
            }
            ]}>
            <TouchableHighlight underlayColor={COLORS.dark} onPress={() => navigation.navigate('listNames', { cardColor, type, username })}>
              <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <View style={{ marginTop: 10, marginBottom: 60, width: CARD_WIDTH/1.5, height: CARD_WIDTH/1.5, justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../assets/iconForCard.png')} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
                </View>
                <Text style={{fontSize: 22, fontFamily: 'Montserrat-Bold', color: cardColor, textTransform: 'uppercase' }}>{type}</Text>
              </View>
            </TouchableHighlight>
          </Animated.View>
        </PanGestureHandler>
  );
}
