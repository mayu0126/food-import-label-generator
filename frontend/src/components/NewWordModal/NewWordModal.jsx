import Modal from 'react-modal';
import { useState } from 'react';

const PrintingModal = ({ isOpen, onRequestClose, addNewRecord }) => {
  Modal.setAppElement('#root');

  const [newRecordDetails, setNewRecordDetails] = useState({id:0});

  const handleInputChange = (e) => {
    //console.log(e)
    console.log(e.target.value)
    const { name, value, } = e.target;

    setNewRecordDetails({ ...newRecordDetails, [name]: value});
    //console.log(newRecordDetails);
  };

  const validateSelection = () => {
    const englishWordInput = newRecordDetails.english !== undefined;
    const hungarianWordInput = newRecordDetails.hungarian !== undefined;

    if (!englishWordInput) {
      alert("Please add English word.");
      return false;
    }

    if (!hungarianWordInput) {
      alert("Please add Hungarian word.");
      return false;
    }

    return true;
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="New Word Modal"
      overlayClassName="bg-black bg-opacity-50"
      className="fixed inset-0 flex justify-center items-center" //background graying and center alignment
    >
      <div className="relative text-center text-sm bg-white p-6 rounded cursor-default">
        <button
          className="absolute top-0 right-0 mr-2 text-xl font-bold text-gray-400 hover:text-gray-600"
          onClick={onRequestClose}
        >
          ✗
        </button>
        <h2 className="text-xl font-bold mb-4 mt-3">Add new word or expression</h2>
        <div className="mt-3 mb-6">
          
          <div className="flex flex-col space-x-4">
          <label className="text-gray-700 text-sm font-bold mb-1" htmlFor="english">
              English:
          </label>
          <input
              className="py-1 px-2 appearance-none w-auto border border-gray-300 rounded checked:border-2 checked:bg-rose-600 focus:outline-none relative"
              type="text"
              name="english"
              id="english"
              onChange={handleInputChange}
          />
          </div>

          <div className="flex flex-col space-x-4">
          <label className="text-gray-700 text-sm font-bold mb-1" htmlFor="hungarian">
              Hungarian:
          </label>
          <input
              className="py-1 px-2 appearance-none w-auto border border-gray-300 rounded checked:border-2 checked:bg-rose-600 focus:outline-none relative"
              type="text"
              name="hungarian"
              id="hungarian"
              onChange={handleInputChange}
          />
          </div>

        </div>

        <button
          className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={() => {
            if (validateSelection()) {
              addNewRecord(newRecordDetails);
            }
          }}
        >
          Add
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