// This component is responsible for the hungarian label data, which will be saved to the database

import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../index.js';

const TranslationForm = ({ labelData, errorMessage, successfulMessage, onSave, isDisabled, disabled, isEdit, onEdit, onCancel, currentUser, currentDate }) => {

    console.log(labelData)
    const context  = useContext(UserContext);
    const [formFields, setFormFields] = useState(labelData);
    const [fillRequiredFields, setFillRequiredFields] = useState(null);

    useEffect(() => {
        setFormFields(labelData)
    }, [labelData])

    console.log(formFields)

    const validateFields = () => {
        console.log("validating fields")
        console.log(formFields);
        const requiredFields = ['ean', 'legalName', 'nutritions', 'distributor', 'storage'];
        requiredFields.forEach(field => console.log(formFields[field]));
        console.log(requiredFields.every(field => formFields[field]));
        return requiredFields.every(field => formFields[field]);
      };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validateFields()) {
            //if validation fails, don't submit the form
            console.log("validating fields - FALSE")
            setFillRequiredFields('Please fill in all required fields');
            return;
        }
        else {
            setFillRequiredFields(null);
        }

        const formData = new FormData(e.target);

        const updatedLabel = {
            "id": labelData.id ? labelData.id : 0,
            "userId": currentUser.id,
            "date": currentDate,
            "organic": false,
            ...formFields,
        };
/*
        for (let [key, value] of formData.entries()) {
            updatedLabel[key] = value;
        }
*/
        if(updatedLabel.organic === "on"){
            updatedLabel.organic = true;
        }

        console.log(updatedLabel);

        return onSave(updatedLabel);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormFields({ ...formFields, [name]: value });
    };

    return (
        <>
        {labelData && (
        <div className="mx-auto mt-20 max-w-lg py-10 sm:py-16 lg:py-20">
            <h2 className="text-center text-gray-700 text-lg font-semibold mb-1">LABEL DETAILS</h2>
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
                    defaultValue={labelData.date.substring(0,10)}
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
                    defaultValue={labelData.productName}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="legalName">
                    Legal name*
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-rose-400"
                    name="legalName"
                    id="legalName"
                    type="text"
                    defaultValue={labelData.legalName}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="allergens">
                    Allergens
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="allergens"
                    id="allergens"
                    type="text"
                    defaultValue={labelData.allergens}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="legalNameAdditionalInformation">
                    Additional information - legal name
                </label>
                <textarea
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="legalNameAdditionalInformation"
                    id="legalNameAdditionalInformation"
                    type="text"
                    defaultValue={labelData.legalNameAdditionalInformation}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="cookingInstructions">
                    Cooking instructions
                </label>
                <textarea
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="cookingInstructions"
                    id="cookingInstructions"
                    defaultValue={labelData.cookingInstructions}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="ingredientsList">
                    Ingredients list
                </label>
                <textarea
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="ingredientsList"
                    id="ingredientsList"
                    defaultValue={labelData.ingredientsList}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="ingredientsListAdditionalInformation">
                    Additional information - ingredients list
                </label>
                <textarea
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="ingredientsListAdditionalInformation"
                    id="ingredientsListAdditionalInformation"
                    type="text"
                    defaultValue={labelData.ingredientsListAdditionalInformation}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="mayContain">
                    'May contain' sentence
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="mayContain"
                    id="mayContain"
                    type="text"
                    defaultValue={labelData.mayContain}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="nutritions">
                    Nutritions*
                </label>
                <textarea
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-rose-400"
                    name="nutritions"
                    id="nutritions"
                    defaultValue={labelData.nutritions}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="producer">
                    Producer
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="producer"
                    id="producer"
                    type="text"
                    defaultValue={labelData.producer}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="distributor">
                    Distributor*
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-rose-400"
                    name="distributor"
                    id="distributor"
                    type="text"
                    defaultValue={labelData.distributor}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="countryOfOrigin">
                    Country of origin
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="countryOfOrigin"
                    id="countryOfOrigin"
                    type="text"
                    defaultValue={labelData.countryOfOrigin}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="mainIngredientCOO">
                    Country of origin of main ingredient
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="mainIngredientCOO"
                    id="mainIngredientCOO"
                    type="text"
                    defaultValue={labelData.mainIngredientCOO}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="bestBeforeText">
                    Best before text
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="bestBeforeText"
                    id="bestBeforeText"
                    type="text"
                    defaultValue={labelData.bestBeforeText}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="storage">
                    Storage information*
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-rose-400"
                    name="storage"
                    id="storage"
                    type="text"
                    defaultValue={labelData.storage}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="bestBeforeAdditionalInformation">
                    Additional information - best before
                </label>
                <textarea
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="bestBeforeAdditionalInformation"
                    id="bestBeforeAdditionalInformation"
                    defaultValue={labelData.bestBeforeAdditionalInformation}
                    onChange={handleInputChange}
                    disabled={isDisabled}
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
                    defaultValue={labelData.netWeight}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />
                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="netVolume">
                    Net volume
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="netVolume"
                    id="netVolume"
                    type="text"
                    defaultValue={labelData.netVolume}
                    onChange={handleInputChange}
                    disabled={isDisabled}
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
                    defaultValue={labelData.ean}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="organic">
                    Organic
                </label>
                <input
                    className="mr-2 appearance-none h-4 w-4 border border-gray-300 rounded checked:bg-transparent checked:border-2 checked:bg-rose-600 focus:outline-none relative"
                    type="checkbox"
                    name="organic"
                    id="organic"
                    defaultChecked={labelData.organic}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="healthMark">
                    Health mark
                </label>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="healthMark"
                    id="healthMark"
                    type="text"
                    defaultValue={labelData.healthMark}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />
  
            </div>
            </>

            {isEdit && (
            <div className="flex items-center justify-between">
                <button
                className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={disabled} //can only be sent if the validation is successful
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
        <div className="text-center">
            {(errorMessage || fillRequiredFields) && (
                <p className="text-red-500 text-xs italic">{errorMessage || fillRequiredFields}</p>
            )}
            {successfulMessage && (
                <p className="text-green-500 text-xs italic">{successfulMessage}</p>
            )}
        </div>
        </div>
        )}
    </>
    );
  };
  
  export default TranslationForm;