import { Pressable, StyleSheet, TextInput, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../theme/colors'
import { s } from 'react-native-size-matters'
import { useState } from 'react'
import searchMovies from '../api/omdb'

const HomeScreen = () => {
    const [searchQuery, setSearchQuery] = useState("Batman")

    const onSubmit = () => {
        searchMovies(searchQuery)
    };

    return (
        <SafeAreaView style={styles.container} edges={[]}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholder="Search movies..."
                    placeholderTextColor={colors.inactiveColor}
                    returnKeyType="search"
                />
                <Pressable onPress={onSubmit} style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </Pressable>
            </View>

        </SafeAreaView >

    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    searchContainer: {
        flexDirection: 'row',
        gap: s(10),

        padding: s(12),
    },
    searchInput: {
        flex: 1,
        borderWidth: s(1),
        borderColor: colors.activeColor,
        color: colors.textColor,
        backgroundColor: colors.backgroundColor,
        borderRadius: s(8),
        paddingHorizontal: s(12),
        fontWeight: 700,

    },
    searchButton: {
        backgroundColor: colors.buttonColor,
        paddingHorizontal: s(12),
        paddingVertical: s(8),
        borderRadius: s(8),
        justifyContent: 'center',
    },
    searchButtonText: {
        color: colors.textColor,
        fontWeight: 700,

    },
})