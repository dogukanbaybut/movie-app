import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native';

const DetailsScreen = () => {
    const { name, params } = useRoute<any>();
    return (
        <View>
            <Text>DetailsScreen</Text>
            <Text>{params.movieimdbID}</Text>
        </View>
    )
}

export default DetailsScreen

const styles = StyleSheet.create({})