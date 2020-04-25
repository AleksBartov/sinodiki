import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Platform, TouchableHighlight, ScrollView, Image, SafeAreaView } from 'react-native';
import Content from '../components/Content';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { customFonts } from '../App';
import Animated from 'react-native-reanimated';
import { red } from 'react-native-redash';

const { width, height } = Dimensions.get('window');
const SIZE = width - 130;
const CARD_WIDTH = SIZE;
const CARD_HEIGHT = SIZE*1.8;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: (height/2) -40,
    left: width/2,
    marginTop: -CARD_HEIGHT/2,
    marginLeft: -CARD_WIDTH/2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 18,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: COLORS.dark,
    borderColor: COLORS.middle,
    shadowColor: COLORS.lightest,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .6,
    shadowRadius: 10,
    elevation: (Platform.OS === 'android') ? 50 : 0,
  },
  bottomTabs: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    borderColor: COLORS.middle,
    backgroundColor: COLORS.middle,
    shadowColor: COLORS.lightest,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .6,
    shadowRadius: 4,
    elevation: (Platform.OS === 'android') ? 50 : 0,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
   },
});

const Tab = createBottomTabNavigator();

export default function listNamesScreen({ navigation, route }) {

  function List() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.middle }}>
          <TouchableHighlight
          style={{ position: 'absolute', top: 30, left: 10, zIndex: 10 }}
          onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-round-back" size={34} color={COLORS.deepBlue} />
          </TouchableHighlight>
          <View style={{ justifyContent: 'flex-start', alignItems: 'center'}}>
          <View style={{ marginTop: 10, marginBottom: 12, width: CARD_WIDTH/1.5, height: CARD_WIDTH/1.5, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../assets/iconForListScreen.png')} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
          </View>
          <Text style={{ marginBottom: 20, fontSize: 28, fontFamily: 'Montserrat-Bold', color: route.params?.cardColor, textTransform: 'uppercase' }} >{route.params?.type}</Text>
          <Content type={route.params?.type} username={route.params?.username} navigation={navigation}/>
          </View>
          <View style={styles.bottomTabs}>
              <Ionicons name="ios-list" size={34} color={COLORS.green} />
              <Ionicons name="ios-search" size={34} color={COLORS.deepBlue} />
              <Ionicons name="ios-play" size={34} color={COLORS.deepBlue} />
              <Ionicons name="ios-add" size={34} color={COLORS.deepBlue} />
              <Ionicons name="ios-settings" size={34} color={COLORS.deepBlue} />
          </View>
      </SafeAreaView>
    )
  }

  function Search() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.middle }}>
          <View style={{ backgroundColor: red }}>
            <Text>searching for something...</Text>
          </View>
      </SafeAreaView>
    )
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="List" component={List} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
}
