import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { s, vs } from 'react-native-size-matters';
import { getMovieDetails, OmdbDetails } from '../api/omdb';
import colors from '../theme/colors';
import CustomLoading from '../components/CustomLoading';
import { isMovieSaved, toggleSavedMovie } from '../storage/saved';

const DetailsScreen = () => {
    const { params } = useRoute<any>();
    const [movie, setMovie] = useState<OmdbDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [saved, setSaved] = useState(false);
    const [savingInProgress, setSavingInProgress] = useState(false);

    useEffect(() => {
        let isMounted = true;

        const fetchDetails = async () => {
            setLoading(true);
            setError('');

            try {
                const data = await getMovieDetails(params.movieimdbID);
                if (!isMounted) return;

                if (data && data.Response === 'True') {
                    setMovie(data);
                } else {
                    setError(data?.Error || 'Movie details could not be found');
                }
            } catch {
                if (isMounted) setError('Something went wrong');
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchDetails();

        return () => {
            isMounted = false;
        };
    }, [params.movieimdbID]);

    useEffect(() => {
        let isMounted = true;

        isMovieSaved(params.movieimdbID).then((result) => {
            if (isMounted) setSaved(result);
        });

        return () => {
            isMounted = false;
        };
    }, [params.movieimdbID]);

    const onToggleSave = async () => {
        if (!movie || savingInProgress) return;

        setSavingInProgress(true);
        try {
            const { saved: nowSaved } = await toggleSavedMovie({
                imdbID: movie.imdbID,
                Title: movie.Title,
                Year: movie.Year,
                Type: movie.Type,
                Poster: movie.Poster,
            });
            setSaved(nowSaved);
        } finally {
            setSavingInProgress(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container} edges={[]}>
                <CustomLoading />
            </SafeAreaView>
        );
    }

    if (error || !movie) {
        return (
            <SafeAreaView style={styles.container} edges={[]}>
                <View style={styles.centered}>
                    <Text style={styles.errorText}>{error}</Text>
                </View>
            </SafeAreaView>
        );
    }

    const genres = movie.Genre && movie.Genre !== 'N/A' ? movie.Genre.split(', ') : [];

    return (
        <SafeAreaView style={styles.container} edges={[]}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.posterWrapper}>
                    <Image
                        source={{ uri: movie.Poster !== 'N/A' ? movie.Poster : '' }}
                        style={styles.poster}
                    />
                </View>

                <Text style={styles.title}>{movie.Title}</Text>

                <View style={styles.metaRow}>
                    <Text style={styles.metaText}>{movie.Year}</Text>
                    {movie.Rated && movie.Rated !== 'N/A' && (
                        <>
                            <Text style={styles.metaDot}>•</Text>
                            <Text style={styles.metaText}>{movie.Rated}</Text>
                        </>
                    )}
                    {movie.Runtime && movie.Runtime !== 'N/A' && (
                        <>
                            <Text style={styles.metaDot}>•</Text>
                            <Text style={styles.metaText}>{movie.Runtime}</Text>
                        </>
                    )}
                </View>

                {genres.length > 0 && (
                    <View style={styles.genreRow}>
                        {genres.map((genre) => (
                            <View key={genre} style={styles.genreChip}>
                                <Text style={styles.genreText}>{genre}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                    <View style={styles.ratingRow}>
                        <Ionicons name="star" size={s(18)} color={colors.activeColor} />
                        <Text style={styles.ratingText}>{movie.imdbRating}</Text>
                        <Text style={styles.ratingVotes}>/ 10 ({movie.imdbVotes} votes)</Text>
                    </View>
                )}

                {movie.Plot && movie.Plot !== 'N/A' && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Plot</Text>
                        <Text style={styles.sectionText}>{movie.Plot}</Text>
                    </View>
                )}

                {movie.Director && movie.Director !== 'N/A' && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Director</Text>
                        <Text style={styles.sectionText}>{movie.Director}</Text>
                    </View>
                )}

                {movie.Actors && movie.Actors !== 'N/A' && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Actors</Text>
                        <Text style={styles.sectionText}>{movie.Actors}</Text>
                    </View>
                )}

                {movie.Awards && movie.Awards !== 'N/A' && (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Awards</Text>
                        <Text style={styles.sectionText}>{movie.Awards}</Text>
                    </View>
                )}

                <Pressable
                    onPress={onToggleSave}
                    disabled={savingInProgress}
                    style={[styles.saveButton, saved && styles.saveButtonActive]}
                >
                    <Ionicons
                        name={saved ? 'bookmark' : 'bookmark-outline'}
                        size={s(18)}
                        color={saved ? colors.backgroundColor : colors.activeColor}
                    />
                    <Text style={[styles.saveButtonText, saved && styles.saveButtonTextActive]}>
                        {saved ? 'Saved' : 'Save'}
                    </Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    )
}

export default DetailsScreen

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
    errorText: {
        color: colors.textColor,
        fontSize: s(14),
        textAlign: 'center',
    },
    scrollContent: {
        padding: s(16),
        paddingBottom: vs(32),
    },
    posterWrapper: {
        alignItems: 'center',
        marginBottom: vs(16),
    },
    poster: {
        width: '65%',
        aspectRatio: 2 / 3,
        borderRadius: s(12),
        backgroundColor: colors.movieBackgroundColor,
    },
    title: {
        color: colors.textColor,
        fontSize: s(22),
        fontWeight: '700',
        textAlign: 'center',
    },
    metaRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: vs(6),
    },
    metaText: {
        color: colors.inactiveColor,
        fontSize: s(12),
    },
    metaDot: {
        color: colors.inactiveColor,
        marginHorizontal: s(6),
    },
    genreRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: s(8),
        marginTop: vs(12),
    },
    genreChip: {
        borderWidth: 1,
        borderColor: colors.activeColor,
        borderRadius: s(20),
        paddingHorizontal: s(12),
        paddingVertical: vs(4),
    },
    genreText: {
        color: colors.activeColor,
        fontSize: s(11),
        fontWeight: '600',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: vs(16),
        gap: s(6),
    },
    ratingText: {
        color: colors.textColor,
        fontSize: s(16),
        fontWeight: '700',
    },
    ratingVotes: {
        color: colors.inactiveColor,
        fontSize: s(11),
    },
    section: {
        marginTop: vs(18),
    },
    sectionTitle: {
        color: colors.activeColor,
        fontSize: s(13),
        fontWeight: '700',
        marginBottom: vs(6),
        textTransform: 'uppercase',
    },
    sectionText: {
        color: colors.textColor,
        fontSize: s(13),
        lineHeight: s(19),
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s(8),
        marginTop: vs(24),
        borderWidth: s(1),
        borderColor: colors.activeColor,
        borderRadius: s(10),
        paddingVertical: vs(12),
    },
    saveButtonActive: {
        backgroundColor: colors.activeColor,
    },
    saveButtonText: {
        color: colors.activeColor,
        fontSize: s(14),
        fontWeight: '700',
    },
    saveButtonTextActive: {
        color: colors.backgroundColor,
    },
})
