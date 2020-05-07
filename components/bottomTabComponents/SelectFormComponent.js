import React from 'react'
import { View,
  Text,
  TouchableWithoutFeedback,
  ImageBackground,
  Dimensions,
  StyleSheet,
  Modal, 
  Button} from 'react-native'
import { COLORS } from '../../constants/colors'
import { Ionicons } from '@expo/vector-icons';
import HealthM from './listForSelect/HealthM';
import HealthF from './listForSelect/HealthF';
import AgeM from './listForSelect/AgeM';
import AgeF from './listForSelect/AgeF';
import DeathM from './listForSelect/DeathM';
import DeathF from './listForSelect/DeathF';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  radioButton: {
    flex: 1,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.middle,
    shadowColor: COLORS.dark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: .8,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: COLORS.middle,
  },
  innerBox: {
    width: 60,
    height: 60,
    margin: 20,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: COLORS.middle,
    shadowColor: COLORS.light,
    shadowOffset: { width: -3, height: -3 },
    shadowOpacity: .3,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: COLORS.middle,
  },
  radioButtonText: {
    fontSize: 12,
    fontWeight: '700',
  },
})

const SelectFormComponent = ({ type, setType, select, title }) => {
    const [ active, setActive ] = React.useState(0);
    const [ language, setLanguage ] = React.useState('java')
    return (
        <View style={{ flex:1, flexDirection: 'row',  justifyContent: 'center', alignItems: 'center' }}>
            <TouchableWithoutFeedback onPress={() => setActive(1)} style={{...styles.radioButton}}>
                <View style={{...styles.innerBox}}>
                    { active === 1 && <ImageBackground source={require('../../assets/formInnerDarkShadow.png')} resizeMode='cover' style={{...StyleSheet.absoluteFill, width: null, height: null }} /> }
                    <Text style={[styles.radioButtonText, { color: COLORS.lightest } ]}>{type}</Text>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setActive(1)}>
                <Ionicons name={ active === 1 ? 'ios-arrow-up' : 'ios-arrow-down' } size={30} color={ active === 1 ? COLORS.lightest : COLORS.dark} />
            </TouchableWithoutFeedback>
            <Modal
              animationType="slide"
              transparent={true}
              visible={active === 1}
              >

                {
                  title === 'health' && select === 'живой' ? (<HealthM {...{ setActive, setType }} />)
                   : title === 'health' && select === 'живая' ? (<HealthF {...{ setActive, setType }} />)
                   : title === 'health' && select === 'усопший' ? (<DeathM {...{ setActive, setType }} />)
                   : title === 'health' && select === 'усопшая' ? (<DeathF {...{ setActive, setType }} />)
                   : title === 'age' && select === 'живой' ? (<AgeM {...{ setActive, setType }} />)
                   : title === 'age' && select === 'живая' ? (<AgeF {...{ setActive, setType }} />)
                   : title === 'age' && select === 'усопший' ? (<AgeM {...{ setActive, setType }} />)
                   : (<AgeF {...{ setActive, setType }} />)
                }
            </Modal>
        </View>
    )
}

export default SelectFormComponent
