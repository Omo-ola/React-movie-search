const imgPATH = "https://image.tmdb.org/t/p/w1280";

function MovieList({ data }) {
  if (data.backdrop_path === null) return;
  return (
    <article className="grid grid-cols-2 bg-[#eee] my-2 h-auto min-h-[17rem] gap-2 overflow-hidden">
      <img
        src={`${imgPATH}/${data.backdrop_path}`}
        className="h-[100%] w-[100%] object-cover p-1"
        alt="Movie Image"
      />
      <div className="">
        <h1 className="text-center text-lg font-medium border-b-2 pb-2 mx-2">
          {data.title}
        </h1>
        <div className="my-2 text-xl font-semibold">
          Rating :{" "}
          <span className="p-[0.1rem] rounded-sm bg-orange-600">
            {data.vote_average}
          </span>
        </div>
        <article className="overview text-lg font-medium">
          {data.overview}
        </article>
      </div>
    </article>
  );
}

export default MovieList;
