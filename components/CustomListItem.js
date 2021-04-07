import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'

const CustomListItem = () => {
    return (
        <ListItem>
            <Avatar source={{uri: "https://avatars.githubusercontent.com/u/15321253?s=200&v=4"}}>

            </Avatar>

            <ListItem.Content>
            <ListItem.Title style={{ fontWeight: "800" }}>Nexus Chat</ListItem.Title>
            <ListItem.Subtitle numberOfLines={1} style={{ fontWeight: "500" }} ellipsizeMode="tail">Test Subtsdadasdasdasddsssssssssssssssssssssitle</ListItem.Subtitle>
            </ListItem.Content>

        </ListItem>
    )
}

export default CustomListItem

const styles = StyleSheet.create({})
