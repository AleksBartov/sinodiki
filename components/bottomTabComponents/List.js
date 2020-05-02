import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Platform, TouchableHighlight, ScrollView, Image, SafeAreaView, Button } from 'react-native';
import Content from '../Content';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';
import { customFonts } from '../../App';
import Animated, { Transitioning, Transition } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const SIZE = width - 130;
const CARD_WIDTH = SIZE;
const CARD_HEIGHT = SIZE*1.8;

export default function List({ navigation, route }) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.middle }}>
          <TouchableHighlight
          style={{ position: 'absolute', top: 30, left: 10, zIndex: 10 }}
          onPress={() => navigation.goBack()}>
          <Ionicons name="ios-arrow-round-back" size={34} color={COLORS.deepBlue} />
          </TouchableHighlight>
          <View style={{ justifyContent: 'flex-start', alignItems: 'center'}}>
          <View style={{ marginTop: 10, marginBottom: 12, width: CARD_WIDTH/1.5, height: CARD_WIDTH/1.5, justifyContent: 'center', alignItems: 'center' }}>
              <Image source={require('../../assets/iconForListScreen.png')} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
          </View>
          <Text style={{ marginBottom: 20, fontSize: 28, fontFamily: 'Montserrat-Bold', color: route.params?.cardColor, textTransform: 'uppercase' }} >{route.params?.type}</Text>
          <Content type={route.params?.type} username={route.params?.username} navigation={navigation}/>
          </View>
      </SafeAreaView>
    )
  }
