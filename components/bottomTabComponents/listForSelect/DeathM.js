import React from 'react'
import { View, Text, Dimensions, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { COLORS } from '../../../constants/colors'
import { Ionicons} from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: COLORS.light,
        width: width - 20,
        marginLeft: 10,
        marginTop: 30,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    closeButton: {
        margin: 10,
        paddingRight: 20,
        width: width - 20,
        height: 60,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    item: {
        flexDirection: 'row',
        width: width - 20,
        height: 60,
        backgroundColor: COLORS.lightest,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.light,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    okButton: {
        marginVertical: 10,
        width: 160,
        height: 60,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.lightest,
    }
})

const DeathM = ({ setActive, setType }) => {

    const [ list, setList ] = React.useState([
        {
            title: 'новопреставленный (н.п.)',
            abr: 'н.п.',
            checked: false,
        },
        {
            title: 'приснопомянаемый (п.п.)',
            abr: 'п.п.',
            checked: false,
        }
    ]);

    const listChangeHelper = index => {
        let newData = list.map((data, i) => {
            if ( index === i) {
                return {
                    ...data,
                    checked: !data.checked,
                }
            }
            return data
        });

        setList(newData);
    }

    const sendDataBack = () => {
        let newArr = list.reduce((arr, data) => { 
            if (data.checked) {
                return [...arr, data.abr]
            }
            return arr
         }, []);
        newArr.length === 0 ? setType(['---']) : setType(newArr);
        setActive(0);
    }

    return (
        <View style={{ ...styles.container }}>
            <TouchableWithoutFeedback 
                onPress={() => sendDataBack()}
                style={{ ...styles.closeButton }}>
                <Ionicons name='ios-close' size={50} color={ COLORS.darkest } />
            </TouchableWithoutFeedback>
            <ScrollView>
                <View>
                    {
                        list.map(({ title, checked }, index) => {
                            return (
                                <TouchableOpacity 
                                    onPress={() => listChangeHelper(index)}
                                    key={title}
                                    style={{...styles.item}}
                                >
                                    <Ionicons name={ checked ? 'ios-radio-button-on' : 'ios-radio-button-off' } size={30} color={ COLORS.red } />
                                    <Text>{ title }</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
            <TouchableWithoutFeedback 
                onPress={() => sendDataBack()}
                style={{ ...styles.okButton }}>
                <Text style={{ fontSize: 18, fontWeight: '700', color: COLORS.deepBlue }}>ВЫБРАТЬ</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default DeathM