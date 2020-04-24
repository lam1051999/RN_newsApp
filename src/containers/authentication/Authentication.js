import * as firebase from 'firebase';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

export function signIn(email, password, setIsGoogleLogin, setIsLoading) {
    setIsLoading(true);
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function () {
            setIsGoogleLogin(false);
            setIsLoading(false);
        })
        .catch(function (error) {
            alert(error.message);
            setIsLoading(false);
        })
}

export function signUp(name, email, password, setIsLoading) {
    setIsLoading(true);
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredentials => {
            userCredentials.user.updateProfile({
                displayName: name
            })
            setIsLoading(false);
        })
        .catch(function (error) {
            alert(error.message);
            setIsLoading(false);
        })
}

export function signOut(setUser, setIsLoading) {
    setIsLoading(true);
    firebase.auth().signOut()
        .then(function () {
            setIsLoading(false);
            setUser(null);
        })
        .catch(function (error) {
            alert(error.message);
            setIsLoading(false);
        })
}

export async function signInWithGoogle(setUser, setIsGoogleLogin) {
    try {
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        const userInfo = await GoogleSignin.signIn();
        setIsGoogleLogin(true)
        setUser(userInfo);
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            alert("Signing in with Google is canceled")
        } else if (error.code === statusCodes.IN_PROGRESS) {
            alert("Signing in with Google is in progress")
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            alert("Google Play is not available")
        } else {
            alert("There are some errors happened")
        }
        console.log(error);
    }
}

export async function signOutWithGoogle(setUser, setIsLoading) {
    setIsLoading(true);
    try {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        setIsLoading(false);
        setUser(null);
    } catch (error) {
        console.log(error);
        setIsLoading(false);
    }
}