import React, { useEffect, useState } from "react";
import { Alert, Animated, Image, ImageBackground, Text, TouchableOpacity, Vibration, View } from "react-native";
import { ref, onValue } from 'firebase/database';
import { db } from '../Firebase/Firebase.config';
import Loader from "../CommonCode/Loader";
import AnimatedLottieView from "lottie-react-native";
import { CommonActions } from '@react-navigation/native';

const DashboardScreen = ({ navigation }) => {

    const [distance, setDistance] = useState(0);
    const [visible, setVisible] = useState(false);

    const animationRef = new Animated.Value(0);
    const ONE_SECOND_IN_MS = 1000;

    const PATTERN = [
        1 * ONE_SECOND_IN_MS,
        2 * ONE_SECOND_IN_MS,
        3 * ONE_SECOND_IN_MS,
    ];

    useEffect(() => {
        animationRef.current?.play();
        animationRef.current?.play(0, 200);
        const starCountRef = ref(db, 'Distance');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log("data: ", data);
            setDistance(data)
        })
    }, []);

    const noDanger = () => {
        Vibration.cancel()
        return (
            <View style={{
                alignItems: 'center'
            }}>
                <AnimatedLottieView
                    ref={animationRef}
                    source={require('../../assets/safe.json')}
                    autoPlay
                    loop
                    style={{
                        height: 220,
                        width: 220,

                    }}
                    resizeMode="cover"
                />
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "#298121",
                        textAlign: "center",
                    }}
                >
                    {' You are in safe zone. \nNo wild animal detected.'}
                </Text>
                <TouchableOpacity
                    style={{
                        backgroundColor: 'violet',
                        alignItems: 'center',
                        borderRadius: 10,
                        justifyContent: 'center',
                        marginTop: 50
                    }}
                    onPress={() => { setVisible(!visible) }}
                >
                    <Text
                        style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            color: 'white'
                        }}
                    >
                        Check Distance
                    </Text>
                </TouchableOpacity>
                {visible ?
                    (<View
                        style={{
                            alignItems: "center"
                        }}
                    >
                        <Text
                            style={{
                                marginTop: 35,
                                fontSize: 25,
                                fontStyle: 'italic',
                            }}
                        >
                            {'You are at Safe Distance'}
                        </Text>
                        <Text
                            style={{
                                fontSize: 30,
                                fontWeight: 'bold',
                                fontStyle: 'italic'
                            }}
                        >
                            {parseInt(distance) + ' cm'}
                        </Text>
                    </View>) : null}
            </View>
        )
    }

    const danger = () => {
        Vibration.vibrate(PATTERN, true)
        return (
            <View style={{
                alignItems: 'center',
                marginTop: 10
            }}>
                <AnimatedLottieView
                    ref={animationRef}
                    source={require('../../assets/alert.json')}
                    autoPlay
                    loop
                    style={{
                        height: 200,
                        width: 200,
                    }}
                />
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                        color: "red",
                        textAlign: "center"
                    }}
                >
                    {' Wild Animal Detected. \nPlease get to safe zone.'}
                </Text>
                <Text style={{
                    fontSize: 24,
                    marginTop: 10,
                    fontWeight: "bold",
                    color: "white",
                    textAlign: "center"
                }}>
                    {'Distance : ' + parseInt(distance) + ' cm'}
                </Text>
                <AnimatedLottieView
                    ref={animationRef}
                    source={require('../../assets/tiger.json')}
                    autoPlay
                    loop
                    style={{
                        marginTop: 20,
                        height: 170,
                        width: 100,
                        // marginLeft: 20
                    }}
                />
            </View>
        )
    }

    return (
        <Loader isLoading={false}>
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../assets/images/dashboard_bg.jpg')}
                    style={{
                        flex: 1 / 2.3,
                    }}
                >
                    <View
                        style={{
                            height: 50,
                            backgroundColor: 'rgba(255,255,255,0.5)',
                            justifyContent: "space-between",
                            alignItems: "center",
                            flexDirection: 'row'
                        }}
                    >
                        <Text
                            style={{
                                color: "black",
                                fontSize: 22,
                                fontWeight: "bold",
                                marginLeft: 20
                            }}
                        >
                            Wild Animal Traker
                        </Text>
                        <TouchableOpacity
                            hitSlop={{ top: 30, bottom: 30, left: 30, right: 30 }}
                            style={{
                                height: 30,
                                width: 30,
                                marginRight: 15
                            }}
                            onPress={
                                () => {
                                    Alert.alert('LOGOUT', 'Do you want to logout?',
                                        [
                                            {
                                                text: 'YES',
                                                onPress: () => {
                                                    Vibration.cancel()
                                                    navigation.dispatch(
                                                        CommonActions.reset({
                                                            index: 0,
                                                            routes: [{ name: "Login" }]
                                                        })
                                                    )
                                                }
                                            },
                                            {
                                                text: 'NO',
                                                onPress: () => { },
                                                style: 'cancel'
                                            }
                                        ],
                                    )
                                }
                            }
                        >
                            <Image
                                style={{
                                    height: 30,
                                    width: 30
                                }}
                                source={require('../../assets/images/more.png')}
                            // resizeMode="center"
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            paddingVertical: 30,
                            paddingHorizontal: 20,
                            flex: 1,
                            backgroundColor: 'rgba(0,0,0,0.6)',
                        }}
                    >
                        <Image
                            source={require('../../assets/images/user.png')}
                            style={{
                                height: 70,
                                width: 70,
                                marginRight: 15
                            }}
                            resizeMode={'contain'}
                        />
                        <View>
                            <Text
                                style={{
                                    fontSize: 22,
                                    color: 'white',
                                    fontWeight: "bold",
                                }}
                            >
                                {'Welcome, '}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 22,
                                    color: 'white',
                                    fontWeight: "bold",
                                    width: 270
                                }}
                            >
                                {global.userEmail}
                            </Text>
                        </View>

                    </View>

                </ImageBackground>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        // justifyContent: "center",
                        backgroundColor: "#333333",
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                        marginTop: -50
                    }}>
                    {distance > 20 ? noDanger() : danger()}
                </View>
            </View>
        </Loader>
    )
}

export default DashboardScreen;