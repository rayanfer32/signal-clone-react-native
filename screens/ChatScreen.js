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
import { db, auth } from '../firebase'
import * as firebase from "firebase"

const ChatScreen = ({ navigation, route }) => {
    
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    
    useLayoutEffect(() => {
        const unsubscribe = db
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot) => setMessages(
            snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            }))
        ))

        return unsubscribe;
    },[route])

    function sendMessage(){
        Keyboard.dismiss();

        db
        .collection('chats')
        .doc(route.params.id)
        .collection('messages')
        .add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL
        })

        setInput("");
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
                    <Avatar rounded 
                    source={{ 
                        uri: messages[0]?.data.photoURL
                        }} />
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
    },[navigation,messages])
    
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
                <ScrollView contentContainerStyle={{ paddingTop: 10 }}>
                    {
                        messages.map(({ id, data }) => (
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.reciever}>
                                    <Avatar 
                                        rounded
                                        // WEB
                                        containerStyle={{
                                            posiiton: "absolute",
                                            bottom: -15,
                                            right:-5,
                                        }}
                                        position="absolute"
                                        bottom= {-15}
                                        right={-5}
                                        size={30} 
                                        source={{ uri: data.photoURL}} 
                                    />

                                    <Text style={styles.recieverText} >{data.message}</Text>
                                </View>
                             ) : (

                                 <View key={id} style={styles.sender} >
                                    <Avatar 
                                        rounded
                                      
                                        // WEB
                                        containerStyle={{
                                            posiiton: "absolute",
                                            bottom: -15,
                                            left:-5,
                                        }}
                                        position="absolute"
                                        bottom= {-15}
                                        left={-5}
                                        size={30} 
                                        source={{ uri: data.photoURL}} 
                                    />

                                    <Text style={styles.senderText} >{data.message}</Text>
                                    <Text style={styles.senderName} >{data.displayName}</Text>

                                 </View>
                             )
                        ))
                    }

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
    sender: {
        padding: 15,
        backgroundColor: "#2B68E6",
        alignSelf: "flex-start",
        borderRadius: 20,
        margin: 15,
        maxWidth: "80%",
        position: "relative",
    },
    senderText: {
        color: "white",
        fontWeight: "500",
        marginLeft: 10,
        marginBottom: 15,
    },
    senderName: {
        left: 10,
        paddingRight: 10,
        fontSize: 10,
        color: "white",
    },  
    reciever: {
        padding: 15,
        backgroundColor: "#ECECEC",
        alignSelf: "flex-end",
        borderRadius: 20,
        marginRight: 15,
        marginBottom: 20,
        maxWidth: "80%",
        position: "relative",
    },
    recieverText: {
        color: "black",
        fontWeight: "500",
        marginLeft: 10,
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
