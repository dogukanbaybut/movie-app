// API : http://www.omdbapi.com/?apikey=[7b1350a9]&s=Batman

const API_BASE_URL = "http://www.omdbapi.com/";
const API_KEY = "7b1350a9";
 
async function searchMovies(searchQuery: string) {
    try {
    const url = `${API_BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(searchQuery)}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    }
    catch (error) {
        console.error("Error searching movies:", error);
    } 
} 

export default searchMovies;