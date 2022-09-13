import { FC, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { DadJokes } from "../interfaces";
import Jokes from "../components/Jokes";
import { API_URL, INIT, OPTIONS } from "../constants";
import { debounce } from "ts-debounce";
import Loader from "../components/Loader";

export async function getServerSideProps() {
  const resp = await fetch(API_URL, OPTIONS);

  return {
    props: {
      results: await resp.json(),
    },
  };
}

type IndexType = {
  results: DadJokes;
};

const Index: FC<IndexType> = ({ results }) => {
  const [jokes, setJokes] = useState<DadJokes>(results);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const requestURL = query
    ? `${API_URL}?term=${query}&page=${currentPage}`
    : API_URL;

  useEffect(() => {
    const fetchPhotos = async () => {
      setIsLoading(true);
      const res = await fetch(requestURL, OPTIONS);
      const dadJokes: DadJokes = await res.json();
      setJokes(dadJokes);
      setIsLoading(false);
    };

    const debouncedFetchPhotos = debounce(fetchPhotos, 1500);
    debouncedFetchPhotos();
  }, [query, currentPage]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 overflow-x-auto bg-slate-100 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <SearchBar query={query} setQuery={setQuery} />
          <Jokes
            query={query}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            results={jokes.results}
            total_jokes={jokes.total_jokes}
            total_pages={jokes.total_pages}
          />
        </>
      )}
    </div>
  );
};

export default Index;
