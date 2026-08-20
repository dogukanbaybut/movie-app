import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../theme/colors";
import { s, vs } from "react-native-size-matters";
import { useEffect, useState } from "react";
import { OmdbSearchItem, searchMovies } from "../api/omdb";
import MovieCard from "../components/MovieCard";

// Ana ekran: arama kutusu + sonuçların listelendiği (sayfalanmış) grid
const HomeScreen = () => {
    const [query, setQuery] = useState("Batman"); // arama kutusundaki yazı
    const [movies, setMovies] = useState<OmdbSearchItem[]>([]); // ekranda gösterilecek filmler

    const [loader, setLoader] = useState(false); // ilk aramada tam ekran loading göster
    const [error, setError] = useState(""); // sonuç yoksa / hata varsa mesaj

    // Sonsuz kaydırma (infinite scroll) için sayfalama state'leri
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true); // daha fazla sayfa var mı
    const [loadingMore, setLoadingMore] = useState(false); // liste altında küçük loading

    // isNewSearch=true ise yeni arama (listeyi sıfırla), false ise mevcut listeye ekle (sayfalama)
    const fetchMovies = async (pageNum: number, isNewSearch = false) => {
        if (!query) {
            setMovies([]);
            setHasMore(false);
            return;
        }

        if (isNewSearch) setLoader(true);

        setError("");

        try {
            const res = await searchMovies(query, pageNum);
            if (res.Response === "True") {
                const incomingMovies = res.Search || [];

                // OMDb her sayfada 10 sonuç döner; 10'dan azsa son sayfadayız demektir
                setHasMore(incomingMovies.length === 10);

                setMovies((prev) => {
                    if (pageNum === 1) return incomingMovies; // yeni arama: listeyi değiştir
                    return [...prev, ...incomingMovies]; // sayfalama: listenin sonuna ekle
                });
            } else {
                if (pageNum === 1) {
                    setMovies([]);
                    setError(res.Error || "No movies found");
                }
                setHasMore(false);
            }
        } catch {
            if (pageNum === 1) {
                setMovies([]);
                setError("Something went wrong");
            }
        } finally {
            if (isNewSearch) setLoader(false);
        }
    };

    // Arama butonuna basılınca / klavyeden "search" e basılınca çalışır
    const onSubmit = () => {
        setPage(1);
        setMovies([]);
        setHasMore(true);
        fetchMovies(1, true);
    };

    // FlatList sona yaklaşınca (onEndReached) tetiklenir, bir sonraki sayfayı çeker
    const loadMore = async () => {
        if (!hasMore || loader || loadingMore) return; // zaten yükleniyorsa veya son sayfadaysa çık

        setLoadingMore(true);
        const nextPage = page + 1;

        try {
            await fetchMovies(nextPage, false);
            setPage(nextPage);
        } finally {
            setLoadingMore(false);
        }
    };

    // useEffect + [] (boş bağımlılık dizisi) = component ilk açıldığında bir kere çalışır
    useEffect(() => {
        onSubmit();
    }, []);

    return (
        <SafeAreaView style={styles.container} edges={[]}>
            <View style={styles.searchContainer}>
                <TextInput
                    value={query}
                    onChangeText={setQuery}
                    style={styles.searchInput}
                    placeholder="Search (e.g., batman)"
                    placeholderTextColor={colors.inactiveColor}
                    returnKeyType="search"
                    onSubmitEditing={onSubmit}
                />
                <Pressable onPress={onSubmit} style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Search</Text>
                </Pressable>
            </View>

            {/* Üç durumdan sadece biri gösterilir: yükleniyor / hata / sonuç listesi */}
            {loader ? (
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ActivityIndicator size={"large"} />
                    <Text
                        style={{
                            color: colors.textColor,
                            marginTop: vs(4),
                            textAlign: "center",
                        }}
                    >
                        Loading
                    </Text>
                </View>
            ) : error ? (
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Text style={{ color: colors.textColor, fontSize: s(14) }}>
                        {error}
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={movies}
                    renderItem={({ item }) => <MovieCard movie={item} />}
                    keyExtractor={(item, index) => `${item.imdbID}-${index}`}
                    numColumns={2} // 2 sütunlu grid görünümü
                    onEndReached={loadMore} // listenin sonuna gelinince loadMore çalışır
                    onEndReachedThreshold={0.3} // sona %30 kala tetikle
                    ListFooterComponent={
                        loadingMore ? (
                            <ActivityIndicator color={colors.activeColor} />
                        ) : hasMore ? (
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: colors.textColor,
                                    marginTop: vs(6),
                                    marginBottom: vs(15),
                                }}
                            >
                                Keep scrolling for more
                            </Text>
                        ) : movies.length > 0 ? (
                            <Text
                                style={{
                                    textAlign: "center",
                                    color: colors.textColor,
                                    marginTop: vs(6),
                                    marginBottom: vs(15),
                                }}
                            >
                                You've seen all movies
                            </Text>
                        ) : null
                    }
                />
            )}
        </SafeAreaView>
    );
};

export default HomeScreen;

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