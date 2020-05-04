import React from 'react';
import { View, Text, SafeAreaView, TouchableHighlight, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { COLORS } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import Animated, { Transition, Transitioning } from 'react-native-reanimated';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  radioContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
  },
  question: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 4,
  },
  questionText: {
    fontSize: 20,
    color: COLORS.light,
    fontWeight: '700',
  },
  radioButton: {
    width: width/3,
    height: width/3,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.middle,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: .8,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: COLORS.middle,
  },
  innerBox: {
    width: '100%',
    height: '100%',
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: COLORS.middle,
    shadowColor: COLORS.light,
    shadowOffset: { width: -3, height: -3 },
    shadowOpacity: .3,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: COLORS.middle,
  },
  radioButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
})

export default function RadioComponent ({ question, answers }) {

    const [ active, setActive ] = React.useState(0);

    return (
        <View style={{...styles.radioContainer}}>
            <View style={{...styles.question}}>
              <Text style={{...styles.questionText}}>{question}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableWithoutFeedback onPress={() => setActive(0)}
                style={{...styles.radioButton}}>
                <View style={{...styles.innerBox}}>
                    { active === 0 && <ImageBackground source={require('../../assets/formInnerDarkShadow.png')} resizeMode='cover' style={{...StyleSheet.absoluteFill, width: null, height: null }} /> }
                    <Text style={[styles.radioButtonText, { color: active === 0 ? COLORS.lightest : COLORS.dark } ]}>{answers[0]}</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => setActive(1)}
                style={{...styles.radioButton}}>
                <View style={{...styles.innerBox}}>
                    { active === 1 && <ImageBackground source={require('../../assets/formInnerDarkShadow.png')} resizeMode='cover' style={{...StyleSheet.absoluteFill, width: null, height: null }} /> }
                    <Text style={[styles.radioButtonText, { color: active === 1 ? COLORS.lightest : COLORS.dark}]}>{answers[1]}</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
    )
}
