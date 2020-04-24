import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

export default function NoResults() {
    return (
        <View style={styles.container}>
            <FontAwesome5Icon name="robot" color="rgba(61,61,61,0.6)" size={80} />
            <Text style={styles.text}>No results for this search</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop : 120,
    },
    text: {
        fontSize: 15,
        fontFamily: 'OpenSans-Regular',
        color : 'rgba(61,61,61,0.6)',
        marginTop : 10
    }
})