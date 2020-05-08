import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Platform, TouchableHighlight, Image } from 'react-native';
import { COLORS } from '../constants/colors';
import { customFonts } from '../App';
import Animated, { Easing, and, greaterOrEq, or, lessOrEq, neq } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { Value, set, useCode, interpolate, Extrapolate, cond, eq, block, event, add, sub } = Animated;
import { usePanGestureHandler, timing } from "react-native-redash";

const { width, height } = Dimensions.get('window');
const SIZE = width - 130;
const CARD_WIDTH = SIZE;
const CARD_HEIGHT = SIZE*1.8;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    marginTop: 50,
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

const withOffset = ({ value, offset, state }) => {
  const safeOffset = new Value(0);
  return cond(
    eq(state, State.ACTIVE),
    set(safeOffset, value),
    set(safeOffset, timing({
      duration: 600,
      from: safeOffset,
      to: offset,
      easing: Easing.linear,
    }))
  )
}


export default function Card(props) {

  const { type, username, offsets, index, navigation } = props;

  const { 
    gestureHandler,
    state,
    translation
   } = usePanGestureHandler();

   const currentOffset = offsets[index];

   const translateX = withOffset(
     {
       value: translation.x,
       offset: currentOffset.x,
       state
     }
   );

   const translateY = withOffset(
    {
      value: translation.y,
      offset: currentOffset.y,
      state
    }
  );

   const zIndex = cond(eq(state, State.ACTIVE), 100, 1);

  const cardColor = type === 'о здравии' ? COLORS.green : COLORS.deepBlue;

  return (
      <PanGestureHandler {...gestureHandler}>
        <Animated.View 
          style={[
            styles.container,
            {
              transform: [
                { translateX },
                { translateY },
              ],
              zIndex
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
