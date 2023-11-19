// This component is responsible for the english label data

import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../../index.js';

const LabelForm = ({ onSave, translationErrorMessage, currentDate, loading }) => {

    const context  = useContext(UserContext);
    const firstTranslateButtonRef = useRef();

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const englishLabel = {};

        for (let [key, value] of formData.entries()) {
            englishLabel[key] = value;
        }    

        return onSave(englishLabel);
    };

    const handleTranslateClick = () => {
      //trigger the first "TRANSLATE" button click
      firstTranslateButtonRef.current.click();
    };
  
    return (
        <div className="mx-auto mt-20 max-w-lg py-10 sm:py-16 lg:py-20">
        <h2 className="text-center text-gray-700 text-lg font-semibold mb-8">IMPORTED PRODUCT DETAILS</h2>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={(e) => onSubmit(e)}>

            <>
            <div className="mb-4">

              
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="date">
                    Date
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="date"
                    id="date"
                    type="text"
                    defaultValue={currentDate.substring(0,10)}
                    disabled={true}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="productName">
                    Product name
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="productName"
                    id="productName"
                    type="text"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="legalName">
                    Legal name*
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-rose-400"
                    name="legalName"
                    id="legalName"
                    type="text"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="allergens">
                    Allergens
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="allergens"
                    id="allergens"
                    type="text"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="legalNameAdditionalInformation">
                    Additional information - legal name
                </label>
                <textarea
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="legalNameAdditionalInformation"
                    id="legalNameAdditionalInformation"
                    type="text"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="cookingInstructions">
                    Cooking instructions
                </label>
                <textarea
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="cookingInstructions"
                    id="cookingInstructions"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="ingredientsList">
                    Ingredients list
                </label>
                <textarea
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="ingredientsList"
                    id="ingredientsList"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="ingredientsListAdditionalInformation">
                    Additional information - ingredients list
                </label>
                <textarea
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="ingredientsListAdditionalInformation"
                    id="ingredientsListAdditionalInformation"
                    type="text"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="mayContain">
                    'May contain' sentence
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="mayContain"
                    id="mayContain"
                    type="text"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="nutritions">
                    Nutritions*
                </label>
                <textarea
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-rose-400"
                    name="nutritions"
                    id="nutritions"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="producer">
                    Producer
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="producer"
                    id="producer"
                    type="text"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="distributor">
                    Distributor*
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-rose-400"
                    name="distributor"
                    id="distributor"
                    type="text"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="countryOfOrigin">
                    Country of origin
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="countryOfOrigin"
                    id="countryOfOrigin"
                    type="text"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="mainIngredientCOO">
                    Country of origin of main ingredient
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="mainIngredientCOO"
                    id="mainIngredientCOO"
                    type="text"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="bestBeforeText">
                    Best before text
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="bestBeforeText"
                    id="bestBeforeText"
                    type="text"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="storage">
                    Storage information*
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-rose-400"
                    name="storage"
                    id="storage"
                    type="text"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="bestBeforeAdditionalInformation">
                    Additional information - best before
                </label>
                <textarea
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="bestBeforeAdditionalInformation"
                    id="bestBeforeAdditionalInformation"
                    disabled={false}
                />

              <div className='border-x border-rose-400 px-3 rounded'>
                <div className='text-rose-600 text-xs'>Please provide one of the below fields:</div>
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="netWeight">
                    Net weight
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="netWeight"
                    id="netWeight"
                    type="text"
                    disabled={false}
                />
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="netVolume">
                    Net volume
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="netVolume"
                    id="netVolume"
                    type="text"
                    disabled={false}
                />
              </div>

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="ean">
                    EAN code*
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-rose-400"
                    name="ean"
                    id="ean"
                    type="text"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="organic">
                    Organic
                </label>
                <input
                    className="mr-2 appearance-none h-4 w-4 border border-gray-300 rounded checked:border-2 checked:bg-rose-600 focus:outline-none relative"
                    type="checkbox"
                    name="organic"
                    id="organic"
                    disabled={false}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="healthMark">
                    Health mark
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="healthMark"
                    id="healthMark"
                    type="text"
                    disabled={false}
                />

            </div>
            </>
            <div className="relative text-center">
                <button
                    ref={firstTranslateButtonRef}
                    className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                    >TRANSLATE ➜
                </button>
            </div>
          </form>
        <div className="text-center">
            {translationErrorMessage && (
                <p className="text-red-500 text-xs italic">{translationErrorMessage}</p>
            )}
        </div>

        <div className='hidden xl:block absolute top-96 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <button className="w-36 bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -mt-6"
              type="button"
              onClick={handleTranslateClick}
              >TRANSLATE ➜
          </button>
          <div className="mt-20 w-52 text-center">
            {translationErrorMessage && (
              <p className="text-red-500 text-xs italic">{translationErrorMessage}</p>
            )}
          </div>
        </div>

      </div>

    );
  }
  
  export default LabelForm;