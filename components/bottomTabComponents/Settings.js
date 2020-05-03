import React from 'react';
import { View, SafeAreaView, TouchableHighlight, StyleSheet } from 'react-native';
import Animated, { Value, set, block, eq, add, sub, event, cond, useCode } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { timing } from 'react-native-redash';
import { COLORS } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const styles = StyleSheet.create({})

export default function Settings ({ navigation, route }) {
    
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

    const scale = cond(
        eq(gestureState, State.BEGAN),
        timing({ from: 1, to: 1.1, duration: 1550 }),
        cond(eq(gestureState, State.ACTIVE), 1.1, 1));

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.middle, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableHighlight
            style={{ position: 'absolute', top: 30, left: 10, zIndex: 10 }}
            onPress={() => navigation.navigate('Home')}>
            <Ionicons name="ios-arrow-round-back" size={34} color={COLORS.deepBlue} />
          </TouchableHighlight>

          <PanGestureHandler onGestureEvent={gestureHandler} onHandlerStateChange={gestureHandler}>
            <Animated.View
                style={{ 
                    width: 200,
                    height: 200,
                    borderWidth: 1,
                    transform: [
                        {
                            translateX: _transX
                        },
                        {
                            translateY: _transY
                        },
                        { scale: scale }
                    ] }}>
            </Animated.View>
          </PanGestureHandler>

        </SafeAreaView>
    )
  }
