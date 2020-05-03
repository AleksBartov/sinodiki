import React from 'react';
import { View, Text, SafeAreaView, TouchableHighlight, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import RadioComponent from './RadioComponent';

const styles = StyleSheet.create({
  header: {
    width: '100%',
    margin: 2,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerText: {
    fontSize: 24,
    color: COLORS.deepBlue,
    fontWeight: '700',
  }
})

export default function Add({ navigation, route }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.middle, alignItems: 'center' }}>
          <TouchableHighlight
            style={{ position: 'absolute', top: 30, left: 10, zIndex: 10 }}
            onPress={() => navigation.navigate('Home')}>
            <Ionicons name="ios-arrow-round-back" size={34} color={COLORS.deepBlue} />
          </TouchableHighlight>
          <View style={{...styles.header}}>
            <Text style={{...styles.headerText}}>новое поминовение</Text>
          </View>
          <ScrollView contentContainerStyle={{ flex: 1 }}>
            <RadioComponent question='тип синодика' answers={['о здравии', 'о упокоении']} />
            <RadioComponent question='пол' answers={['мужской', 'женский']} />
            <RadioComponent question='что-то еще' answers={['о здравии', 'о упокоении']} />
          </ScrollView>
        </SafeAreaView>
    )
  }
