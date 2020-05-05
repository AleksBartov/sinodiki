import React from 'react';
import { View, Text, SafeAreaView, TouchableHighlight, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import RadioComponent from './RadioComponent';
import InputFormComponent from './InputFormComponent';
import SelectFormComponent from './SelectFormComponent';

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
          <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : "height"} style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1 }}>
              <RadioComponent question='тип синодика' answers={['о здравии', 'о упокоении']} />
              <RadioComponent question='пол' answers={['мужской', 'женский']} />
              <View style={{ flex: 1 , marginVertical: 6, justifyContent: 'center', alignItems: 'center', width: '100%'}} >
                <Text style={{ fontSize: 20, color: COLORS.light, fontWeight: '700', paddingLeft: 20 }} >временный статус</Text>
              </View>
              <View style={{ marginVertical: 10, height: 60, flexDirection: 'row', flex: 1 , justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <SelectFormComponent type='health' />
                <SelectFormComponent type='age' />
              </View>
              <InputFormComponent question='имя' />
              <InputFormComponent question='фамилия' />
              <InputFormComponent question='отчество' />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        </SafeAreaView>
    )
  }



  /* "dateOfBapt": "30.07.2019",
    "dateOfSaint": "30.07.",
    "dateDeath": "",
    "dateOfVows": "",
    "dateOfOrdinationDiak": "",
    "dateOfOrdinationPriest": "",
    "dateOfOrdinationBish": "",
    "dateOfEnthron": "",
    "comment": [
        "Дочь племянника Маргариты Сафоновой. Родители Иоанн и Иоанна"
    ],
    "other": [
        "мл.",
        ""
    ],
    "count": 1564488898133,
    "group": [
        "Крещенные мной"
    ]
} */
