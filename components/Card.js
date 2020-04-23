import * as React from 'react';
import { Modal, Button, Text, View, StyleSheet, Dimensions, Platform, Alert, TouchableHighlight, ScrollView } from 'react-native';
import Content from './Content';
import { COLORS } from '../constants/colors';
import { customFonts } from '../App';
import Animated from 'react-native-reanimated';

const { Value, set, useCode, interpolate, Extrapolate, cond, eq } = Animated;
import {timing} from "react-native-redash";

const { width, height } = Dimensions.get('window');
const SIZE = width - 110;
const CARD_WIDTH = SIZE;
const CARD_HEIGHT = SIZE*1.5;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: (height/2) -40,
    left: width/2,
    marginTop: -CARD_HEIGHT/2,
    marginLeft: -CARD_WIDTH/2,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 6,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: COLORS.middle,
    elevation: (Platform.OS === 'android') ? 50 : 0,
  },
});

export default function Card(props) {

  const active = new Value(0);
  const scale = cond(eq(props.order, 1),
  interpolate(active, {
    inputRange: [0, 1],
    outputRange: [ .2, 1],
    extrapolate: Extrapolate.CLAMP,
  }),
  interpolate(active, {
    inputRange: [0, 1],
    outputRange: [ .2, .9],
    extrapolate: Extrapolate.CLAMP,
  })
);
  const transY = cond(eq(props.order, 1),
    interpolate(active, {
      inputRange: [0, 1],
      outputRange: [ 100, 0],
      extrapolate: Extrapolate.CLAMP,
    }),
    interpolate(active, {
      inputRange: [0, 1],
      outputRange: [ 100, 60],
      extrapolate: Extrapolate.CLAMP,
    })
  );

  const [modalVisible, setModalVisible] = React.useState(false);
  const cardColor = props.type === 'о здравии' ? COLORS.green : COLORS.deepBlue;

  useCode(() => set(
    active,
    timing({ from: 0, to: 1, duration: 550 })
  ),[active]);

  return (
      <TouchableHighlight style={{ zIndex: props.type === 'о здравии' ? 100 : 1 }} activeOpacity={0.6} underlayColor="#DDDDDD" onPress={() => setModalVisible(true)}>
      <Animated.View 
        style={[
          styles.container, 
          { 
            transform: [ { scale },
            { translateY: transY }] }
      ]}>
      <Text style={{fontSize: 20, fontFamily: 'Montserrat-Bold', color: cardColor}}>{props.type}</Text>
        <Modal
          animationType="fade"
          transparent={false}
          visible={modalVisible}
          >
          <View style={{ marginTop: 22, justifyContent: 'flex-start'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', backgroundColor: COLORS.dark, height: 80 }}>
              <Text>{props.type}</Text>

              <TouchableHighlight
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={{ margin: 5, fontSize: 20 }}>X</Text>
              </TouchableHighlight>
            </View>
            <ScrollView>
              <Content type={props.type} username={props.username} {...{modalVisible, setModalVisible}} navigation={props.navigation}/>
            </ScrollView>
          </View>
        </Modal>
        </Animated.View>
      </TouchableHighlight>
  );
}
