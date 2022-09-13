import React, { Dispatch, FC, SetStateAction, useState } from "react";
import ImgsViewer from "react-images-viewer";
import ReactPaginate from "react-paginate";
import { DEFAULT_JOKES } from "../constants";
import { Result } from "../interfaces";
import NoData from "./NoData";

type JokesTypes = {
  query: string;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  results: Result[];
  total_jokes: number;
  total_pages: number;
};

const Jokes: FC<JokesTypes> = ({
  query,
  currentPage,
  setCurrentPage,
  results,
  total_jokes,
  total_pages,
}) => {
  console.log("🚀 ~ file: Jokes.tsx ~ line 25 ~ currentPage", currentPage);
  const [isOpenImgViewer, setIsOpenImgViewer] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const imagesSource = results.map((jokes, index) => {
    return {
      src: `https://icanhazdadjoke.com/j/${jokes.id}.png`,
      caption: `Dad Joke #${index + 1}`,
    };
  });

  const handlePageClick = ({ selected: selectedPage = 0 }) => {
    setCurrentPage(selectedPage);
  };

  return (
    <div className="flex flex-col mt-8" data-testid="joke-main">
      {results.length > 0 ? (
        <div className="py-2 -my-2" data-testid="table-main">
          <ImgsViewer
            imgs={imagesSource}
            isOpen={isOpenImgViewer}
            currImg={currentImageIndex}
            onClickPrev={() => setCurrentImageIndex((prev) => prev - 1)}
            onClickNext={() => setCurrentImageIndex((prev) => prev + 1)}
            onClose={() => setIsOpenImgViewer(false)}
          />
          <div className="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    ID
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Joke
                  </th>
                  <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                    Thumbnail
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {results.map((jokes, index) => (
                  <tr
                    key={jokes.id}
                    className="odd:bg-white even:bg-slate-50"
                    data-testid="joke-row"
                  >
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div
                        className="text-sm font-medium leading-5 text-gray-900 cursor-pointer hover:text-blue-600"
                        onClick={() => {
                          setCurrentImageIndex(index);
                          setIsOpenImgViewer(true);
                        }}
                      >
                        {jokes.id}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-500">
                        {jokes.joke}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center justify-center">
                        <img
                          className="w-10 h-10 rounded-full cursor-pointer"
                          src={
                            "https://icanhazdadjoke.com/static/apple-touch-icon.png"
                          }
                          alt="joke item"
                          onClick={() => {
                            setCurrentImageIndex(index);
                            setIsOpenImgViewer(true);
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {query && total_jokes > DEFAULT_JOKES ? (
            <div data-testid="pagination-main">
              <ReactPaginate
                previousLabel={"<<"}
                nextLabel={">>"}
                forcePage={currentPage}
                pageCount={total_pages}
                onPageChange={handlePageClick}
                containerClassName={"flex justify-end space-x-1 m-3"}
                pageClassName={
                  "px-3 py-2 border border-gray-300 rounded hover:bg-gray-100"
                }
                activeClassName={
                  "px-3 py-2 border border-blue-500 rounded bg-blue-500 text-white hover:bg-blue-500"
                }
                previousClassName={
                  "px-3 py-2 border border-gray-300 rounded hover:bg-gray-100"
                }
                nextClassName={
                  "px-3 py-2 border border-gray-300 rounded hover:bg-gray-100"
                }
              />
            </div>
          ) : null}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default Jokes;
