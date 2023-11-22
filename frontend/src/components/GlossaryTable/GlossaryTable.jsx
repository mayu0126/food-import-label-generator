import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteConfirmationModal from '../DeleteConfirmationModal';
import NewWordModal from '../NewWordModal';

const GlossaryTable = ({ glossaryData, onDelete, onAdd }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [wordToDelete, setWordToDelete] = useState(null);

  const [showNewWordModal, setShowNewWordModal] = useState(false);

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

  return (
    <>
    <div className="flex flex-col">
    <h2 className="text-center text-gray-700 xl:text-lg text-auto font-semibold mx-auto mt-20 w-full py-10 xs:py-10 sm:py-16 lg:py-20">GLOSSARY OF WORDS AND PHRASES ACCEPTED BY FOOD LAW</h2>

    <div className='flex'>
      <div className="w-1/4 h-44 p-4 text-center justify-center bg-slate-200 rounded-lg ml-28">
        <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="searchWord">
            Search word or expression
        </label>
        <div className='flex'>
          <input
              className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="searchWord"
              id="searchWord"
              type="text"
              disabled={false}
          />
          <button className='flex items-center justify-center pb-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} className="w-7 h-7 stroke-slate-500 hover:stroke-slate-400 ml-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div>

        <button
          className="mt-6 bg-rose-600 hover:bg-rose-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          onClick={handleAddNewWordClick}>
          Add new word or expression
        </button>
      </div>

      <div className="bg-rose-200 mx-auto w-1/2 sm:w-1/2 mb-36">

        <table className="bg-white shadow-md rounded w-full">
          <thead className="border-b-2 border-slate-300 xl:text-base text-xs text-left ">
            <tr>
              <th className="px-6 py-3">English</th>
              <th className="px-6 py-3">Hungarian</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {glossaryData && glossaryData.map((word, index) => (
              <tr key={index} className="text-xs xl:text-base  hover:bg-slate-100 border-b border-slate-200">
                <td className="px-2 md:px-4 sm:table-cell">{word.english}</td>
                <td className="px-2 md:px-4 sm:table-cell">{word.hungarian}</td>
                <td className="px-2 md:px-4 sm:table-cell flex items-center">
                  <button
                    className="flex items-center justify-center font-bold text-xl w-8 h-8 pb-1 rounded ml-5 text-rose-500  hover:text-rose-600"
                    type="button" onClick={() => handleDeleteClick(word.id)}>
                    ✘
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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