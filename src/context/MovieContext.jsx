import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const MovieContext = createContext();

const apiURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const searchAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function extractWords(inputString,numChar) {
  const wordsArray = inputString.split(/\s+/).slice(0, numChar);
  return wordsArray.join(" ");
}

const states = {
  isLoading: false,
  content: [],
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "movies/loaded":
      return { ...state, content: action.payload, isLoading: false };
    case "error":
      return {
        ...state,
        error: action.payload,
      };
    default:
      throw new Error("Unknown Action");
  }
}

function MoviesProvider({ children }) {
  const [query, setQuery] = useState("");
  const [{ isLoading, content }, dispatch] = useReducer(reducer, states);

  useEffect(function () {
    const getMovies = async (url) => {
      dispatch({ type: "loading" });
      const response = await fetch(url);
      if (response.status === 200) {
        const { results } = await response.json();
        dispatch({ type: "movies/loaded", payload: results, isLoading: false });
      } else {
        dispatch({ type: "error", payload: response.statusText });
      }
    };
    getMovies(apiURL);
  }, []);

  useEffect(
    function () {
      async function search(url) {
        const res = await fetch(`${url}${query}`);
        const { results } = await res.json();
        const result = results.filter((item) => item.backdrop_path !== null);

        if (results.length > 0) {
          console.log(result);
          dispatch({ type: "movies/loaded", payload: result });
        }
      }
      search(searchAPI);
    },
    [query]
  );

  return (
    <MovieContext.Provider value={{ isLoading, content, query, setQuery,extractWords }}>
      {children}
    </MovieContext.Provider>
  );
}
function useMovies() {
  const context = useContext(MovieContext);
  if (context === undefined)
    throw new Error("Books context was used outside the provider");
  return context;
}

export { MoviesProvider, useMovies };
