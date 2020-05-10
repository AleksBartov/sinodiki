import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../App'
import { Value, Transition, Transitioning } from 'react-native-reanimated';
import { COLORS } from '../constants/colors';
import { withTransition } from 'react-native-redash';
import OZdraviiCard from '../components/OZdraviiCard';
import OUpokoeniiCard from '../components/OUpokoeniiCard';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.middle,
  },
  header: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logoContainer: {
    marginLeft: 15,
  },
  logo: {

  },
  username: {

  },
  logout: {
    marginRight: 11,
  }
});



export default function HomeScreen({navigation, route}) {
  const transition = <Transition.Sequence>
    <Transition.In durationMs={1000} type='scale' interpolation='easeOut' />
  </Transition.Sequence>
  const ref = React.useRef();
  const myKey = 'apiKey=sKw_oqVSmdk0cj8XolfkSyap__JKRPLt';
  const username = route.params?.username;
  const { signOut, myNames, setMyNames } = React.useContext(AuthContext);

  React.useEffect(() => {
    fetch(`https://api.mlab.com/api/1/databases/sinodik/collections/${username}?${myKey}`)
    .then(data => data.json())
    .then(allNamesArr => {
        if (allNamesArr === undefined) {
            console.log('no data');
            setMyNames('no data yet...');
            return;
          }

          // CREATE SPECIAL OBJECT TO HOLDE ONLY UNICE DATA
        let GROUPS = new Set();
        let length = 0;
        allNamesArr.forEach(person=>person.group.forEach(g=>GROUPS.add(g)));
        let structuredArray = [...GROUPS]
          .sort()  // here we can sort groups
          .map(group=>{
            return (
              {
                title: group,
                data: []
              }
            )
          });

          allNamesArr
          .forEach(person => {
            length++;
            if(GROUPS.has(person.group[0])) {
              structuredArray.forEach(obj=>{
                if(obj.title === person.group[0]) {
                  obj.data.push(person);
                };
              })
            }
          });
        // here we have to transform data for sectionList by Array.reduce()
        ref.current.animateNextTransition();
        setMyNames(structuredArray);
    });
  }, []);

  const STEP = 80;

  const activeOne = new Value(0);
  const activeTwo = new Value(0);
  const secondActive = new Value(false);

  const transitionOne = withTransition(activeOne);
  const transitionTwo = withTransition(activeTwo);


  return (
    <SafeAreaView style={styles.container}>
      <View style={ styles.header }>
        <View style={styles.logoContainer}>
          <View style={styles.logo}>
            <Text style={{ fontFamily: 'Montserrat-Bold', color: COLORS.darkest, fontSize: 19 }} >МОИ СИНОДИКИ</Text>
          </View>
          <View style={styles.username}>
            <Text style={{ fontFamily: 'Montserrat-Light', color: COLORS.light, fontSize: 14 }} >{route.params?.username}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logout}>
          <Ionicons name="ios-log-out" size={34} color={COLORS.deepBlue} onPress={signOut} />
        </TouchableOpacity>
      </View>
      <Transitioning.View
          ref={ref}
          transition={transition}
          style={{ flex: 1 }}
          >
        {
          !myNames ? <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator color={COLORS.lightest} size='large' />
          </View> : ( <>
              <OUpokoeniiCard cardColor={COLORS.deepBlue} type='о упокоении' {...{ username, activeTwo, activeOne, transitionTwo, STEP, secondActive, navigation }}/>
              <OZdraviiCard cardColor={COLORS.green} type='о здравии' {...{ username, activeOne, activeTwo, transitionOne, STEP, secondActive, navigation }} />
              </>
              )
            }
      </Transitioning.View>
    </SafeAreaView>
  );
}




/* const scales = [
  new Value(1.2),
  new Value(1)
];

const opacities = [
  new Value(1),
  new Value(.5)
]

const zIndexes = [
  new Value(100),
  new Value(1)
]

const yTranslations = [
  new Value(0),
  new Value(50)
]

{
  cards.map((card, index) => {
    return (
      <Card key={index} type={card.type} username={route.params?.username} {...{ zIndexes, navigation, offsets, index, scales, opacities, yTranslations}} />
    )
  })
} */