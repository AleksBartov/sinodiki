import React from 'react'
import { View, Text, SectionList, StyleSheet, SafeAreaView, Dimensions, Platform } from 'react-native';
import Constants from "expo-constants";
import { COLORS } from '../constants/colors';
import { customFonts } from '../App';
import Animated from 'react-native-reanimated';
const { set } = Animated;

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Constants.statusBarHeight,
        width: width,
      },
    item: {
      backgroundColor: COLORS.middle,
      alignItems: 'center',
      justifyContent: 'center',
      width: width-20,
      marginVertical: 6,
      borderRadius: 15,
      borderColor: COLORS.middle,
      shadowColor: COLORS.lightest,
      shadowOffset: { width: -5, height: -5 },
      shadowOpacity: .15,
      shadowRadius: 2.5,
      elevation: (Platform.OS === 'android') ? 50 : 0,
    },
    itemSecondShadow: {
      backgroundColor: COLORS.middle,
      alignItems: 'center',
      justifyContent: 'center',
      width: width-20,
      paddingVertical: 30,
      paddingHorizontal: 15,
      borderRadius: 15,
      borderColor: COLORS.middle,
      shadowColor: COLORS.dark,
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: (Platform.OS === 'android') ? 50 : 0,
    },
    header: {
      fontSize: 22,
      color: COLORS.deepBlue,
      fontFamily: 'Montserrat-Bold',
      padding: 10,
      width: width,
      textTransform: 'lowercase',
      backgroundColor: COLORS.middle,
    },
    title: {
      fontSize: 26,
      fontFamily: 'Montserrat-Bold',
      marginVertical: 4,
      color: COLORS.lightest,
    },
    info: {
      fontSize: 12,
      color: COLORS.light,
      fontFamily: 'Montserrat-Bold',
      marginVertical: 4,
    },
    comment: {
      fontSize: 12,
      fontFamily: 'Montserrat-Thin',
      marginVertical: 4,
    },
  });

  const Item = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemSecondShadow}>
        <Text style={styles.title}>{item.other}{item.name}</Text>
        <Text style={styles.info}>({item.fathername} {item.surname}, {item.comment})</Text>
      </View>
    </View>
  );
  
  const MySectionList = ({ names }) => {
    
    return  (
      <View style={{ paddingBottom: 270 }}>
        <SectionList
          contentContainerStyle={{ alignItems: 'center' }}
          sections={names}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <Item {...{item}} />}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
        />
      </View>
      );
  }
  

export default MySectionList;

/* names.map((p, i) => <Text key={i}>{p.name}</Text>) */
