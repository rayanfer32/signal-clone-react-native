import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import { SafeAreaView, ScrollView, TextInput, TouchableWithoutFeedback} from "react-native"
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { AntDesign, SimpleLineIcons, FontAwesome, Ionicons } from "@expo/vector-icons"
import { StatusBar } from 'expo-status-bar'
import { KeyboardAvoidingView } from 'react-native'
import { Platform } from 'react-native'
// import {  } from 'react-native-gesture-handler'
import { Keyboard } from 'react-native'

const ChatScreen = ({ navigation, route }) => {
    
    const [input, setInput] = useState("")
    
    function sendMessage(){
        Keyboard.dismiss();
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: route.params.chatName,
            headerBackTitleVisible: false,
            headerTitleAlign: "left",
            headerTitle: () => (
                <View style={{
                    flexDirection: "row",
                    alignItems: "center"
                }}>
                    <Avatar rounded source={{ uri: "https://thumbs.dreamstime.com/b/default-avatar-photo-placeholder-profile-icon-eps-file-easy-to-edit-default-avatar-photo-placeholder-profile-icon-124557887.jpg"}} />
                    <Text style={{ color: "white", marginLeft: 10, fontWeight: "700"}}>{route.params.chatName}</Text>
                </View>
            ),
            headerLeft: () => (
                <TouchableOpacity style={{
                    marginLeft: 10}} 
                    onPress={navigation.goBack}    
                >
                    <AntDesign name="arrowleft" size={24} color="white" />
                </TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{ 
                    flexDirection: "row",
                    marginRight: 20,
                    width: 60,
                    justifyContent: "space-between"
                }}>
                    <TouchableOpacity>
                        <FontAwesome name="video-camera" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Ionicons name="call" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            )
        })
    },[navigation])
    
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <StatusBar style="light" />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}
            >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                <ScrollView>
                    {/* chat goes heere */}

                </ScrollView>

                <View style={styles.footer}>
                    <TextInput 
                        placeholder="signal Message" 
                        style={styles.textInput}
                        value={input}
                        onChangeText={(text) => setInput(text)}    
                    />
                    <TouchableOpacity onPress={sendMessage}>
                        <Ionicons name="send" size={24} color="#2B68E6" />
                    </TouchableOpacity>

                </View>
                </>
            </TouchableWithoutFeedback>


            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

export default ChatScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    footer: {
        flexDirection: "row",
        width: "100%",
        padding: 15,
        alignItems: "center",
    },
    textInput: {
        bottom: 0,
        height: 40,
        flex: 1,
        marginRight: 15,
        borderColor: "transparent",
        backgroundColor: "#ECECEC",
        padding: 10,
        color: "grey",
        borderRadius: 30,
    },
})
