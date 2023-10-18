
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
          <div className="relative text-gray-500">
            <input
              type="text"
              value={query}
              className="p-2 pl-8 border-0 border-b-2 w-[100%] m-auto outline-0 bg-transparent border-gray-500 text-white text-lg"
              placeholder="Search for movie here"
              onChange={(e) => setQuery(e.target.value)}
            />
            <svg
              className="absolute inset-0 top-2 h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              fill="rgb(107 114 128)"
              viewBox="0 0 512 512"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          </div>
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
