import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { s } from 'react-native-size-matters';
import colors from '../theme/colors';
import { OmdbSearchItem } from '../api/omdb';
import { getSavedMovies } from '../storage/saved';
import MovieCard from '../components/MovieCard';

const SavedScreen = () => {
    const [movies, setMovies] = useState<OmdbSearchItem[]>([]);

    useFocusEffect(
        useCallback(() => {
            let isMounted = true;

            getSavedMovies().then((saved) => {
                if (isMounted) setMovies(saved);
            });

            return () => {
                isMounted = false;
            };
        }, [])
    );

    return (
        <SafeAreaView style={styles.container} edges={[]}>
            {movies.length === 0 ? (
                <View style={styles.centered}>
                    <Text style={styles.emptyText}>You haven't saved any movies yet</Text>
                </View>
            ) : (
                <FlatList
                    data={movies}
                    renderItem={({ item }) => <MovieCard movie={item} />}
                    keyExtractor={(item, index) => `${item.imdbID}-${index}`}
                    numColumns={2}
                />
            )}
        </SafeAreaView>
    )
}

export default SavedScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    centered: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: s(24),
    },
    emptyText: {
        color: colors.inactiveColor,
        fontSize: s(14),
        textAlign: 'center',
    },
})
