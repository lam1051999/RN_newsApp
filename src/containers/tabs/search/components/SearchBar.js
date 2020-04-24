import React, { useState } from 'react'
import { View, StyleSheet, TextInput, TouchableOpacity, Image, ActivityIndicator, Dimensions, Platform, UIManager, LayoutAnimation, Text, } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function SearchBar({ query, setQuery, isLoading, fetchData, setPageSize, setNews, setSort }) {
    const navigation = useNavigation();
    const [show, setShow] = useState(false);
    function tonggleOptions() {
        LayoutAnimation.configureNext(
            LayoutAnimation.create(
                200,
                LayoutAnimation.Types.easeInEaseOut,
                LayoutAnimation.Properties.scaleXY
            )
        );
        setShow(show ? false : true);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <MaterialCommunityIcon size={30} name="unfold-more-vertical" color="#616161" style={styles.options} onPress={tonggleOptions} />
                <View style={styles.searchBar}>
                    <TextInput
                        placeholder="Search..."
                        placeholderTextColor="#616161"
                        style={styles.inputSearch}
                        value={query}
                        onChangeText={text => setQuery(text)}
                        onSubmitEditing={async() => {
                            if (query) {
                                await setPageSize(10);
                                await setNews(null);
                                fetchData();
                            }
                        }}
                    />
                    <Ionicon name="ios-search" color="#616161" size={20} style={styles.iconSearch} />
                    {Boolean(query) && !isLoading && <Ionicon name="ios-close" color="#616161" size={30} style={styles.iconClose} onPress={() => setQuery("")} />}
                    {isLoading && <ActivityIndicator style={styles.iconClose} color="#0288d1" size="small" animating={isLoading} />}
                </View>
                <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate("Profile")}>
                    <Image source={require('../../../../../assets/images/avatar.png')} style={styles.image} />
                </TouchableOpacity>
            </View>
            <View style={[styles.optionsClose, show ? styles.optionsOpen : null]}>
                <Text style={styles.optionsTitle}>Sort by:</Text>
                <View style={styles.optionsWrapper}>
                    <TouchableOpacity onPress={async() => {
                        await setSort("relevancy");
                        await setShow(false);
                        if (query){
                            fetchData();
                        }
                    }} style={styles.optionsOption}>
                        <Text style={styles.optionsOptionText}>Most relevant</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async() => {
                        await setSort("popularity");
                        await setShow(false);
                        if (query){
                            fetchData();
                        }
                    }} style={styles.optionsOption}>
                        <Text style={styles.optionsOptionText}>Most Popular</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={async() => {
                        await setSort("publishedAt");
                        await setShow(false);
                        if (query){
                            fetchData();
                        }
                    }} style={styles.optionsOption}>
                        <Text style={styles.optionsOptionText}>Newest</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginTop: 19,
        width: Dimensions.get('window').width,
        position: 'relative'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
        marginLeft : 10
    },
    options: {

    },
    searchBar: {
        maxWidth: Dimensions.get('window').width - 110,
        flexGrow: 1,
        position: 'relative',
        justifyContent: 'center',
        marginHorizontal: 10,
    },
    inputSearch: {
        borderWidth: 1,
        borderColor: '#bdbdbd',
        paddingHorizontal: 40,
        fontSize: 17,
        borderRadius: 20,
        height: 40,
        backgroundColor: '#eeeeee',
        fontFamily: 'OpenSans-Regular',
    },
    iconSearch: {
        position: 'absolute',
        left: 10,
    },
    iconClose: {
        position: 'absolute',
        right: 20
    },
    imageContainer: {
        borderRadius: 15,
        width: 30,
        height: 30,
        overflow: 'hidden',
    },
    image: {
        flex: 1,
        width: null,
        height: null
    },
    options: {
    },
    optionsClose: {
        position: 'absolute',
        top: 30,
        left: 20,
        backgroundColor: 'white',
        zIndex: 1000,
        width: 0,
        height: 0,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'center',
    },
    optionsOpen: {
        width: 150,
        height: 120
    },
    optionsTitle: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 15,
        marginTop: 10
    },
    optionsWrapper: {
        padding: 10
    },
    optionsOption: {
    },
    optionsOptionText: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 17,
        textAlign: 'center',
        color: '#0288d1'
    }
})