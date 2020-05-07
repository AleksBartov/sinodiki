import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { COLORS } from '../../../constants/colors';
import Animated, { add, event, Value } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window')

const CARD_SIZE = width - 100;

export default function Card ({ card, index, offsets }) {
    const gestureState = new Value(State.UNDETERMINED);
    const dragX = new Value(0);
    const dragY = new Value(0);
    const gestureHandler = event([
        {
            nativeEvent: {
                state: gestureState,
                translationX: dragX,
                translationY: dragY
            }
        }
    ])

    const translateX = add(offsets[index].x, dragX);

    const translateY = add(offsets[index].y, dragY);
  
    return (
        <PanGestureHandler onGestureEvent={gestureHandler} onHandlerStateChange={gestureHandler} >
            <Animated.View 
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    marginTop: CARD_SIZE - 50,
                    marginLeft: width/2-CARD_SIZE/2,
                    width: CARD_SIZE,
                    height: CARD_SIZE,
                    borderWidth: 2,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: card.backgroundColor,
                    transform: [
                        { translateX },
                        { translateY },
                    ]
                }} >
                <Text style={{ color: card.color }}>{ card.title }</Text>
            </Animated.View>
        </PanGestureHandler>
    )
  }
