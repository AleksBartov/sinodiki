import * as React from 'react';
import { Button, Text, View, ScrollView, Alert, StyleSheet } from 'react-native';
import Card from '../components/Card';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../App'
import Animated from 'react-native-reanimated';

import { customFonts } from '../App';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function HomeScreen({navigation, route}) {
  const { signOut } = React.useContext(AuthContext);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Ionicons name="ios-log-out" size={32} color="green" onPress={signOut} />
      ),
      headerLeft: () => (
        <Ionicons name="ios-add" size={32} color="green" onPress={()=> navigation.navigate('Adding')} />
      ),
    });
  }, [navigation, signOut]);

  return (
    <View style={styles.container}>
      <Card type='о здравии' order={ new Animated.Value(1) } username={route.params?.username} {...{navigation}} />
      <Card type='о упокоении' order={ new Animated.Value(2) } username={route.params?.username} {...{navigation}}/>
    </View>
  );
}
