import React from 'react';
import { View, Modal, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

const { width, height } = Dimensions.get('window');
export default function ModalPicker({ isChosing, setIsChosing, setCountry, setNews, setPageSize }) {
    return (
        <View style={styles.container}>
            <Modal
                animationType="fade"
                onRequestClose={() => Alert.alert("Modal has been closed")}
                transparent={true}
                visible={isChosing}
            >
                <View style={styles.container1}>
                    <View style={styles.wrapper}>
                        <Text style={styles.title}>Pick country</Text>
                        <ScrollView contentContainerStyle={styles.scrollView}>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                setPageSize(10);
                                setNews(null);
                                setIsChosing(false);
                                setCountry("us");
                            }}>
                                <Text style={styles.buttonText}>USA</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                setPageSize(10);
                                setNews(null);
                                setIsChosing(false);
                                setCountry("au");
                            }}>
                                <Text style={styles.buttonText}>AUSTRALIA</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                setPageSize(10);
                                setNews(null);
                                setIsChosing(false);
                                setCountry("ca");
                            }}>
                                <Text style={styles.buttonText}>CANADA</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                setPageSize(10);
                                setNews(null);
                                setIsChosing(false);
                                setCountry("ph");
                            }}>
                                <Text style={styles.buttonText}>PHILIPPINES</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                setPageSize(10);
                                setNews(null);
                                setIsChosing(false);
                                setCountry("sg");
                            }}>
                                <Text style={styles.buttonText}>SINGAPORE</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                setPageSize(10);
                                setNews(null);
                                setIsChosing(false);
                                setCountry("kr");
                            }}>
                                <Text style={styles.buttonText}>KOREA</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => {
                                setPageSize(10);
                                setNews(null);
                                setIsChosing(false);
                                setCountry("jp");
                            }}>
                                <Text style={styles.buttonText}>JAPAN</Text>
                            </TouchableOpacity>
                        </ScrollView>
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
    },
    container1: {
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    wrapper: {
        height: '30%',
        marginTop: height * 0.2,
        backgroundColor: 'rgba(255,255,255,1)',
        borderRadius: 5,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    title: {
        textAlign: 'center',
        fontSize: 17,
        fontFamily: 'OpenSans-Regular',
        marginBottom: 10,
    },
    scrollView: {
        width: width * 0.7,
        alignItems: 'center'
    },
    button: {
        marginVertical: 5
    },
    buttonText: {
        fontSize: 17,
        fontFamily: 'OpenSans-Regular',
        textAlign: 'center',
        color: '#0288d1',
    }
})