import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { COLORS } from '../../constants/colors';

export default function Add({ title }) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.middle }}>
          <View>
            <Text>where is my title???</Text>
          </View>
        </SafeAreaView>
    )
  }
