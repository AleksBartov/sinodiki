import React from 'react'
import { View, Text, SectionList, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
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
      width: width,
      paddingVertical: 35,
      paddingHorizontal: 10,
    },
    header: {
      fontSize: 24,
      color: COLORS.deepBlue,
      backgroundColor: COLORS.darkest,
      fontFamily: 'Montserrat-Bold',
      padding: 15,
      width: width,
    },
    title: {
      fontSize: 26,
      fontFamily: 'Montserrat-Bold',
      marginVertical: 4,
      color: COLORS.lightest,
    },
    info: {
      fontSize: 18,
      fontFamily: 'Montserrat-Light',
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
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.info}>({item.fathername} {item.surname})</Text>
      <Text style={styles.comment}>{item.comment}</Text>
    </View>
  );
  
  const MySectionList = ({ names }) => (
          <SectionList
        sections={names}
        ItemSeparatorComponent={
          () => {
            return (
              <View style={{ width: width, height: .4, backgroundColor: COLORS.light }}>
              </View>
            )
          }
        }
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <Item {...{item}} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
  );

export default MySectionList;

/* names.map((p, i) => <Text key={i}>{p.name}</Text>) */
