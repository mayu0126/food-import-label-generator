// This component is responsible for the hungarian label data, which will be saved to the database

import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../../index.js';
import { jsPDF } from 'jspdf';

const TranslationForm = ({ labelData, errorMessage, successfulMessage, onSave, isDisabled, disabled, isEdit, onEdit, onCancel, currentUser, currentDate }) => {

    //console.log(labelData)
    const context  = useContext(UserContext);
    const [formFields, setFormFields] = useState(labelData);
    const [fillRequiredFields, setFillRequiredFields] = useState(null);

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
        requiredFields.forEach(field => console.log(formFields[field]));
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

    // Generate pdf
    const generatePDF = () => {
        // Create a new jsPDF instance
        const doc = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4',
            lineHeight: 1.2
        });
      
        // Calculate the dimensions for each quadrant
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const quadrantWidth = pageWidth / 2;
        const quadrantHeight = pageHeight / 2;

        // Collect form data
        const pdfFormFields = {
            productName: formFields.productName,
            legalName: formFields.legalName,
            allergens: formFields.allergens,
            legalNameAdditionalInformation: formFields.legalNameAdditionalInformation,
            cookingInstructions: formFields.cookingInstructions,
            ingredientsList: formFields.ingredientsList,
            ingredientsListAdditionalInformation: formFields.ingredientsListAdditionalInformation,
            mayContain: formFields.mayContain,
            nutritions: formFields.nutritions,
            producer: formFields.producer,
            distributor: formFields.distributor,
            countryOfOrigin: formFields.countryOfOrigin,
            mainIngredientCOO: formFields.mainIngredientCOO,
            bestBeforeText: formFields.bestBeforeText,
            storage: formFields.storage,
            bestBeforeAdditionalInformation: formFields.bestBeforeAdditionalInformation,
            netWeight: formFields.netWeight,
            netVolume: formFields.netVolume,
            ean: formFields.ean,
            organic: formFields.organic ? "Organic logo" : null,
            healthMark: formFields.healthMark,
        };
      
        // Start adding content to the PDF
        doc.text('Label Details', 10, 10);
        doc.setFontSize(10);
        //doc.addFont("../../assets/fonts/GARA.ttf", "gara", "normal");
        //doc.setFont('gara');

        // Loop through the formFields and add them to the PDF
        let yOffset = 20;
        for (const field in pdfFormFields) {
            if (pdfFormFields[field]) {
                for (let i = 0; i < 4; i++) {
                    doc.text(`${field}: ${pdfFormFields[field]}`, 10 + (i % 2) * quadrantWidth, yOffset + Math.floor(i / 2) * quadrantHeight);
                }
                yOffset += 5; // set line spacing for all 4 occurrences
            }
        }

        // Save the PDF and open a download dialog
        doc.save('label_details.pdf');
    };

    return (
        <>
        {labelData && (
        <div className="mx-auto mt-20 max-w-lg py-10 sm:py-16 lg:py-20">
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
                <input
                    className="mb-2 shadow appearance-none border rounded w-full py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="productName"
                    id="productName"
                    type="text"
                    defaultValue={formFields.productName}
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
                    defaultValue={formFields.legalName}
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
                    defaultValue={formFields.allergens}
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
                    defaultValue={formFields.legalNameAdditionalInformation}
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
                    defaultValue={formFields.cookingInstructions}
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
                    defaultValue={formFields.ingredientsList}
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
                    defaultValue={formFields.ingredientsListAdditionalInformation}
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
                    defaultValue={formFields.mayContain}
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
                    defaultValue={formFields.nutritions}
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
                    defaultValue={formFields.producer}
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
                    defaultValue={formFields.distributor}
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
                    defaultValue={formFields.countryOfOrigin}
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
                    defaultValue={formFields.mainIngredientCOO}
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
                    defaultValue={formFields.bestBeforeText}
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
                    defaultValue={formFields.storage}
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
                    defaultValue={formFields.bestBeforeAdditionalInformation}
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
                    defaultValue={formFields.netWeight}
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
                    defaultValue={formFields.netVolume}
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
                    defaultValue={formFields.ean}
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
                    defaultChecked={formFields.organic}
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
                    defaultValue={formFields.healthMark}
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
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={generatePDF}
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
        </div>
        )}
    </>
    );
  };
  
  export default TranslationForm;