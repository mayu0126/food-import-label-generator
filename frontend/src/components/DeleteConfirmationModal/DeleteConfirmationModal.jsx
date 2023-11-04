import Modal from 'react-modal';

const DeleteConfirmationModal = ({ isOpen, onRequestClose, onConfirmDelete }) => {
  Modal.setAppElement('#root');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Delete Confirmation Modal"
      overlayClassName="bg-black bg-opacity-50"
      className="fixed inset-0 flex justify-center items-center" //background graying and center alignment
    >
      <div className="relative text-center text-sm bg-white p-6 rounded cursor-not-allowed">
        <button
          className="absolute top-0 right-0 mr-3 text-xl font-bold text-gray-400 hover:text-gray-600"
          onClick={onRequestClose}
        >
          x
        </button>
        <h2 className="text-xl font-bold mb-4 mt-3">Are you sure you want to delete the label?</h2>
        <button
          className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded mr-4"
          onClick={onConfirmDelete}
        >
          Yes
        </button>
        <button
          className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded"
          onClick={onRequestClose}
        >
          No
        </button>
      </div>
    </Modal>
  );
}

export default DeleteConfirmationModal;