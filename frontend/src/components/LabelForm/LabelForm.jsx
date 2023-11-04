// This component is responsible for the english label data

import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../../index.js';
//import PropTypes from 'prop-types';

const LabelForm = ({ onSave, errorMessage }) => {

    const context  = useContext(UserContext);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
/*
        const entries = [...formData.entries()];
    
        const userData = entries.reduce((acc, entry) => {
          const [k, v] = entry;
          acc[k] = v;
          return acc;
        }, {});
*/

        const englishLabel = {};

        for (let [key, value] of formData.entries()) {
            englishLabel[key] = value;
        }    

        return onSave(englishLabel);
    };
  
    return (
        <div className="mx-auto mt-20 max-w-lg py-10 sm:py-16 lg:py-20">
          <h2 className="text-center text-gray-700 text-lg font-semibold mb-1">IMPORT PRODUCT DETAILS</h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => onSubmit(e)}>

            <>
            <div className="mb-4">

                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="legalName">
                    Legal name:
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-rose-400"
                    name="legalName"
                    id="legalName"
                    type="text"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="nutritions">
                    Nutritions:
                </label>
                <textarea
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-rose-400"
                    name="nutritions"
                    id="nutritions"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="distributor">
                    Distributor:
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-rose-400"
                    name="distributor"
                    id="distributor"
                    type="text"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="storage">
                    Storage information:
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-rose-400"
                    name="storage"
                    id="storage"
                    type="text"
                    disabled={false}
                />

            </div>
            </>
            <div className="relative">
        <button
            className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            type="submit"
            >TRANSLATE
        </button>
        {errorMessage && (
          <p className="text-red-500 text-xs italic">{errorMessage}</p>
        )}
        </div>
          </form>

      </div>

    );
    

  }

  /*
  ProfileData.propTypes = {
    isEdit: PropTypes.bool,
    onEdit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};
*/
  
  export default LabelForm;