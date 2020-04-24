import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Image, ScrollView } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { signUp } from '../Authentication';
import Loading from '../../../components/Loading';

export default function Signin() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validName, setValidName] = useState(true);
    const [validEmail, setValidEmail] = useState(true);
    const [validPassword, setValidPassword] = useState(true);
    const [showPassword, setShowPassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    return (
        <KeyboardAvoidingView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.appTitle}>
                        <Image source={require('../../../../assets/images/appIcon.png')} style={styles.appIcon} />
                        <Text style={styles.title}>SIGN UP</Text>
                    </View>
                    <View style={styles.form}>
                        <View style={styles.inputControll}>
                            <Text style={styles.label}>Name</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="Jhon Witch..."
                                    placeholderTextColor="#616161"
                                    value={name}
                                    onChangeText={name => setName(name)}
                                    autoCapitalize="characters"
                                    selectionColor="#616161"
                                    style={styles.input}
                                    onBlur={() => !name ? setValidName(false) : setValidName(true)}
                                />
                                <FeatherIcon name="user" style={styles.icon} color="#616161" size={25} />
                            </View>
                            <Text style={styles.validText}>{validName ? "" : "You must fill in this field"}</Text>
                        </View>
                        <View style={styles.inputControll}>
                            <Text style={styles.label}>Email</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="example@example.com..."
                                    placeholderTextColor="#616161"
                                    value={email}
                                    onChangeText={email => setEmail(email)}
                                    autoCapitalize="none"
                                    selectionColor="#616161"
                                    style={styles.input}
                                    onBlur={() => !email ? setValidEmail(false) : setValidEmail(true)}
                                />
                                <MaterialCommunityIcon name="email-outline" style={styles.icon} color="#616161" size={25} />
                            </View>
                            <Text style={styles.validText}>{validEmail ? "" : "You must fill in this field"}</Text>
                        </View>
                        <View style={styles.inputControll}>
                            <Text style={styles.label}>Password</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="example..."
                                    placeholderTextColor="#616161"
                                    value={password}
                                    onChangeText={password => setPassword(password)}
                                    autoCapitalize="none"
                                    selectionColor="#616161"
                                    style={styles.input}
                                    onBlur={() => !password ? setValidPassword(false) : setValidPassword(true)}
                                    secureTextEntry={showPassword}
                                />
                                {!showPassword ? <IonIcon name="ios-eye" style={styles.icon} color="#616161" size={25} onPress={() => setShowPassword(true)} /> : <IonIcon name="ios-eye-off" style={styles.icon} color="#616161" size={25} onPress={() => setShowPassword(false)} />}
                            </View>
                            <Text style={styles.validText}>{validPassword ? "" : "You must fill in this field"}</Text>
                        </View>
                        <TouchableOpacity style={styles.submitButton} activeOpacity={0.5} onPress={() => {
                            if (email && password && name)
                                signUp(name, email, password, setIsLoading)
                            else
                                alert('You must fill all the fields')
                        }}>
                            <Text style={styles.submitButtonText}>SIGN UP</Text>
                        </TouchableOpacity>
                    </View>
                    <Loading isLoading={isLoading} text="Signing up" />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems : 'center'
    },
    appTitle: {
        marginBottom: 30,
        alignItems: 'center',
        marginTop: 20,
    },
    appIcon: {
        height: 100,
        width: 120
    },
    title: {
        fontSize: 22,
        color: '#0288d1',
        textAlign: 'center',
        fontFamily: "Righteous-Regular"
    },
    form: {
        width: '80%',
        alignItems: 'center'
    },
    inputControll: {
        width: '100%'
    },
    label: {
        fontSize: 17,
        color: '#616161',
        fontFamily: 'OpenSans-Regular'
    },
    inputContainer: {
        position: 'relative',
        justifyContent: 'center',
    },
    input: {
        borderBottomColor: '#616161',
        borderBottomWidth: 1,
        height: 60,
        paddingLeft: 20,
        fontSize: 15,
        paddingRight: 50,
        fontFamily: 'OpenSans-Regular'
    },
    icon: {
        position: 'absolute',
        alignSelf: 'flex-end',
        right: 10
    },
    validText: {
        marginLeft: 10,
        marginBottom: 5,
        color: 'red',
        fontFamily: 'OpenSans-Regular'
    },
    submitButton: {
        backgroundColor: '#0288d1',
        width: '100%',
        height: 60,
        justifyContent: 'center',
        borderRadius: 5
    },
    submitButtonText: {
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontFamily: 'OpenSans-Regular'
    }
})