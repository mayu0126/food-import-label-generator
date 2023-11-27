import React, { useState } from 'react';
import ReactPaginate from 'react-js-pagination';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import NewWordModal from '../NewWordModal';
import './glossaryStyles.css';

const GlossaryTable = ({ glossaryData, onDelete, onAdd }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [wordToDelete, setWordToDelete] = useState(null);
  const [showNewWordModal, setShowNewWordModal] = useState(false);
  const [filteredGlossaryData, setFilteredGlossaryData] = useState([]);

  const handleSearch = (value) => {
    const lowercaseValue = value.toLowerCase();

    const filteredData = glossaryData.filter((wordObject) => {
      return (
        wordObject.english.toLowerCase().includes(lowercaseValue) ||
        wordObject.hungarian.toLowerCase().includes(lowercaseValue)
      );
    });

    setFilteredGlossaryData(filteredData);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const searchTerm = formData.get('searchWord');
    handleSearch(searchTerm);
  };

  const handleDeleteClick = (id) => {
    setWordToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmation = () => {
    onDelete(wordToDelete);
    setShowDeleteModal(false);
  };

  const handleAddNewWordClick = () => {
    setShowNewWordModal(true);
  };

  const handleAddNewWordConfirmation = (newWordToAdd) => {
    console.log(newWordToAdd)
    onAdd(newWordToAdd);
    setShowNewWordModal(false);
  };

  //pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredGlossaryData.length > 0 ? filteredGlossaryData.slice(indexOfFirstItem, indexOfLastItem) : glossaryData.slice(indexOfFirstItem, indexOfLastItem);


  return (
    <>
    <div className="flex flex-col">
    <h2 className="text-center text-gray-700 xl:text-lg text-auto font-semibold mx-auto mt-20 w-full py-10 xs:py-10 sm:py-16 lg:py-20">GLOSSARY OF WORDS AND PHRASES ACCEPTED BY FOOD LAW</h2>

    <div className='flex'>
      <div className="w-1/4 h-44 text-center justify-center ml-28">
        <div className='bg-slate-200 p-4 rounded-lg'>
          <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="searchWord">
              Search word or expression
          </label>
          <form className='flex' onSubmit={(e) => onSubmit(e)}>
            <input
                className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="searchWord"
                id="searchWord"
                type="text"
                disabled={false}
            />
            <button type='submit' className='flex items-center justify-center pb-2'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} className="w-7 h-7 stroke-slate-500 hover:stroke-slate-400 ml-2 transition duration-300 ease-in-out">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            </button>
          </form>
        </div>

        <button
          className="mt-12 bg-rose-600 hover:bg-rose-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
          onClick={handleAddNewWordClick}>
          Add new word or expression
        </button>
      </div>

      <div className="flex flex-col mx-auto w-1/2 sm:w-1/2 mb-36">

        <table className="bg-white shadow-md rounded w-full flex-1">
          <thead className="border-b-2 border-slate-300 xl:text-base text-xs text-left ">
            <tr>
              <th className="px-6 py-3 w-2/5">English</th>
              <th className="px-6 py-3 w-2/5">Hungarian</th>
              <th className="px-6 py-3 w-1/5"></th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((word, index) => (
              <tr key={index} className="text-xs xl:text-base  hover:bg-slate-100 transition duration-100 ease-in-out border-b border-slate-200">
                <td className="px-2 md:px-6 sm:table-cell w-2/5">{word.english}</td>
                <td className="px-2 md:px-6 sm:table-cell w-2/5">{word.hungarian}</td>
                <td className="px-2 md:px-6 sm:table-cell w-1/5 text-center">
                  <button
                    className="font-bold text-xl w-8 h-8 pb-1 rounded ml-5 text-rose-500  hover:text-rose-600 transition duration-300 ease-in-out"
                    type="button" onClick={() => handleDeleteClick(word.id)}>
                    ✘
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-center mt-4 bg-slate-200 p-1 rounded-lg">
          <ReactPaginate
            nextPageText={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 hover:text-rose-400 transition duration-300 ease-in-out">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            }

            prevPageText={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 hover:text-rose-400 transition duration-300 ease-in-out">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            }

            firstPageText={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 hover:text-rose-400 transition duration-300 ease-in-out">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
              </svg>
            } 

            lastPageText={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 hover:text-rose-400 transition duration-300 ease-in-out">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
              </svg>
            }

            activePage={currentPage}
            itemsCountPerPage={itemsPerPage}
            totalItemsCount={filteredGlossaryData.length > 0 ? filteredGlossaryData.length : glossaryData.length}
            pageRangeDisplayed={5}
            onChange={handlePageChange}
            itemClass="page-item hover:text-rose-400 transition duration-100 ease-in-out"
            linkClass="page-link hover:text-rose-400 transition duration-300 ease-in-out"
          />
        </div>
      </div>
      </div>
    </div>


      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        onConfirmDelete={handleDeleteConfirmation}
        isGlossary={true}
      />

      {showDeleteModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
          aria-hidden="true" //aria-hidden attribute makes the background content inactive
        />
      )}

      <NewWordModal
        isOpen={showNewWordModal}
        onRequestClose={() => setShowNewWordModal(false)}
        addNewRecord={(newWordToAdd) => handleAddNewWordConfirmation(newWordToAdd)}
      />

      {showNewWordModal && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
          aria-hidden="true" //aria-hidden attribute makes the background content inactive
        />
      )}

    </>
  );
}

export default GlossaryTable;