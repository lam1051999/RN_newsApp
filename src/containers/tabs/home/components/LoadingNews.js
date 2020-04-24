import React from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

export default function LoadingNews({isLoading}) {
    return (
        <View style={styles.container}>
            <ActivityIndicator animating={isLoading} color="#0288d1" size="small" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop : 10
    }
})