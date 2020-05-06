import React from 'react'
import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { COLORS } from '../../../constants/colors'
import { Ionicons } from '@expo/vector-icons';
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
        width: width - 20,
        height: 60,
        backgroundColor: COLORS.lightest,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.light,
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

const HealthM = ({ setActive }) => {

    const list = [
        'болящий',
        'путешествующий',
        'без вести сущий'
    ]

    return (
        <View style={{ ...styles.container }}>
            <TouchableWithoutFeedback 
                onPress={() => {
                    setActive(0);
                    }}
                style={{ ...styles.closeButton }}>
                <Ionicons name='ios-close' size={50} color={ COLORS.darkest } />
            </TouchableWithoutFeedback>
            <ScrollView>
                <View>
                    {
                        list.map((type, index) => {
                            return (
                                <View key={type} style={{...styles.item}}>
                                    <Text>{ type }</Text>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView>
            <TouchableWithoutFeedback 
                onPress={() => {
                    setActive(0);
                    }}
                style={{ ...styles.okButton }}>
                <Text style={{ fontSize: 22, fontWeight: '700', color: COLORS.deepBlue }}>ВЫБРАТЬ</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

export default HealthM
