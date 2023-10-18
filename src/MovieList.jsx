import { useMovies } from "./context/MovieContext";

const imgPATH = "https://image.tmdb.org/t/p/w1280";

function MovieList({ data }) {
  const { extractWords } = useMovies();

  if (data.backdrop_path === null) return;


  const desc = extractWords(data.overview,30);
  console.log(desc);
  return (
    <article className="grid grid-cols-2 bg-[#eee] my-2 h-auto min-h-[17rem] gap-2 overflow-hidden cursor-pointer">
      <img
        src={`${imgPATH}/${data.backdrop_path}`}
        className="h-[100%] w-[100%] object-cover p-1"
        alt="Movie Image"
      />
      <div className="">
        <h1 className="text-center text-lg font-medium border-b-2 pb-2 mx-2">
          {data.title}
        </h1>
        <div className="my-2 text-lg font-semibold">
          Rating :{" "}
          <span className="px-2 text-sm rounded-sm bg-orange-600">
            {data.vote_average}
          </span>
        </div>
        <article className="overview text-base font-medium">
          {desc}
        </article>
      </div>
    </article>
  );
}

export default MovieList;
