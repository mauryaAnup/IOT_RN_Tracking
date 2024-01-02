import AnimatedLottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { Animated, Dimensions, Modal, SafeAreaView, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import NetInfo from "@react-native-community/netinfo"

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const Loader = (props) => {

    const [isNetConnected, setNetConnected] = useState(true)

    useEffect(() => {
        NetInfo.addEventListener(state => {
            setNetConnected(state.isConnected)
        });
    })

    return (
        <SafeAreaProvider>
            <SafeAreaView style={{ flex: 1 }}>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={props.isLoading}
                    style={{
                        width: width,
                        height: height,
                        // backgroundColor: 'rgba(0,0,0,0.7)'
                    }}>
                    <View
                        style={{
                            width: width,
                            height: height,
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        <AnimatedLottieView
                            source={require('../../assets/Loader.json')}
                            autoPlay
                            loop
                            style={{
                                alignSelf: "center",
                                justifyContent: "center",
                                height: 95,
                                width: 120,
                            }}
                        />
                    </View>
                </Modal>
                <Modal
                    animationType="none"
                    transparent={true}
                    visible={!isNetConnected}
                    style={{
                        width: width,
                        height: height,
                        // backgroundColor: 'rgba(0,0,0,0.7)'
                    }}>
                    <View
                        style={{
                            width: width,
                            height: height,
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            alignItems: "center",
                            justifyContent: "center"
                        }}>
                        <View
                            style={{
                                backgroundColor: 'white',
                                borderRadius: 10
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 22,
                                    color: 'red',
                                    paddingHorizontal: 20,
                                    paddingVertical: 30,
                                    fontWeight: 'bold'
                                }}
                            >
                                No Internet Connection
                            </Text>
                        </View>
                    </View>
                </Modal>
                {
                    props.children
                }
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

export default Loader;