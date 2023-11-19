import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import DeleteConfirmationModal from '../DeleteConfirmationModal';

const LabelTable = ({ labelData, onDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [labelToDelete, setLabelToDelete] = useState(null);

  const handleDeleteClick = (id) => {
    setLabelToDelete(id);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirmation = () => {
    onDelete(labelToDelete);
    setShowDeleteModal(false);
  };

  return (
    <>
    <div className="mx-auto mt-20 max-w-screen-2xl py-10 sm:py-16 lg:py-20">
    <h2 className="text-center text-gray-700 xl:text-lg text-auto font-semibold mb-12">MY LABELS</h2>
      <table className="bg-white shadow-md rounded w-full">
        <thead className="border-b-2 border-slate-300 xl:text-base text-xs text-left ">
          <tr>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Product name</th>
            <th className="px-6 py-3 hidden sm:table-cell">Legal name</th>
            <th className="px-6 py-3 hidden lg:table-cell">Producer</th>
            <th className="px-6 py-3 hidden md:table-cell">Distributor</th>
            <th className="px-6 py-3 hidden sm:table-cell">EAN code</th>
            <th className="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {labelData && labelData.map((item, index) => (
            <tr key={index} className="xl:text-base text-xs hover:bg-slate-100 border-b border-slate-200">
              <td className="px-6 py-4">{item.date.substring(0, 10)}</td>

              <td className="px-6 py-4 font-bold text-rose-600">
                <Link to={`/details/${item.id}`}>{item.productName}</Link>
              </td>

              <td className="px-6 py-4 hidden sm:table-cell">{item.legalName}</td>
              <td className="px-6 py-4 hidden lg:table-cell">{item.producer}</td>
              <td className="px-6 py-4 hidden md:table-cell">{item.distributor}</td>
              <td className="px-6 py-4 hidden sm:table-cell">{item.ean}</td>
              <td className="px-6 py-4 flex items-center">
                <Link
                  className="bg-slate-500 hover:bg-slate-400 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  to={`/details/${item.id}`}>
                  Details
                </Link>
                <button
                  className="flex items-center justify-center font-bold text-xl w-8 h-8 pb-1 rounded ml-5 text-rose-500  hover:text-rose-600"
                  type="button" onClick={() => handleDeleteClick(item.id)}>
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
          to="/addnewlabel">
          Add new label
        </Link>
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onRequestClose={() => setShowDeleteModal(false)}
        onConfirmDelete={handleDeleteConfirmation}
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

LabelTable.propTypes = {
  labelData: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string,
    productName: PropTypes.string,
    legalName: PropTypes.string,
    producer: PropTypes.string,
    distributor: PropTypes.string,
    ean: PropTypes.string,
    id: PropTypes.number,
  })).isRequired,
};

export default LabelTable;