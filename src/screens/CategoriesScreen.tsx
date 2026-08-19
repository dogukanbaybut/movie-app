import { ActivityIndicator, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import colors from '../theme/colors';
import CATEGORIES from '../constants/categories';
import searchMovies, { OmdbSearchItem } from '../api/omdb';
import MovieCard from '../components/MovieCard';
import CustomLoading from '../components/CustomLoading';
import { s } from 'react-native-size-matters';



const CategoriesScreen = () => {


    const [active, setActive] = useState(CATEGORIES[0]);
    const [movies, setMovies] = useState<OmdbSearchItem[]>([]);
    const [Loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const fetchMovies = async () => {

        setLoading(true);
        try {
            const res = await searchMovies(active.query, 1);
            setMovies(res.Search || []);
        }
        catch {
            setError("Something went wrong");
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchMovies();
    }, [active])
    return (
        <SafeAreaView style={styles.container} edges={[]}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
                contentContainerStyle={styles.categoryScrollContent}
            >
                {
                    CATEGORIES.map((c) => (
                        <Pressable
                            key={c.key}
                            onPress={() => setActive(c)}
                            style={[
                                styles.categoryItem,
                                c.key === active.key && styles.categoryItemActive,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.categoryText,
                                    c.key === active.key && styles.categoryTextActive,
                                ]}
                            >
                                {c.title}
                            </Text>
                        </Pressable>
                    ))
                }
            </ScrollView>

            {Loading ? (
                <CustomLoading />
            ) : error ? (
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Text style={styles.errorText}>{error}</Text>
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

export default CategoriesScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
    },
    categoryScroll: {
        flexGrow: 0,
        flexShrink: 0,
        height: s(50),
    },
    categoryScrollContent: {
        alignItems: 'center',
        paddingHorizontal: s(10),
        gap: s(10),
    },
    categoryText: {
        color: colors.textColor,
        fontSize: s(12),
        fontWeight: '600',
    },
    categoryTextActive: {
        color: colors.backgroundColor,
    },
    errorText: {
        color: "red",
        fontSize: 18,
        fontWeight: 'bold',
        padding: 10,
    },
    categoryItem: {
        backgroundColor: 'transparent',
        borderWidth: s(1),
        borderColor: colors.buttonColor,
        borderRadius: s(20),
        paddingHorizontal: s(14),
        paddingVertical: s(6),
    },
    categoryItemActive: {
        backgroundColor: colors.buttonColor,
        borderColor: colors.buttonColor,
    },
})