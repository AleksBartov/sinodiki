import * as React from 'react';
import { Button,
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ImageBackground,
  Modal } from 'react-native';
import { AuthContext } from '../App';
import { COLORS } from '../constants/colors';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.middle,
  },
  deepestShadow: {
    width: '80%',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.middle,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: .8,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: COLORS.middle,
  },
  inputsHolder: {
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.middle,
    shadowColor: COLORS.light,
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: .3,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: COLORS.middle,
  },
  input: {
    width: '100%',
    height: 60,
    borderRadius: 10,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    fontSize: 14,
    color: COLORS.lightest,
  },
  viewAsInput: {
    width: 200,
    height: 60,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  imageAsBckg: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: "cover",
    backgroundColor: 'transparent',
  }
});

export default function SignInScreen({ navigation, route }) {

  let customFonts = {
    'Montserrat-Medium': require("../assets/fonts/Montserrat-Medium.ttf"),
    'Montserrat-Bold': require("../assets/fonts/Montserrat-Bold.ttf"),
  };
    const [fontsLoaded, setFontsLoaded] = React.useState(false);

    const loadFontsAsync = async () => {
      await Font.loadAsync(customFonts);
      setFontsLoaded(true);
    }

  React.useEffect(() => {
    loadFontsAsync();
  }, []);

  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [pressedButtonShadow, setPressedButtonShadow] = React.useState(false);

  const { signIn, openModal, closeSignInModal } = React.useContext(AuthContext);

  if(fontsLoaded) return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : "height"} style={styles.container}>
          <View style={ styles.deepestShadow } >
            <View style={styles.inputsHolder}>
              <Text style={{marginVertical: 30, color: COLORS.light, fontSize: 25, fontWeight: 'bold', fontFamily: 'Montserrat-Bold' }}>ВХОД</Text>
              <View
                style={styles.viewAsInput}>
                  <ImageBackground 
                    source={require('../assets/darkInnerShadow.png')}
                    style={styles.imageAsBckg}>
                    <TextInput
                      style={[styles.input, {fontFamily: 'Montserrat-Medium'} ]}
                      placeholder="имя"
                      value={username}
                      onChangeText={setUsername} />
                  </ImageBackground>
                </View>
                <View
                  style={styles.viewAsInput}>
                    <ImageBackground 
                      source={require('../assets/darkInnerShadow.png')}
                      style={styles.imageAsBckg}>
                      <TextInput
                        style={[styles.input, {fontFamily: 'Montserrat-Medium'} ]}
                        placeholder="пароль"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                      />
                    </ImageBackground>
                  </View>
                  {
                    pressedButtonShadow ? (
                      <View
                        style={[styles.viewAsInput, { justifyContent: 'center', alignItems: 'center', marginTop: 35 }]}>
                        <ImageBackground 
                          source={require('../assets/darkInnerShadow.png')}
                          style={[styles.imageAsBckg, { justifyContent: 'center', alignItems: 'center' }]}>
                          <TouchableWithoutFeedback
                            style={{ width: '100%', height: '100%' }}
                            onPress={() => {
                              setPressedButtonShadow(false);
                            }
                          }>
                            <Text style={{ color: COLORS.red, fontSize: 20, fontWeight: '700', fontFamily: 'Montserrat-Medium' }}>ВОЙТИ</Text>
                          </TouchableWithoutFeedback>
                        </ImageBackground>
                      </View>
                    ) : (
                      <View style={[ styles.deepestShadow, { width: 200, height: 60, justifyContent: 'center', alignItems: 'center', marginTop: 35 } ]} >
                        <View style={[styles.inputsHolder, { color: 'green' }]}>
                        <TouchableWithoutFeedback
                            style={{ width: '100%', height: '100%' }}
                            onPress={() => {
                              setPressedButtonShadow(true);
                              signIn({ username, password });
                            }
                          }>
                            <Text style={{ color: COLORS.green, fontSize: 20, fontWeight: '700', fontFamily: 'Montserrat-Medium' }}>ВОЙТИ</Text>
                          </TouchableWithoutFeedback>
                        </View>
                      </View>
                    )
                  }
            </View>
          </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={{ marginTop: 15, color: COLORS.deepBlue, fontSize: 14, fontFamily: 'Montserrat-Medium' }}>РЕГИСТРАЦИЯ</Text>
            </TouchableOpacity>
            <Modal
              animationType="slide"
              transparent={true}
              visible={openModal}
              >
              <View style={{ marginTop: 22, justifyContent: 'flex-start', width: 200, height: 200, backgroundColor: 'red'}}>
                <Text>неверные имя пользователя или пароль</Text>
                <Button title="X" onPress={() => closeSignInModal()} />
              </View>
            </Modal>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
  );

  return <></>
}
