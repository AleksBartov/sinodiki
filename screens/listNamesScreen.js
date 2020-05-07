import * as React from 'react';
import { Text, View, StyleSheet, Dimensions, Platform, TouchableHighlight, ScrollView, Image, SafeAreaView, Button } from 'react-native';
import Content from '../components/Content';
import { AuthContext } from '../App';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';
import { customFonts } from '../App';
import { Transitioning, Transition } from 'react-native-reanimated';
import { red } from 'react-native-redash';
import Add from '../components/bottomTabComponents/Add';
import Settings from '../components/bottomTabComponents/Settings';

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
    borderColor: COLORS.middle,
    backgroundColor: COLORS.middle,
    shadowColor: COLORS.light,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: .6,
    shadowRadius: 4,
    elevation: (Platform.OS === 'android') ? 50 : 0,
   },
});

const Tab = createBottomTabNavigator();

export default function listNamesScreen({ navigation, route }) {

  const { subtitleNumber, setNumberNames } = React.useContext(AuthContext);

  React.useEffect(() => {
    ref.current.animateNextTransition();
  }, [subtitleNumber]);

  const ref = React.useRef();
  const transition = <Transition.Together>
                        <Transition.In type='slide-top' durationMs={2000} />
                        <Transition.Change />
                        <Transition.Out />
                    </Transition.Together>

  function List() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.middle }}>
          <TouchableHighlight
          style={{ position: 'absolute', top: 30, left: 10, zIndex: 10 }}
          onPress={() => {
            setNumberNames(0);
            navigation.goBack();
          }}>
            <Ionicons name="ios-arrow-round-back" size={34} color={COLORS.deepBlue} />
          </TouchableHighlight>
          <View style={{ justifyContent: 'flex-start', alignItems: 'center'}}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', width: '100%', marginBottom: 5 }}>
              <Transitioning.View ref={ ref } transition={ transition } style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ marginHorizontal: 8, fontSize: 25, fontFamily: 'Montserrat-Bold', color: route.params?.cardColor, textTransform: 'uppercase' }} >{route.params?.type}</Text>
                { subtitleNumber !== 0 && <Text>{`( ${ subtitleNumber } имен )`}</Text>}
              </Transitioning.View>
              <View style={{ marginHorizontal: 8, width: CARD_WIDTH/3.5, height: CARD_WIDTH/3.5, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../assets/iconForListScreen.png')} style={{ width: '100%', height: '100%', margin: 2 }} resizeMode='contain' />
              </View>
            </View>  
            <Content type={route.params?.type} username={route.params?.username} navigation={navigation}/>
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

  function Play() {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.middle }}>
          <View style={{ backgroundColor: red }}>
            <Text>PLAY</Text>
          </View>
      </SafeAreaView>
    )
  }
  <>
    <Add />
    <Settings />
  </>

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          let iconName = `ios-${route.name}`;
          return <Ionicons name={iconName} size={30} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: COLORS.green,
        inactiveTintColor: COLORS.deepBlue,
        showLabel: false,
        style: { ...styles.bottomTabs }
      }}
    >
      <Tab.Screen name="list" component={List} />
      <Tab.Screen name="search" component={Search} />
      <Tab.Screen name="play" component={Play} />
      <Tab.Screen name="add" component={Add} initialParams={{ navigation, route }} />
      <Tab.Screen name="settings" component={Settings} initialParams={{ navigation, route }} />
    </Tab.Navigator>
  );
}
