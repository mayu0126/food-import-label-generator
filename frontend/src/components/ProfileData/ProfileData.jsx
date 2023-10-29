import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../../index.js';
import PropTypes from 'prop-types';

const ProfileData = ({ isEdit, onEdit, onCancel, onSave, errorMessage, disabled, currentUser }) => {

    const context  = useContext(UserContext);

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const entries = [...formData.entries()];
    
        const userData = entries.reduce((acc, entry) => {
          const [k, v] = entry;
          acc[k] = v;
          return acc;
        }, {});
    
        return onSave(userData);
    };
  
    return (
        <div className="mx-auto mt-20 max-w-xs py-10 sm:py-16 lg:py-20">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
          {isEdit && (
            <>
            <div className="mb-4">

                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                    First name:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="firstName"
                    id="firstName"
                    type="text"
                    defaultValue={currentUser.firstName}
                />

                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                    Last name:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="lastName"
                    id="lastName"
                    type="text"
                    defaultValue={currentUser.lastName}
                />

                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="companyName">
                    Company name:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="companyName"
                    id="companyName"
                    type="text"
                    defaultValue={currentUser.companyName}
                />

                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
                    Phone number:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="phoneNumber"
                    id="phoneNumber"
                    type="text"
                    defaultValue={currentUser.phoneNumber}
                />

                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                    Username:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="userName"
                    id="userName"
                    type="text"
                    defaultValue={currentUser.userName}
                />

                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="email"
                    id="email"
                    type="email"
                    defaultValue={currentUser.email}
                />
    
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    New password:
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    name="password"
                    id="password"
                />
            </div>

            <div className="flex items-center justify-between">
                <button
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={disabled}
                >
                Save
                </button>

                <button
                className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={onCancel}
                >
                Cancel
                </button>
            </div>
            </>
          )}
  

          {!isEdit && (
            <>

            <div className="flex items-center justify-between">
                <button
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                disabled={disabled}
                onClick={() => onEdit()}
                >
                    Edit
                </button>
            </div>
          </>
          )}

        </form>
        {errorMessage && (
          <p className="text-red-500 text-xs italic">{errorMessage}</p>
        )}
      </div>
    );
  }

  ProfileData.propTypes = {
    isEdit: PropTypes.bool,
    onEdit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};
  
  export default ProfileData;