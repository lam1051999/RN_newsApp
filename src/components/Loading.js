import React from 'react'
import { Text, View, Modal, ActivityIndicator, Alert, StyleSheet } from 'react-native'

export default function Loading({ isLoading, text }) {
    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                onRequestClose={() => Alert.alert("Modal has been closed")}
                transparent={true}
                visible={isLoading}
            >
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <Text style={styles.text}>{text}</Text>
                        <ActivityIndicator animating={isLoading} color="#02881d" size="large" />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        height: '20%',
        width: '50%',
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 10
    },
    text:{
        fontSize : 17,
        fontFamily: 'OpenSans-Regular',
        marginBottom : 10
    }
})