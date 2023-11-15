import Modal from 'react-modal';
import generatePDF from '../../utils/pdfGeneratorJSPDF.js';
import { useState } from 'react';

const PrintingModal = ({ isOpen, onRequestClose, formFields }) => {
  Modal.setAppElement('#root');

  const [printingDetails, setPrintingDetails] = useState({});

  //these could be states as per the values of input fields
  const pageFormat = 'a7';
  const pageOrientation = 'landscape';
  const fontSize = 7;

  const handleInputChange = (e) => {
    console.log(e)
    console.log(e.target.value)
    const { name, id, value, type, checked } = e.target;
    /*if (Object.keys(printingDetails).includes(name)){

    }*/
    setPrintingDetails({ ...printingDetails, [name]: id});
    console.log(printingDetails);
};

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Printing Modal"
      overlayClassName="bg-black bg-opacity-50"
      className="fixed inset-0 flex justify-center items-center" //background graying and center alignment
    >
      <div className="relative text-center text-sm bg-white p-6 rounded cursor-default">
        <button
          className="absolute top-0 right-0 mr-3 text-xl font-bold text-gray-400 hover:text-gray-600"
          onClick={onRequestClose}
        >
          x
        </button>
        <h2 className="text-xl font-bold mb-4 mt-3">Set label details</h2>

        <p className='mt-5 text-rose-600 text-sm font-bold mb-1 border-b border-gray-200'>LABEL SIZE</p>
        <div className="mt-3 mb-8">
          
          <div className="flex space-x-4">
          <input
              className="appearance-none h-4 w-4 border border-gray-300 rounded checked:border-2 checked:bg-rose-600 focus:outline-none relative"
              type="radio"
              name="labelSize"
              id="a6"
              onChange={handleInputChange}
          />
          <label className="text-gray-700 text-sm font-bold mb-1" htmlFor="labelSizeA6">
              A6 <span className='font-normal'>(105 mm × 148.5 mm)</span>
          </label>
          </div>

          <div className="flex space-x-4">
          <input
              className="appearance-none h-4 w-4 border border-gray-300 rounded checked:border-2 checked:bg-rose-600 focus:outline-none relative"
              type="radio"
              name="labelSize"
              id="a7"
              onChange={handleInputChange}
          />
          <label className="text-gray-700 text-sm font-bold mb-1" htmlFor="labelSizeA7">
              A7 <span className='font-normal'>(74.25 mm × 105 mm)</span>
          </label>
          </div>

          <div className="flex space-x-4">
          <input
              className="appearance-none h-4 w-4 border border-gray-300 rounded checked:border-2 checked:bg-rose-600 focus:outline-none relative"
              type="radio"
              name="labelSize"
              id="a8"
              onChange={handleInputChange}
          />
          <label className="text-gray-700 text-sm font-bold mb-1" htmlFor="labelSizeA8">
              A8 <span className='font-normal'>(52.5 mm × 74.25 mm)</span>
          </label>
          </div>

        </div>

        <p className='mt-5 text-rose-600 text-sm font-bold mb-1 border-b border-gray-200'>LABEL ORIENTATION</p>
        <div className="mt-3 flex space-x-4">

          <input
              className="inline-block appearance-none h-4 w-4 border border-gray-300 rounded checked:border-2 checked:bg-rose-600 focus:outline-none relative"
              type="radio"
              name="labelOrientation"
              id="portrait"
              onChange={handleInputChange}
          />
          <label className="inline-block text-gray-700 text-sm font-bold mb-1" htmlFor="portrait">
            Portrait
          </label>

          <input
              className="inline-block appearance-none h-4 w-4 border border-gray-300 rounded checked:border-2 checked:bg-rose-600 focus:outline-none relative"
              type="radio"
              name="labelOrientation"
              id="landscape"
              onChange={handleInputChange}
          />
          <label className="inline-block text-gray-700 text-sm font-bold mb-1" htmlFor="landscape">
            Landscape
          </label>

        </div>

        <p className='mt-5 text-rose-600 text-sm font-bold mb-1 border-b border-gray-200'>FONT SIZE</p>
        <div className="mt-3 mb-8 flex space-x-4">

          <input
              className="inline-block appearance-none h-4 w-4 border border-gray-300 rounded checked:border-2 checked:bg-rose-600 focus:outline-none relative"
              type="radio"
              name="fontSize"
              id="6"
              onChange={handleInputChange}
          />
          <label className="inline-block text-gray-700 text-sm font-bold mb-1" htmlFor="fontSize6">
            6 pt
          </label>

          <input
              className="inline-block appearance-none h-4 w-4 border border-gray-300 rounded checked:border-2 checked:bg-rose-600 focus:outline-none relative"
              type="radio"
              name="fontSize"
              id="7"
              onChange={handleInputChange}
          />
          <label className="inline-block text-gray-700 text-sm font-bold mb-1" htmlFor="fontSize7">
            7 pt
          </label>

          <input
              className="inline-block appearance-none h-4 w-4 border border-gray-300 rounded checked:border-2 checked:bg-rose-600 focus:outline-none relative"
              type="radio"
              name="fontSize"
              id="8"
              onChange={handleInputChange}
          />
          <label className="inline-block text-gray-700 text-sm font-bold mb-1" htmlFor="fontSize8">
            8 pt
          </label>

        </div>



        <button
          className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={() => generatePDF(formFields, printingDetails)}
        >
          Print
        </button>
        <button
          className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded"
          onClick={onRequestClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default PrintingModal;