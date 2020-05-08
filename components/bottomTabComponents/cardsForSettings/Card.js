import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { COLORS } from '../../../constants/colors';
import Animated, { add, event, Value, cond, eq, block, set, useCode, multiply, max, divide, and, floor, round } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { panGestureHandler } from 'react-native-redash';

const { width, height } = Dimensions.get('window')

const CARD_SIZE = width - 100;


export default function Card ({ card, index, offsets }) {

    const {
        gestureHandler,
        state,
        translationX,
        translationY
    } = panGestureHandler();

    const zIndex = cond(eq(state, State.ACTIVE), 100, 1);

    const translateX = add(offsets[index].x, translationX);
    const translateY = add(offsets[index].y, translationY);

    
    return (
        <PanGestureHandler {...gestureHandler} >
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
                        { translateY }
                    ],
                    zIndex
                }} >
                <Text style={{ color: card.color }}>{ card.title }</Text>
            </Animated.View>
        </PanGestureHandler>
    )
  }
