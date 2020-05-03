import React from 'react';
import { View, Text, SafeAreaView, TouchableHighlight, StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

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
    color: COLORS.lightest,
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
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: .8,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: COLORS.middle,
  },
  innerBox: {
    width: '100%',
    height: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.middle,
    shadowColor: COLORS.light,
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: .3,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: COLORS.middle,
  },
  radioButtonText: {

  },
})

export default function RadioComponent ({ question, answers }) {
    return (
        <View style={{...styles.radioContainer}}>
            <View style={{...styles.question}}>
              <Text style={{...styles.questionText}}>{question}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <View style={{...styles.radioButton}}>
                <View style={{...styles.innerBox}}>
                    <Text style={{...styles.radioButtonText}}>{answers[0]}</Text>
                </View>
              </View>
              <View style={{...styles.radioButton}}>
                <View style={{...styles.innerBox}}>
                    <Text style={{...styles.radioButtonText}}>{answers[1]}</Text>
                </View>
              </View>
            </View>
          </View>
    )
}
