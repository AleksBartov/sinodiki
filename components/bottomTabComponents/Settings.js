import React from 'react';
import { SafeAreaView, TouchableHighlight, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { COLORS } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Card from './cardsForSettings/Card';

const { width, height } = Dimensions.get('window')

const CARD_SIZE = width - 100;

const cards = [
  {
    title: 'о упокоении',
    backgroundColor: COLORS.lightest,
    color: COLORS.darkest,
  },
  {
    title: 'о здравии',
    backgroundColor: COLORS.darkest,
    color: COLORS.lightest,
  },
]

const offsets = cards.map((_, index) => {
  return (
    {
      x: new Animated.Value(index === 0 ? 60 : 0),
      y: new Animated.Value(index === 0 ? 60 : 0),
    }
  )
})

export default function Settings ({ navigation, route }) {

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.middle, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableHighlight
            style={{ position: 'absolute', top: 30, left: 10, zIndex: 10 }}
            onPress={() => navigation.navigate('Home')}>
            <Ionicons name="ios-arrow-round-back" size={34} color={COLORS.deepBlue} />
          </TouchableHighlight>
           {
             cards.map((card, index) => {
               return (
                 <Card key={index} {...{ card, index, offsets }} />
               )
             })
           }
        </SafeAreaView>
    )
  }
