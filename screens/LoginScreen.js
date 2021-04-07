import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import { Button, Input, Image} from "react-native-elements"
import { StatusBar } from "expo-status-bar"

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState("")

    const signIn = () => {

    }

    return (
        
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style="light"/>
            <Image style={{ width:200, height: 200 }}
                source={{uri: "https://crypto.nexus.io/images/branding/GlobeBlue1000.png"}}
            />
            <View style={styles.inputContainer}>
                <Input placeholder="Email" autofocus type="email" value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <Input placeholder="Password" secureTextEntry type="password" value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            <Button containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button onPress={() => navigation.navigate("Register")} containerStyle={styles.button} type="outline" title="Register" />
            {/* <View style={{ height: 100}} /> */}
        </KeyboardAvoidingView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white",
    },
    inputContainer: {
        width: 300,
    },
    button: {
        width: 200,
        margin: 10,
    }
})