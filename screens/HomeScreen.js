import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../App'
import Animated, { Transition, Transitioning } from 'react-native-reanimated';

import { customFonts } from '../App';
import { COLORS } from '../constants/colors';

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
    marginLeft: 11,
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
  const { signOut } = React.useContext(AuthContext);
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current.animateNextTransition();
  }, []);

  const transition = (
    <Transition.Sequence>
      <Transition.In
        type="slide-right"
        durationMs={2000}
        interpolation="easeInOut"
      />
      <Transition.In type="fade" durationMs={2000} />
    </Transition.Sequence>
  );

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
        <Card type='о здравии' order={ new Animated.Value(1) } username={route.params?.username} {...{navigation}} />
        <Card type='о упокоении' order={ new Animated.Value(2) } username={route.params?.username} {...{navigation}}/>
      </Transitioning.View>
    </SafeAreaView>
  );
}
