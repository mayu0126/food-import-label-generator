// This component is responsible for the hungarian label data, which will be saved to the database

import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../index.js';
import generatePDF from '../../utils/pdfGeneratorJSPDF.js';
import PrintingModal from '../PrintingModal';

const TranslationForm = ({onSaveNewWord, onTranslation, labelData, errorMessage, successfulMessage,
    onSave, isDisabled, disabled, isEdit, onEdit, onCancel, currentUser, currentDate }) => {

    //console.log(labelData)
    const context  = useContext(UserContext);
    const [formFields, setFormFields] = useState(labelData);
    const [fillRequiredFields, setFillRequiredFields] = useState(null);
    const [showPrintingModal, setShowPrintingModal] = useState(false);
    const [savedStates, setSavedStates] = useState({});

    useEffect(() => {
        setFormFields(labelData)
    }, [labelData])

    const clearFillRequiredFieldsMessage = () => {
        setFillRequiredFields("");
    };

    useEffect(() => {
        document.addEventListener('click', clearFillRequiredFieldsMessage);
        //remove event listeners
        return () => {
            document.removeEventListener('click', clearFillRequiredFieldsMessage);
        };
    }, []);

    //console.log(formFields)

    const validateFields = () => {
        //console.log("validating fields")
        //console.log(formFields);
        const requiredFields = ['ean', 'legalName', 'nutritions', 'distributor', 'storage'];
        //requiredFields.forEach(field => console.log(formFields[field]));
        //console.log(requiredFields.every(field => formFields[field]));
        return requiredFields.every(field => formFields[field]);
      };

    const onSubmit = (e) => {
        e.preventDefault();

        if (!validateFields()) {
            //if validation fails, don't submit the form
            //console.log("validating fields - FALSE")
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
        const { name, value, type, checked } = e.target;
        setFormFields({ ...formFields, [name]: type === "checkbox" ? checked : value });
    };


    const handleSaveWord = (e, fieldName) => {
        //console.log(savedStates);
        const newSavedStates = { ...savedStates };
        newSavedStates[fieldName] = true;
        setSavedStates(newSavedStates);

        if (!savedStates[fieldName]){
            console.log(e)
            console.log(formFields[fieldName]);
            console.log(fieldName)
            return onSaveNewWord(fieldName, formFields[fieldName]);
        }
    };

    return (
        <>
        {labelData && (
        <div className="mx-auto xl:mt-20 mt-0 max-w-lg py-10 sm:py-16 lg:py-20">
            <h2 className="text-center text-gray-700 text-lg font-semibold mb-8">LABEL DETAILS</h2>
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

                <div className='flex'>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="productName"
                    id="productName"
                    type="text"
                    defaultValue={labelData.productName}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />
                {onTranslation && (
                    <button
                    className={`ml-3 ${savedStates["productName"] ? 'bg-rose-600 text-white text-sm font-semibold'  : 'bg-slate-400 hover:bg-slate-300 text-white text-sm font-semibold'} w-20 h-8 px-1 rounded focus:outline-none`}
                    onClick={(e) => handleSaveWord(e, "productName")}
                    type='button'
                    >
                    {savedStates["productName"] ?
                        <>
                            Saved ✓
                        </>
                        :
                        <>
                            Save
                        </>
                    }
                    </button>
                )}
                </div>

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="legalName">
                    Legal name*
                </label>

                <div className='flex'>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-rose-400"
                    name="legalName"
                    id="legalName"
                    type="text"
                    defaultValue={labelData.legalName}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />

                    {onTranslation && (
                        <button
                        className={`ml-3 ${savedStates["legalName"] ? 'bg-rose-600 text-white text-sm font-semibold'  : 'bg-slate-400 hover:bg-slate-300 text-white text-sm font-semibold'} w-20 h-8 px-1 rounded focus:outline-none`}
                        onClick={(e) => handleSaveWord(e, "legalName")}
                        type='button'
                        >
                        {savedStates["legalName"] ?
                            <>
                                Saved ✓
                            </>
                            :
                            <>
                                Save
                            </>
                        }
                        </button>
                    )}
                </div>

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="allergens">
                    Allergens
                </label>
                <div className='flex'>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="allergens"
                    id="allergens"
                    type="text"
                    defaultValue={labelData.allergens}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />
                    {onTranslation && (
                        <button
                        className={`ml-3 ${savedStates["allergens"] ? 'bg-rose-600 text-white text-sm font-semibold'  : 'bg-slate-400 hover:bg-slate-300 text-white text-sm font-semibold'} w-20 h-8 px-1 rounded focus:outline-none`}
                        onClick={(e) => handleSaveWord(e, "allergens")}
                        type='button'
                        >
                        {savedStates["allergens"] ?
                            <>
                                Saved ✓
                            </>
                            :
                            <>
                                Save
                            </>
                        }
                        </button>
                    )}
                </div>

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="legalNameAdditionalInformation">
                    Additional information - legal name
                </label>
                <div className='flex mb-2'>
                <textarea
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="legalNameAdditionalInformation"
                    id="legalNameAdditionalInformation"
                    type="text"
                    defaultValue={labelData.legalNameAdditionalInformation}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />
                    {onTranslation && (
                        <button
                        className={`ml-3 ${savedStates["legalNameAdditionalInformation"] ? 'bg-rose-600 text-white text-sm font-semibold'  : 'bg-slate-400 hover:bg-slate-300 text-white text-sm font-semibold'} w-20 h-8 px-1 rounded focus:outline-none`}
                        onClick={(e) => handleSaveWord(e, "legalNameAdditionalInformation")}
                        type='button'
                        >
                        {savedStates["legalNameAdditionalInformation"] ?
                            <>
                                Saved ✓
                            </>
                            :
                            <>
                                Save
                            </>
                        }
                        </button>
                    )}
                </div>

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
                <div className='flex mb-1'>
                <textarea
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="ingredientsListAdditionalInformation"
                    id="ingredientsListAdditionalInformation"
                    type="text"
                    defaultValue={labelData.ingredientsListAdditionalInformation}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />
                    {onTranslation && (
                        <button
                        className={`ml-3 ${savedStates["ingredientsListAdditionalInformation"] ? 'bg-rose-600 text-white text-sm font-semibold'  : 'bg-slate-400 hover:bg-slate-300 text-white text-sm font-semibold'} w-20 h-8 px-1 rounded focus:outline-none`}
                        onClick={(e) => handleSaveWord(e, "ingredientsListAdditionalInformation")}
                        type='button'
                        >
                        {savedStates["ingredientsListAdditionalInformation"] ?
                            <>
                                Saved ✓
                            </>
                            :
                            <>
                                Save
                            </>
                        }
                        </button>
                    )}
                </div>

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="mayContain">
                    'May contain' sentence
                </label>
                <div className='flex'>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="mayContain"
                    id="mayContain"
                    type="text"
                    defaultValue={labelData.mayContain}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />
                    {onTranslation && (
                        <button
                        className={`ml-3 ${savedStates["mayContain"] ? 'bg-rose-600 text-white text-sm font-semibold'  : 'bg-slate-400 hover:bg-slate-300 text-white text-sm font-semibold'} w-20 h-8 px-1 rounded focus:outline-none`}
                        onClick={(e) => handleSaveWord(e, "mayContain")}
                        type='button'
                        >
                        {savedStates["mayContain"] ?
                            <>
                                Saved ✓
                            </>
                            :
                            <>
                                Save
                            </>
                        }
                        </button>
                    )}
                </div>

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
                <div className='flex'>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="countryOfOrigin"
                    id="countryOfOrigin"
                    type="text"
                    defaultValue={labelData.countryOfOrigin}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />
                    {onTranslation && (
                        <button
                        className={`ml-3 ${savedStates["countryOfOrigin"] ? 'bg-rose-600 text-white text-sm font-semibold'  : 'bg-slate-400 hover:bg-slate-300 text-white text-sm font-semibold'} w-20 h-8 px-1 rounded focus:outline-none`}
                        onClick={(e) => handleSaveWord(e, "countryOfOrigin")}
                        type='button'
                        >
                        {savedStates["countryOfOrigin"] ?
                            <>
                                Saved ✓
                            </>
                            :
                            <>
                                Save
                            </>
                        }
                        </button>
                    )}
                </div>

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="mainIngredientCOO">
                    Country of origin of main ingredient
                </label>
                <div className='flex'>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="mainIngredientCOO"
                    id="mainIngredientCOO"
                    type="text"
                    defaultValue={labelData.mainIngredientCOO}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />
                    {onTranslation && (
                        <button
                        className={`ml-3 ${savedStates["mainIngredientCOO"] ? 'bg-rose-600 text-white text-sm font-semibold'  : 'bg-slate-400 hover:bg-slate-300 text-white text-sm font-semibold'} w-20 h-8 px-1 rounded focus:outline-none`}
                        onClick={(e) => handleSaveWord(e, "mainIngredientCOO")}
                        type='button'
                        >
                        {savedStates["mainIngredientCOO"] ?
                            <>
                                Saved ✓
                            </>
                            :
                            <>
                                Save
                            </>
                        }
                        </button>
                    )}
                </div>

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="bestBeforeText">
                    Best before text
                </label>
                <div className='flex'>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="bestBeforeText"
                    id="bestBeforeText"
                    type="text"
                    defaultValue={labelData.bestBeforeText}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />
                    {onTranslation && (
                        <button
                        className={`ml-3 ${savedStates["bestBeforeText"] ? 'bg-rose-600 text-white text-sm font-semibold'  : 'bg-slate-400 hover:bg-slate-300 text-white text-sm font-semibold'} w-20 h-8 px-1 rounded focus:outline-none`}
                        onClick={(e) => handleSaveWord(e, "bestBeforeText")}
                        type='button'
                        >
                        {savedStates["bestBeforeText"] ?
                            <>
                                Saved ✓
                            </>
                            :
                            <>
                                Save
                            </>
                        }
                        </button>
                    )}
                </div>

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="storage">
                    Storage information*
                </label>
                <div className='flex'>
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-rose-400"
                    name="storage"
                    id="storage"
                    type="text"
                    defaultValue={labelData.storage}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />
                    {onTranslation && (
                        <button
                        className={`ml-3 ${savedStates["storage"] ? 'bg-rose-600 text-white text-sm font-semibold'  : 'bg-slate-400 hover:bg-slate-300 text-white text-sm font-semibold'} w-20 h-8 px-1 rounded focus:outline-none`}
                        onClick={(e) => handleSaveWord(e, "storage")}
                        type='button'
                        >
                        {savedStates["storage"] ?
                            <>
                                Saved ✓
                            </>
                            :
                            <>
                                Save
                            </>
                        }
                        </button>
                    )}
                </div>

                <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="bestBeforeAdditionalInformation">
                    Additional information - best before
                </label>
                <div className='flex mb-2'>
                <textarea
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="bestBeforeAdditionalInformation"
                    id="bestBeforeAdditionalInformation"
                    defaultValue={labelData.bestBeforeAdditionalInformation}
                    onChange={handleInputChange}
                    disabled={isDisabled}
                />
                    {onTranslation && (
                        <button
                        className={`ml-3 ${savedStates["bestBeforeAdditionalInformation"] ? 'bg-rose-600 text-white text-sm font-semibold'  : 'bg-slate-400 hover:bg-slate-300 text-white text-sm font-semibold'} w-20 h-8 px-1 rounded focus:outline-none`}
                        onClick={(e) => handleSaveWord(e, "bestBeforeAdditionalInformation")}
                        type='button'
                        >
                        {savedStates["bestBeforeAdditionalInformation"] ?
                            <>
                                Saved ✓
                            </>
                            :
                            <>
                                Save
                            </>
                        }
                        </button>
                    )}
                </div>

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
                    className="mr-2 appearance-none h-4 w-4 border border-gray-300 rounded checked:border-2 checked:bg-rose-600 focus:outline-none relative"
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
                <button
                    className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => setShowPrintingModal(true)}
                    >
                    Print
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
                <>
                <p className="text-green-500 text-xs italic">{successfulMessage}</p>
                <Link to="/mylabels" className="text-sm font-semibold leading-6 text-gray-900">
                    <button type="button">
                        Go to my labels <span aria-hidden="true">&rarr;</span>
                    </button>
                </Link>
                </>
            )}
        </div>

            <PrintingModal
            isOpen={showPrintingModal}
            onRequestClose={() => setShowPrintingModal(false)}
            formFields={formFields}
            />

            {showPrintingModal && (
                <div
                className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50"
                aria-hidden="true" //aria-hidden attribute makes the background content inactive
                />
            )}

        </div>
        )}
    </>
    );
  };
  
  export default TranslationForm;