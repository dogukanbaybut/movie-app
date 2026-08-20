import AsyncStorage from '@react-native-async-storage/async-storage';
import { OmdbSearchItem } from '../api/omdb';

// AsyncStorage, telefonun kalıcı deposuna key-value (anahtar-değer) olarak veri yazar.
// Sadece string saklayabildiği için objeleri JSON.stringify/parse ile çevirmemiz gerekiyor.
const SAVED_MOVIES_KEY = 'saved_movies';

// Kayıtlı tüm filmleri diskten okuyup dizi (array) olarak döner
export async function getSavedMovies(): Promise<OmdbSearchItem[]> {
    try {
        const raw = await AsyncStorage.getItem(SAVED_MOVIES_KEY);
        return raw ? JSON.parse(raw) : []; // hiç kayıt yoksa boş dizi dön
    } catch (error) {
        console.log('❌ Failed to read saved movies ❌', error);
        return [];
    }
}

// Verilen imdbID daha önce kaydedilmiş mi diye kontrol eder
export async function isMovieSaved(imdbID: string): Promise<boolean> {
    const movies = await getSavedMovies();
    return movies.some((movie) => movie.imdbID === imdbID);
}

// Filmi kayıtlılara ekler (aynı film ikinci kez eklenmesin diye önce kontrol eder)
export async function saveMovie(movie: OmdbSearchItem): Promise<OmdbSearchItem[]> {
    const movies = await getSavedMovies();

    if (movies.some((m) => m.imdbID === movie.imdbID)) {
        return movies;
    }

    const updated = [...movies, movie];
    await AsyncStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(updated));
    return updated;
}

// Filmi kayıtlılardan çıkarır
export async function removeMovie(imdbID: string): Promise<OmdbSearchItem[]> {
    const movies = await getSavedMovies();
    const updated = movies.filter((movie) => movie.imdbID !== imdbID);
    await AsyncStorage.setItem(SAVED_MOVIES_KEY, JSON.stringify(updated));
    return updated;
}

// Kayıtlıysa çıkarır, kayıtlı değilse ekler (Save butonunun tek fonksiyonla çalışması için)
export async function toggleSavedMovie(movie: OmdbSearchItem): Promise<{ saved: boolean; movies: OmdbSearchItem[] }> {
    const alreadySaved = await isMovieSaved(movie.imdbID);

    if (alreadySaved) {
        const movies = await removeMovie(movie.imdbID);
        return { saved: false, movies };
    }

    const movies = await saveMovie(movie);
    return { saved: true, movies };
}
