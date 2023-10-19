
import { useMovies } from "./context/MovieContext";
import Spinner from "./Spinner";
import MovieList from "./MovieList";

const imgPATH = "https://image.tmdb.org/t/p/w1280";



function Movies() {
  const {
    isLoading,
    content,
    query,
    setQuery,
    dispatch,
    isOpen,
    currentMovie,
  } = useMovies();
  
  function handleClose() {
    dispatch({ type: "movie/close" });
  }

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
      <main className="relative bg-gray-600 md:w-[75%]">
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
        {isOpen && (
          <div className="w-[100%] h-[100%] bg-slate-500 fixed inset-0 overflow-auto">
            <svg
              className="absolute top-10 right-10 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              onClick={handleClose}
              height="3rem"
              viewBox="0 0 384 512"
            >
              <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
            </svg>

            <section>
              <img
                src={`${imgPATH}/${currentMovie.backdrop_path}`}
                alt="image backdrop"
                className="w-[100%] h-[20rem] object-contain my-4"
              />
              <p className="text-lg text-center">
                Age Limits :
                <span
                  className={`${
                    currentMovie.adult ? "bg-red-600" : "bg-green-600"
                  } py-2 px-3 ml-2 text-sm text-stone-100`}
                >
                  {currentMovie.adult ? "Adults" : "No Age limits"}
                </span>
              </p>
              <p className="text-center my-4 px-4">
                Full Description :
                <span className="text-lg"> {currentMovie.overview}</span>
              </p>
              <p className="text-center text-xl my-4">
                Released Date :
                <span className="text-lg"> {currentMovie.release_date}</span>
              </p>

              <div className="text-center flex justify-center gap-4 text-stone-100 mb-4">
                <button className="py-2 px-4 bg-red-500 rounded-sm cursor-pointer">
                  Add to watch List
                </button>
              </div>
            </section>
          </div>
        )}
      </main>
    </section>
  );
}

export default Movies;
