import AsyncStorage from '@react-native-async-storage/async-storage';
import { OmdbSearchItem } from '../api/omdb';

const SAVED_MOVIES_KEY = 'saved_movies';

export async function getSavedMovies(): Promise<OmdbSearchItem[]> {
    try {
        const raw = await AsyncStorage.getItem(SAVED_MOVIES_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (error) {
        console.log('❌ Failed to read saved movies ❌', error);
        return [];
    }
}

export async function isMovieSaved(imdbID: string): Promise<boolean> {
    const movies = await getSavedMovies();
    return movies.some((movie) => movie.imdbID === imdbID);
}

export async function saveMovie(movie: OmdbSearchItem): Promise<OmdbSearchItem[]> {
    const movies = await getSavedMovies();

    if (movies.some((m) => m.imdbID === movie.imdbID)) {
        return movies;
    }

    const updated = [...movies, movie];
    await AsyncStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(updated));
    return updated;
}

export async function removeMovie(imdbID: string): Promise<OmdbSearchItem[]> {
    const movies = await getSavedMovies();
    const updated = movies.filter((movie) => movie.imdbID !== imdbID);
    await AsyncStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(updated));
    return updated;
}

export async function toggleSavedMovie(movie: OmdbSearchItem): Promise<{ saved: boolean; movies: OmdbSearchItem[] }> {
    const alreadySaved = await isMovieSaved(movie.imdbID);

    if (alreadySaved) {
        const movies = await removeMovie(movie.imdbID);
        return { saved: false, movies };
    }

    const movies = await saveMovie(movie);
    return { saved: true, movies };
}
