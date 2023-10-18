
import { useMovies } from "./context/MovieContext";
import Spinner from "./Spinner";
import MovieList from "./MovieList";

function Movies() {
    const { isLoading, content, query, setQuery } = useMovies();


  return (
    <section className="md:flex">
      <aside className="bg-stone-800 px-5 py-2 sticky inset-0 md:w-[25%]">
        <div className="sticky inset-0">
          <h1 className="text-2xl text-white font-bold text-center">
            The Movie App
          </h1>
          <input
            type="text"
            value={query}
            className="p-2 border-0 border-b-2 w-[100%] m-auto outline-0 bg-transparent border-gray-500 text-white text-lg"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </aside>
      <main className="bg-gray-600 md:w-[75%]">
        {content.length < 1 ? (
          <div className="w-[70%] m-auto">
            <h1 className="text-xl text-white font-medium py-4">
              Movies not found... Search for another movie
            </h1>
          </div>
        ) : (
          <div className="w-[70%] m-auto md:w-[95%]">
            <h2 className="text-xl text-white font-medium py-4">
              List Of movies
            </h2>
            {isLoading ? (
              <Spinner />
            ) : (
              <section className="md:grid grid-cols-2 gap-4">
                {content.map((data) => (
                  <MovieList key={data.id} data={data} />
                ))}
              </section>
            )}
          </div>
        )}
      </main>
    </section>
  );
}

export default Movies;
