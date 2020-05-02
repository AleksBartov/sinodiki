import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Platform, TouchableHighlight, ScrollView, Image, SafeAreaView } from 'react-native';
import { COLORS } from '../constants/colors';
import { customFonts } from '../App';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { Value, set, useCode, interpolate, Extrapolate, cond, eq, block, event, add, sub } = Animated;
import { timing } from "react-native-redash";

const { width, height } = Dimensions.get('window');
const SIZE = width - 130;
const CARD_WIDTH = SIZE;
const CARD_HEIGHT = SIZE*1.8;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: (height/2) -40,
    marginTop: -CARD_HEIGHT/2,
    marginLeft: -CARD_WIDTH/2,
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

  const { type, username } = props;

  const gestureState = new Value(State.UNDETERMINED);
  const dragX = new Value(0);
  const dragY = new Value(0);
  const transX = new Value(0);
  const transY = new Value(0);

  const gestureHandler = event([
    {
      nativeEvent: {
        state: gestureState,
        translationY: dragY,
        translationX: dragX,
      },
    },
  ]);

  const prevDragX = new Value(0);
  const prevDragY = new Value(0);

  const _transY = block([
    cond(
      eq(gestureState, State.ACTIVE),
      [
        set(transY, add(transY, sub(dragY, prevDragY))),
        set(prevDragY, dragY),
      ],
      set(prevDragY, 0)
    ),
    transY,
  ]);

  const _transX = block([
    cond(
      eq(gestureState, State.ACTIVE),
      [
        set(transX, add(transX, sub(dragX, prevDragX))),
        set(prevDragX, dragX),
      ],
      set(prevDragX, 0)
    ),
    transX,
  ]);

  const scale = props.type === 'о здравии' ? interpolate(_transX, {
    inputRange: [-300, 0, 300],
    outputRange: [.8, 1,.8],
    extrapolate: Extrapolate.CLAMP,
  }) : interpolate(_transX, {
    inputRange: [-300, (width/2 - width/1.2), 300],
    outputRange: [.8, 1, .8],
    extrapolate: Extrapolate.CLAMP,
  });

  const cardColor = props.type === 'о здравии' ? COLORS.green : COLORS.deepBlue;

  return (
    <TouchableHighlight style={{ zIndex: props.type === 'о здравии' ? 100 : 1 }} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => props.navigation.navigate('listNames', { cardColor, type, username })}>
      <PanGestureHandler onGestureEvent={ gestureHandler } onHandlerStateChange={ gestureHandler } >
        <Animated.View 
          style={[
            styles.container,
            { left: props.type === 'о здравии' ? width/2 : width/1.2,
              transform: [ 
              { scale },
              { translateX: _transX }] }
            ]}>
            <View style={{ marginTop: 10, marginBottom: 60, width: CARD_WIDTH/1.5, height: CARD_WIDTH/1.5, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../assets/iconForCard.png')} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
            </View>
            <Text style={{fontSize: 22, fontFamily: 'Montserrat-Bold', color: cardColor, textTransform: 'uppercase' }}>{props.type}</Text>
          </Animated.View>
        </PanGestureHandler>
      </TouchableHighlight>
  );
}
