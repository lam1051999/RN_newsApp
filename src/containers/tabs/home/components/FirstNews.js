import React, { useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, Image } from 'react-native'
import ModalWebview from './ModalWebview';

export default function FirstNews({ firstNews }) {
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
            {
                JSON.stringify(firstNews) === "{}" ?
                    null
                    :
                    <View style={styles.container}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: `${firstNews.urlToImage}` }} style={styles.image} />
                        </View>
                        <Text style={styles.source}>{firstNews.source.name ? firstNews.source.name : "Anonymous"}</Text>
                        <Text style={styles.title}>{firstNews.title}</Text>
                        <View style={styles.footer}>
                            <Text style={styles.time}>{convertTime(firstNews.publishedAt) < 24 ? convertTime(firstNews.publishedAt) + " hours ago" : firstNews.publishedAt.slice(0, 10)}</Text>
                            <TouchableOpacity style={styles.viewButton} onPress={() => {
                                setOpenWebview(true);
                                setUrl(firstNews.url);
                                loadingWeb();
                            }}>
                                <Text style={styles.view}>View>></Text>
                            </TouchableOpacity>
                        </View>
                        <ModalWebview url={url} openWebview={openWebview} setOpenWebview={setOpenWebview} isLoading={isLoading} />
                    </View>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5
    },
    imageContainer: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        width: null,
        height: null
    },
    title: {
        fontSize: 17,
        fontFamily: 'OpenSans-Regular',
        fontWeight: 'bold',
    },
    source: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 15,
        color: '#0288d1',
    },
    footer: {
        flexDirection: 'row',
        marginTop: 10
    },
    time: {
        fontFamily: 'OpenSans-Regular',
        fontSize: 12,
        flexGrow: 1
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