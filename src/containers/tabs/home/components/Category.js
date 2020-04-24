import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default function Category({ category, setCategory, setNews , setPageSize }) {
    return (
        <View style={styles.container}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                <View style={styles.wrapper}>
                    <TouchableOpacity style={styles.categoryContainer} activeOpacity={0.7} onPress={() => {
                        setPageSize(10);
                        setNews(null);
                        setCategory("business");
                    }}>
                        <View style={{ ...styles.iconContainer, backgroundColor: '#43a047' }}>
                            <AntDesignIcon size={30} name="linechart" color="white" />
                        </View>
                        <Text style={{ ...styles.categoryText, color: category === "business" ? "#0288d1" : "black" }}>BUSINESS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryContainer} activeOpacity={0.7} onPress={() => {
                        setPageSize(10);
                        setNews(null);
                        setCategory("entertainment");
                    }
                    }>
                        <View style={{ ...styles.iconContainer, backgroundColor: '#f57c00' }}>
                            <SimpleLineIcon size={30} name="game-controller" color="white" />
                        </View>
                        <Text style={{ ...styles.categoryText, color: category === "entertainment" ? "#0288d1" : "black" }}>ENTERTAINMENT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryContainer} activeOpacity={0.7} onPress={() => {
                        setPageSize(10);
                        setNews(null);
                        setCategory("general");
                    }}>
                        <View style={{ ...styles.iconContainer, backgroundColor: '#fdd835' }}>
                            <AntDesignIcon size={30} name="windowso" color="white" />
                        </View>
                        <Text style={{ ...styles.categoryText, color: category === "general" ? "#0288d1" : "black" }}>GENERAL</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryContainer} activeOpacity={0.7} onPress={() => {
                        setPageSize(10);
                        setNews(null);
                        setCategory("health");
                    }}>
                        <View style={{ ...styles.iconContainer, backgroundColor: 'red' }}>
                            <AntDesignIcon size={30} name="hearto" color="white" />
                        </View>
                        <Text style={{ ...styles.categoryText, color: category === "health" ? "#0288d1" : "black" }}>HEALTH</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryContainer} activeOpacity={0.7} onPress={() => {
                        setPageSize(10);
                        setNews(null);
                        setCategory("science");
                    }}>
                        <View style={{ ...styles.iconContainer, backgroundColor: '#ab47bc' }}>
                            <AntDesignIcon size={30} name="rocket1" color="white" />
                        </View>
                        <Text style={{ ...styles.categoryText, color: category === "science" ? "#0288d1" : "black" }}>SCIENCE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryContainer} activeOpacity={0.7} onPress={() => {
                        setPageSize(10);
                        setNews(null);
                        setCategory("sports");
                    }}>
                        <View style={{ ...styles.iconContainer, backgroundColor: '#2196f3' }}>
                            <Ionicon size={30} name="ios-football" color="white" />
                        </View>
                        <Text style={{ ...styles.categoryText, color: category === "sports" ? "#0288d1" : "black" }}>SPORTS</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.categoryContainer} activeOpacity={0.7} onPress={() => {
                        setPageSize(10);
                        setNews(null);
                        setCategory("technology");
                    }}>
                        <View style={{ ...styles.iconContainer, backgroundColor: '#ff7043' }}>
                            <FontAwesomeIcon size={30} name="steam" color="white" />
                        </View>
                        <Text style={{ ...styles.categoryText, color: category === "technology" ? "#0288d1" : "black" }}>TECHNOLOGY</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom : 10
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryContainer: {
        alignItems: 'center',
        flex: 1,
        minWidth: 100
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        borderRadius: 50,
    },
    categoryText: {
        fontSize: 15,
        fontFamily: 'OpenSans-Regular',
        marginTop: 5
    }
})