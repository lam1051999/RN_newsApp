import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import ModalPicker from './components/ModalPicker';
import Category from './components/Category';
import ListNews from './components/ListNews';
import { NEWS_API_KEY } from 'react-native-dotenv';
import { useFocusEffect } from '@react-navigation/native';

export default function Home({ navigation }) {
    const [isChosing, setIsChosing] = useState(false);
    const [country, setCountry] = useState("us");
    const [category, setCategory] = useState("business");
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(10);
    const [news, setNews] = useState(null);

    let isMounted = false;

    useFocusEffect(
        useCallback(() => {
            isMounted = true;
            setIsLoading(true);
            fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${NEWS_API_KEY}&pageSize=${pageSize}`)
                .then(response => response.json())
                .then(data => {
                    if (isMounted)
                        setNews(data);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.log("Failed to fetch data: " + error);
                    setIsLoading(false);
                })

            return () => isMounted = false;
        }, [country, category, pageSize])
    );

    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <TouchableOpacity onPress={() => setIsChosing(true)} style={styles.filterContainer}>
                    <AntDesignIcon name="filter" size={20} />
                    <Text style={styles.filterText}>{country}</Text>
                </TouchableOpacity>
                <Text style={styles.title}>HEADLINES</Text>
                <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate("Profile")}>
                    <Image source={require('../../../../assets/images/avatar.png')} style={styles.image} />
                </TouchableOpacity>
            </View>
            <Category category={category} setCategory={setCategory} setNews={setNews} setPageSize={setPageSize} />
            <ListNews marginBottom={170} fetchData={() => { }} news={news} isLoading={isLoading} setPageSize={setPageSize} pageSize={pageSize} />
            <ModalPicker isChosing={isChosing} setIsChosing={setIsChosing} setCountry={setCountry} setNews={setNews} setPageSize={setPageSize} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20
    },
    filterContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterText: {
        fontSize: 12,
        fontFamily: 'OpenSans-Regular',
    },
    title: {
        fontSize: 17,
        fontFamily: 'OpenSans-Regular',
        flexGrow: 1,
        textAlign: 'center'
    },
    imageContainer: {
        borderRadius: 15,
        width: 30,
        height: 30,
        alignSelf: 'center',
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        width: null,
        height: null,
    },
})