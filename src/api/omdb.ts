// API: https://www.omdbapi.com/?apikey=9b1460f6&s=Batman`
// Bu dosya, OMDb film API'sine yapılan tüm ağ isteklerini (fetch) tek yerde topluyor.
// Ekranlar API'yi doğrudan çağırmak yerine buradaki fonksiyonları kullanıyor.

const API_BASE = "https://www.omdbapi.com/";
const API_KEY = "9b1460f6";

// Arama sonucunda (?s=...) API'nin döndürdüğü her bir film objesinin şekli
export type OmdbSearchItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

export type OmdbRating = {
  Source: string;
  Value: string;
};

// Tek bir filmin detay bilgisi (?i=...) için dönen objenin şekli
export type OmdbDetails = {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: OmdbRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  Response: string;
  Error?: string;
};

// İsme göre film arar. page parametresi ile sayfalama (her sayfada 10 sonuç) yapılır.
export async function searchMovies(query: string, page: number = 1,) {
  try {
    const url = `${API_BASE}?apikey=${API_KEY}&s=${encodeURIComponent(query) }&page=${page}`;
    const response = await fetch(url); // ağ isteği at
    const data = await response.json(); // gelen JSON'u JS objesine çevir
    console.log(data);
    return data;
  } catch (error) {
    console.log("❌ Failed to fetch movie ❌");
    if (error instanceof Error) {
      console.log("Failed detail: ", error.message);
    } else {
      console.log("Unknown error: ", error);
    }
  }
}


// imdbID'ye göre tek bir filmin tüm detaylarını getirir (plot=full -> özetin tamamı)
export async function getMovieDetails(imdbID: string): Promise<OmdbDetails | undefined> {
  try {
    const url = `${API_BASE}?apikey=${API_KEY}&i=${encodeURIComponent(imdbID) }&plot=full`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("❌ Failed to fetch movie details ❌");
    if (error instanceof Error) {
      console.log("Failed detail: ", error.message);
    } else {
      console.log("Unknown error: ", error);
    }
  }
}


