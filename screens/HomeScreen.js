import { NavigationContainer } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView, TouchableOpacity } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import CustomListItem from "../components/CustomListItem"
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import  { auth } from "../firebase"
import { Avatar } from "react-native-elements"
import { StatusBar } from 'expo-status-bar'

const HomeScreen = ({ navigation }) => {


    const signOutUser = () => {
        auth.signOut().then(() => {
            navigation.replace("Login")
        })
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: "Signal",
            headerStyle: { backgroundColor: "#fff" },
            headerTitleStyle: { color: "black" },
            headerTintColor: "black",
            headerMode: "screen",
            headerLeft: () => 
                (<View style={{  marginLeft: 10}} >
                    <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}> 
                        <Avatar rounded source={{ uri: "https://avatars.githubusercontent.com/u/37145078?v=4"}} />
                    </TouchableOpacity>
                 </View>) ,
            headerRight: () => 
            (<View style={{  
                flexDirection: "row",
                justifyContent: "space-between",
                width: 60,
                marginRight: 20,
            }} >
                <TouchableOpacity activeOpacity={0.5}> 
                    <AntDesign name="camerao" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.5}> 
                    <SimpleLineIcons name="pencil" size={22} color="black" />
                </TouchableOpacity>
             </View>)                   
            },
                        
        )
    }, [navigation])

    return (
        
        <SafeAreaView>
            <StatusBar color="dark"/>
            <ScrollView>
                <CustomListItem />
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({})
