import React from 'react'
import { Platform,
            View,
            Text,
            StyleSheet,
            TouchableWithoutFeedback,
            ImageBackground,
            Dimensions,
            KeyboardAvoidingView } from 'react-native'
import { COLORS } from '../../constants/colors';
import { TextInput } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,
    },
    question: {
        width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 2,
        },
    questionText: {
        fontSize: 20,
        color: COLORS.light,
        fontWeight: '700',
        paddingLeft: 20,
    },
    input: {
        flex:1,
        width: 250,
        height: 60,
        margin: 15,
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
        fontSize: 12,
        fontWeight: '700',
        width: '100%',
        height: 60,
        paddingLeft: 15,
        justifyContent: 'center',
        alignItems: 'flex-start',
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
})

const InputFormComponent = ({ question }) => {
    const [ active, setActive ] = React.useState(false);
    const ref = React.useRef();
    return (
            <View style={{...styles.container}}>
                <View style={{...styles.question}}>
                    <Text style={{...styles.questionText}}>{ question }</Text>
                </View>
                <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => {
                        setActive(true);
                        ref.current.focus();
                    }
                }>
                    <View style={{...styles.input}}>
                        <View style={{...styles.innerBox}}>
                            { active && <ImageBackground source={require('../../assets/inputFormInnerShadow.png')} resizeMode='cover' style={{...StyleSheet.absoluteFill, width: null, height: null }} /> }
                            <TextInput ref={ref} placeholder={question} style={{ fontSize: 12, fontWeight: '700', color: active ? COLORS.lightest : COLORS.dark }} />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
    )
}

export default InputFormComponent
