import React from 'react';
import { Link } from 'react-router-dom'; // Importáld be a Link komponenst
import PropTypes from 'prop-types';

const LabelTable = ({ labelData, onDelete }) => {
  return (
    <div className="mx-auto mt-20 max-w-screen-xl py-10 sm:py-16 lg:py-20">
      <table className="bg-white shadow-md rounded w-full">
        <thead className="border-b-2 border-slate-300">
          <tr>
            <th className="text-left px-6 py-3">Date</th>
            <th className="text-left px-6 py-3">ProductName</th>
            <th className="text-left px-6 py-3">LegalName</th>
            <th className="text-left px-6 py-3">Producer</th>
            <th className="text-left px-6 py-3">Distributor</th>
            <th className="text-left px-6 py-3">EAN</th>
            <th className="text-left px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          {labelData && labelData.map((item, index) => (
            <tr key={index} className="hover:bg-slate-200 border-b border-slate-200">
              <td className="px-6 py-4">{item.date.substring(0, 10)}</td>
              <td className="px-6 py-4 font-bold text-rose-600">{item.productName}</td>
              <td className="px-6 py-4">{item.legalName}</td>
              <td className="px-6 py-4">{item.producer}</td>
              <td className="px-6 py-4">{item.distributor}</td>
              <td className="px-6 py-4">{item.ean}</td>
              <td className="px-6 py-4 flex items-center">
                <Link
                  className="bg-slate-500 hover:bg-slate-400 text-white font-semibold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                  to={`/details/${item.id}`}>
                  Details
                </Link>
                <button
                  className="flex items-center justify-center font-bold text-xl w-8 h-8 pb-1 rounded ml-5 text-rose-500  hover:text-rose-600"
                  type="button" onClick={() => onDelete(item.id)}>
                  x
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
    </div>
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