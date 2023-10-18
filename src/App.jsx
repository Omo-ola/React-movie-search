
import Movies from "./Movies";
import { MoviesProvider } from "./context/MovieContext";

function App() {
  return (
    <MoviesProvider>
      <Movies/>
    </MoviesProvider>
  );
}

export default App