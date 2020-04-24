import React from 'react'
import { Modal, View, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native'
import WebView from 'react-native-webview';
import LoadingNews from './LoadingNews';

const { width, height } = Dimensions.get("screen");
export default function ModalWebview({ url, openWebview, setOpenWebview , isLoading }) {
    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                onRequestClose={() => Alert.alert("Modal has been closed")}
                transparent={true}
                visible={openWebview}
            >
                <View style={styles.modalInner}>
                    <View style={styles.wrapper}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => setOpenWebview(false)}>
                            <Text style={styles.closeText}>+</Text>
                        </TouchableOpacity>
                        {
                            isLoading ?
                                <LoadingNews isLoading={isLoading} />
                                :
                                <WebView
                                    source={{ uri: `${url}` }}
                                    onError={syntheticEvent => {
                                        const { nativeEvent } = syntheticEvent;
                                        alert(nativeEvent.code);
                                    }}
                                    onHttpError={syntheticEvent => {
                                        const { nativeEvent } = syntheticEvent;
                                        alert(nativeEvent.statusCode)
                                    }}
                                    renderError={errorName => <Text>Link cannot be accessed</Text>}
                                />
                        }
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalInner: {
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    wrapper: {
        width: width,
        height: height * 0.95,
        marginTop: height * 0.05,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
    },
    closeButton: {
        alignSelf: 'flex-end',
        paddingHorizontal: 10,
    },
    closeText: {
        transform: [{
            rotate: "45deg"
        }],
        fontSize: 35
    }
})