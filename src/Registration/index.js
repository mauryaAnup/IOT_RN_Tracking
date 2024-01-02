import React, { useEffect, useRef, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Animated,
    Dimensions,
    TextInput,
    Keyboard,
    Image,
    Alert,
} from 'react-native';
import Lottie from 'lottie-react-native';
import { CommonActions } from '@react-navigation/native';
import imageConstants from '../constants/imageConstants';
import { auth } from '../Firebase/Firebase.config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Loader from '../CommonCode/Loader';

const RegistrationScreen = ({ navigation }) => {

    const animationRef = useRef(new Animated.Value(0));
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(true);
    const [isRePasswordVisible, setRePasswordVisible] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        animationRef.current?.play();
        animationRef.current?.play(30, 120);
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            },
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            },
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const register_user = () => {
        // var regex = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g
        if (email !== '' && email !== null) {
            if (password !== '' && password !== null) {
                if (password === rePassword) {
                    setLoading(true)
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            setLoading(false)
                            alert("Registration Successful")
                            navigation.dispatch(
                                CommonActions.reset({
                                    index: 0,
                                    routes: [{ name: "Login" }]
                                })
                            )
                        }).catch((error) => {
                            const errorCode = error.code;
                            console.log(errorCode);
                            if (errorCode === 'auth/invalid-email') {
                                alert("Inavild Email Address")
                            } else if (errorCode === 'auth/weak-password') {
                                alert("Password must be of 6 character")
                            } else if (errorCode === 'auth/email-already-in-use') {
                                alert("Email Already Exist")
                            }
                            setLoading(false)
                        });
                } else {
                    alert('Both Password does not match')
                }
            } else {
                alert('Please Enter Password')
            }
        } else {
            alert('Please Enter Email Address')
        }
    }

    return (
        <Loader isLoading={isLoading}>
            <View style={{ flex: 1 }}>
                <View
                    style={{
                        height: Dimensions.get('screen').height / 2,
                        backgroundColor: 'violet',
                        borderBottomLeftRadius: 40,
                        borderBottomRightRadius: 40,
                        // alignItems: "center",
                    }}>
                    <Lottie
                        ref={animationRef}
                        source={require('../../assets/74268-cute-tiger.json')}
                        style={{
                            marginLeft: -10,
                            height: isKeyboardVisible ? 0 : 380,
                            // width: 0,
                            marginTop: 7,
                        }}
                    />
                </View>
                <View
                    style={{
                        // position: "absolute",
                        height: isKeyboardVisible ? '84%' : '55%',
                        width: '90%',
                        backgroundColor: 'white',
                        // top: "-33%",
                        marginTop: isKeyboardVisible ? -365 : -175,
                        alignSelf: 'center',
                        elevation: 15,
                        borderRadius: 30,
                    }}>
                    <Text
                        style={{
                            color: 'purple',
                            fontSize: 28,
                            fontWeight: 'bold',
                            borderBottomWidth: 2,
                            width: 205,
                            alignSelf: 'center',
                            marginTop: 15,
                            borderBottomColor: 'purple',
                            marginBottom: 20,
                        }}>
                        REGISTER HERE
                    </Text>
                    <Text
                        style={{
                            color: 'black',
                            marginHorizontal: 20,
                            fontSize: 18,
                            marginBottom: 5,
                            fontWeight: '400',
                        }}>
                        Email
                    </Text>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            padding: 0,
                            marginHorizontal: 20,
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            marginBottom: 15,
                            color: 'black',
                        }}
                        placeholder="Enter Email Address"
                        placeholderTextColor={'grey'}
                        value={email}
                        onChangeText={(value) => {
                            setEmail(value)
                        }}
                    />
                    <Text
                        style={{
                            color: 'black',
                            marginHorizontal: 20,
                            fontSize: 18,
                            marginBottom: 5,
                            fontWeight: '400',
                        }}>
                        Set Password
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: "space-between",
                        paddingHorizontal: 8,
                        marginHorizontal: 20,
                        borderRadius: 5,
                        paddingVertical: 5.5
                    }}>
                        <TextInput
                            style={{
                                padding: 0,
                                color: 'black',
                                width: "90%"
                            }}
                            placeholder="Enter Password"
                            placeholderTextColor={'grey'}
                            secureTextEntry={isPasswordVisible}
                            value={password}
                            onChangeText={(value) => {
                                setPassword(value)
                            }}
                        />
                        <TouchableOpacity onPress={() => {
                            setPasswordVisible(!isPasswordVisible)
                        }}>
                            <Image source={isPasswordVisible ? imageConstants.ic_open_eye : imageConstants.ic_close_eye} resizeMode="center" style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <Text
                        style={{
                            color: 'black',
                            marginHorizontal: 20,
                            fontSize: 18,
                            marginBottom: 5,
                            fontWeight: '400',
                            marginTop: 15
                        }}>
                        Re-Enter Password
                    </Text>
                    <View style={{
                        flexDirection: 'row',
                        borderWidth: 1,
                        alignItems: 'center',
                        justifyContent: "space-between",
                        paddingHorizontal: 8,
                        marginHorizontal: 20,
                        borderRadius: 5,
                        paddingVertical: 5.5
                    }}>
                        <TextInput
                            style={{
                                padding: 0,
                                color: 'black',
                                width: "90%"
                            }}
                            placeholder="Enter Password"
                            placeholderTextColor={'grey'}
                            secureTextEntry={isRePasswordVisible}
                            value={rePassword}
                            onChangeText={(value) => {
                                setRePassword(value)
                            }}
                        />
                        <TouchableOpacity onPress={() => {
                            setRePasswordVisible(!isRePasswordVisible)
                        }}>
                            <Image source={isRePasswordVisible ? imageConstants.ic_open_eye : imageConstants.ic_close_eye} resizeMode="center" style={{ height: 20, width: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={{
                            backgroundColor: 'violet',
                            paddingHorizontal: 50,
                            paddingVertical: 10,
                            alignSelf: 'center',
                            marginTop: 20,
                            alignItems: 'center',
                            borderRadius: 10,
                        }}
                        onPress={() => {
                            register_user()
                        }}>
                        <Text
                            style={{
                                color: 'white',
                                fontSize: 20,
                                fontWeight: 'bold',
                            }}>
                            {'Register'.toLocaleUpperCase()}
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text
                            style={{
                                color: 'black',
                                // textAlign: "center",
                                marginTop: 10,
                                fontSize: 16,
                                fontWeight: '400',
                            }}>
                            Already have an account?{' '}
                        </Text>
                        <TouchableOpacity
                            style={{
                                alignSelf: 'center',
                            }}
                            onPress={() => {
                                navigation.dispatch(
                                    CommonActions.reset({
                                        index: 0,
                                        routes: [{ name: 'Login' }]
                                    })
                                )
                            }}>
                            <Text
                                style={{
                                    color: 'violet',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    marginTop: 10,
                                }}>
                                Login Here
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Loader>
    );
};

export default RegistrationScreen;
