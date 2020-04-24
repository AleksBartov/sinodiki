import React from 'react'
import { View, Text, SectionList, StyleSheet, SafeAreaView, Dimensions, Platform } from 'react-native';
import Constants from "expo-constants";
import { COLORS } from '../constants/colors';
import { customFonts } from '../App';

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
      paddingVertical: 30,
      paddingHorizontal: 15,
      borderRadius: 15,
      borderColor: COLORS.middle,
      shadowColor: COLORS.lightest,
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: .3,
      shadowRadius: 6,
      elevation: (Platform.OS === 'android') ? 50 : 0,
    },
    header: {
      fontSize: 22,
      color: COLORS.deepBlue,
      fontFamily: 'Montserrat-Bold',
      padding: 10,
      width: width,
      textTransform: 'lowercase',
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
      <Text style={styles.title}>{item.other}{item.name}</Text>
      <Text style={styles.info}>({item.fathername} {item.surname}, {item.comment})</Text>
    </View>
  );
  
  const MySectionList = ({ names }) => (
          <SectionList
            contentContainerStyle={{ alignItems: 'center' }}
            sections={names}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item }) => <Item {...{item}} />}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={styles.header}>{title}</Text>
            )}
          />
  );

export default MySectionList;

/* names.map((p, i) => <Text key={i}>{p.name}</Text>) */
