import React, { useContext, useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'
import { UserContext } from '../../../../App'
import { signOut, signOutWithGoogle } from '../../authentication/Authentication';
import Loading from '../../../components/Loading';

export default function Home() {
    const { user, setUser, isGoogleLogin } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <View style={styles.container}>
            {
                user ? (isGoogleLogin ?
                    <View style={styles.wrapper}>
                        <View style={styles.imageContainer}>
                            <Image source={{ uri: `${user.user.photo}` }} style={styles.image} />
                        </View>
                        <View style={styles.nameContainer}>
                            <View style={styles.divider}></View>
                            <Text style={styles.name}>Name: {user.user.name}</Text>
                            <View style={styles.divider}></View>
                        </View>
                        <View style={styles.emailContainer}>
                            <View style={styles.divider}></View>
                            <Text style={styles.email}>Email: {user.user.email}</Text>
                            <View style={styles.divider}></View>
                        </View>
                    </View>
                    :
                    <View style={styles.wrapper}>
                        <View style={styles.imageContainer}>
                            <Image source={require('../../../../assets/images/avatar.png')} style={styles.image} />
                        </View>
                        <View style={styles.nameContainer}>
                            <View style={styles.divider}></View>
                            <Text style={styles.name}>Name: {user.displayName}</Text>
                            <View style={styles.divider}></View>
                        </View>
                        <View style={styles.emailContainer}>
                            <View style={styles.divider}></View>
                            <Text style={styles.email}>Email: {user.email}</Text>
                            <View style={styles.divider}></View>
                        </View>
                    </View>
                ) : null
            }
            <TouchableOpacity onPress={() => {
                isGoogleLogin ? signOutWithGoogle(setUser, setIsLoading) : signOut(setUser, setIsLoading)
            }}>
                <Text style={styles.signOutText}>SIGN OUT</Text>
            </TouchableOpacity>
            <Loading isLoading={isLoading} text="Signing out" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    wrapper: {
        padding: 10,
        width: '80%',
        marginTop: 40
    },
    imageContainer: {
        borderRadius: 60,
        width: 120,
        height: 120,
        alignSelf: 'center',
        overflow: 'hidden'
    },
    image: {
        flex: 1,
        width: null,
        height: null,
    },
    nameContainer: {
        marginTop: 30,
    },
    name: {
        marginVertical: 10,
        fontSize: 17,
        fontFamily: 'OpenSans-Regular'
    },
    emailContainer: {
        marginTop: 30,
        marginBottom: 50
    },
    email: {
        marginVertical: 10,
        fontSize: 17,
        fontFamily: 'OpenSans-Regular'
    },
    signOutText: {
        color: '#0288d1',
        fontSize: 20,
        fontFamily: 'OpenSans-Regular'
    },
    divider : {
        width : '100%',
        borderBottomColor : '#616161',
        borderBottomWidth : 0.5,
    }
})