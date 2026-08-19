// API: https://www.omdbapi.com/?apikey=9b1460f6&s=Batman`

const API_BASE = "https://www.omdbapi.com/";
const API_KEY = "9b1460f6";

export type OmdbSearchItem = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
};

async function searchMovies(query: string) {
  try {
    const url = `${API_BASE}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();
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

export default searchMovies;
