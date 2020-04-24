import React, { useState } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, Text, Dimensions } from 'react-native'
import ModalWebview from './ModalWebview';

const { width } = Dimensions.get('window');
export default function News({ newsItem }) {
    const [openWebview, setOpenWebview] = useState(false);
    const [url, setUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    function loadingWeb() {
        setIsLoading(true);
        setTimeout(function () {
            setIsLoading(false);
        }, 500);
    }
    return (
        <>
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image source={{ uri: `${newsItem.urlToImage}` }} style={styles.image} />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.source}>{newsItem.source.name ? newsItem.source.name : "Anonymous"}</Text>
                    <Text style={styles.title}>{newsItem.title}</Text>
                    <View style={styles.footer}>
                        <View style={styles.timeContainer}>
                            <Text style={styles.time}>{convertTime(newsItem.publishedAt) < 24 ? convertTime(newsItem.publishedAt) + " hours ago" : newsItem.publishedAt.slice(0, 10)} </Text>
                        </View>
                        <TouchableOpacity style={styles.viewButton} onPress={() => {
                            setOpenWebview(true);
                            setUrl(newsItem.url);
                            loadingWeb();
                        }}>
                            <Text style={styles.view}>View>></Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ModalWebview url={url} openWebview={openWebview} setOpenWebview={setOpenWebview} isLoading={isLoading} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width * 0.9,
        padding: 5,
        minWidth: 120,
        flex: 1
    },
    imageContainer: {
        width: 100,
        height: 100,
        borderRadius: 5,
        overflow: 'hidden',
        maxWidth: width * 0.25
    },
    image: {
        flex: 1,
        width: null,
        height: null
    },
    contentContainer: {
        paddingHorizontal: 5,
        alignSelf: 'flex-start',
        flexGrow : 1,
        maxWidth: width * 0.75
    },
    source: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 15,
        color: '#0288d1',
    },
    title: {
        fontSize: 17,
        fontFamily: 'OpenSans-Regular',
        fontWeight: 'bold',
    },
    description: {
        fontSize: 15,
        fontFamily: 'OpenSans-Regular',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        flexGrow: 1
    },
    timeContainer: {
        alignItems: 'flex-start',
        flexGrow: 1
    },
    time: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
    },
    viewButton: {
        marginRight: 10,
    },
    view: {
        fontSize: 17,
        fontFamily: 'OpenSans-Regular',
        color: "#0288d1",
    }
})

function convertTime(str) {
    let timeDiffer = Date.now() - Date.parse(`${str}`);
    let realTime = Math.floor((timeDiffer / 1000 / 3600) + 7);
    return realTime;
}