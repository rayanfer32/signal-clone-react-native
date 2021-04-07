import React, { useState , useLayoutEffect } from 'react'
import { KeyboardAvoidingView, ScrollView, StyleSheet, View } from 'react-native'
import Text from "../components/Text"
import { StatusBar } from "expo-status-bar"
import { Button, Input, Image} from "react-native-elements"
import { auth } from '../firebase'

const RegisterScreen = ({ navigation }) => {
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageUrl, setImageUrl] = useState("")

    useLayoutEffect(() => {
        navigation.setOptions({
                headerBackTitle: "B"
            })

    }, [navigation])
    
    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile({
                displayName: name,
                photoURL: imageUrl || "https://crypto.nexus.io/images/shirt-icon.png"
            })
        })
        .catch(error => alert(error.message))
    }

    return (
        
        <ScrollView style={styles.scrollView}> 
        <KeyboardAvoidingView behavior="padding" style={styles.container} scrollable>
            
            <StatusBar style="light"/>
            <Image style={{ width:150, height: 150 }}
                source={{uri: "https://crypto.nexus.io/images/branding/GlobeBlue1000.png"}}
            />
            <Text h3 style={{ marginBottom: 50 }}>
                Create Signal Account
            </Text>

            <View style={styles.inputContainer}>
                <Input placeholder="Full Name" autofocus type="text" value={name}
                    onChangeText={(text) => setName(text)}
                />
                <Input placeholder="Email" type="email" value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input placeholder="Password" secureTextEntry type="password" value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <Input placeholder="Profile Image Url (optional)" type="url" value={imageUrl}
                    onChangeText={(text) => setImageUrl(text)}
                />
            </View>

            <Button containerStyle={styles.button} onPress={register} title="Register" />
            {/* <View style={{ height: 100}} /> */}
            
        </KeyboardAvoidingView>
        </ScrollView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    scrollView:{
        // marginHorizontal: 20,
    },
    inputContainer: {
        width: 300,
        
    },
    button: {
        width: 200,
        margin: 10,
    }
})
