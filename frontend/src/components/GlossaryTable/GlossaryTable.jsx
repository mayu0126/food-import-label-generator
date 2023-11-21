import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const GlossaryTable = ({ glossaryData, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [wordToDelete, setWordToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setWordToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmation = () => {
    onDelete(wordToDelete);
    setShowDeleteModal(false);
  };

  return (
    <>
    <div className="mx-auto mt-20 w-1/2 py-10 sm:py-16 lg:py-20">
    <h2 className="text-center text-gray-700 xl:text-lg text-auto font-semibold mb-12">GLOSSARY OF WORDS AND PHRASES ACCEPTED BY FOOD LAW</h2>
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
            <tr key={index} className="xl:text-base text-xs hover:bg-slate-100 border-b border-slate-200">
              <td className="px-6 hidden sm:table-cell">{word.english}</td>
              <td className="px-6 hidden lg:table-cell">{word.hungarian}</td>
              <td className="px-6 flex items-center">
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
      <div className="flex mt-6 justify-center">
        <Link
          className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          to="/addnewword">
          Add new word or expression
        </Link>
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
    </div>
    </>
  );
}

/*
GlossaryTable.propTypes = {
  glossaryData: PropTypes.arrayOf(PropTypes.shape({
    english: PropTypes.string,
    hungarian: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
};
*/

export default GlossaryTable;