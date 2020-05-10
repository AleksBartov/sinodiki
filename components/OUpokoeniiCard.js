import React from 'react'
import { View, Text, Dimensions, TouchableHighlight, Image } from 'react-native'
import Animated, { Value, useCode, block, cond, eq, set, and, greaterOrEq, lessOrEq, Easing } from 'react-native-reanimated'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
import { COLORS } from '../constants/colors'
import { panGestureHandler, mix, timing } from 'react-native-redash'

const { width } = Dimensions.get('window')

const OUpokoeniiCard = ({ activeTwo, activeOne, transitionTwo, STEP, navigation, cardColor, type, username }) => {
    const translateX = new Value(0);
    const translateY = new Value(0);
    const marginTop = mix(transitionTwo, 130, 90);
    const scale = mix(transitionTwo, .9, 1);
    const opacity = mix(transitionTwo, .5, 1);
    const { state, gestureHandler, translation } = panGestureHandler();
    
    const zIndex = cond(
        eq(state, State.ACTIVE),
        200,
        50
    );
    useCode(() => block([
        cond(
            eq(state, State.BEGAN),
            set(activeOne, 0),
        ),
        cond(
            eq(state, State.ACTIVE),
            [
                set(translateX, translation.x),
                set(translateY, translation.y),
            ]
        ),
        cond(
            and(
                eq(state, State.END),
                and(
                    greaterOrEq(translation.x, -STEP),
                    greaterOrEq(translation.y, -STEP),
                    lessOrEq(translation.x, STEP),
                    lessOrEq(translation.y, STEP),
                )
            ),
            [
                set(activeOne, 1),
                set(translateX, timing({ duration: 500, from: translation.x, to: 0, easing: Easing.bezier(.32,1.25,.94,.93) })),
                set(translateY, timing({ duration: 500, from: translation.y, to: 0, easing: Easing.bezier(.32,1.25,.94,.93) })),
            ],
            cond(
                eq(state, State.END),
                [
                    set(activeTwo, 0),
                    set(translateX, timing({ duration: 500, from: translation.x, to: 0, easing: Easing.bezier(.32,1.25,.94,.93) })),
                    set(translateY, timing({ duration: 500, from: translation.y, to: 0, easing: Easing.bezier(.32,1.25,.94,.93) })),
                ]
            )
        ),
    ]), []);
    return (
        <PanGestureHandler {...gestureHandler} >
            <Animated.View style={{
                position: 'absolute',
                width: 200,
                height: 260,
                borderRadius: 20,
                backgroundColor: COLORS.dark,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop,
                marginLeft: width/2-100,
                transform: [
                    { translateX },
                    { translateY },
                    { scale },
                ],
                zIndex,
                opacity,
            }}>
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
    )
}

export default OUpokoeniiCard
