import PropTypes from 'prop-types';

const CustomerForm = ({ onCancel, onSave, disabled, isRegister, errorMessage }) => {

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const entries = [...formData.entries()];
    
        const customer = entries.reduce((acc, entry) => {
          const [k, v] = entry;
          acc[k] = v;
          return acc;
        }, {});
    
        return onSave(customer);
    };

    return (
        <div className="mx-auto mt-20 max-w-xs py-10 sm:py-16 lg:py-20"> {/* Adjust padding */}
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={onSubmit}>
          {isRegister && (
            <div className="mb-4"> {/* Add margin bottom */}
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                Username:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="userName"
                id="userName"
                type="text"
                disabled={disabled}
              />
            </div>
          )}
  
          <div className="mb-4"> {/* Add margin bottom */}
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              id="email"
              type="email"
              disabled={disabled}
            />
          </div>
  
          <div className="mb-4"> {/* Add margin bottom */}
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              id="password"
              disabled={disabled}
            />
          </div>
  
          <div className="flex items-center justify-between">
            <button
              className="bg-rose-600 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={disabled}
            >
              {isRegister ? "Register" : "Log In"}
            </button>
            <button
              className="bg-slate-500 hover:bg-slate-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onCancel}
              disabled={disabled}
            >
              Cancel
            </button>
          </div>
        </form>
        {errorMessage && (
          <p className="text-red-500 text-xs italic">{errorMessage}</p>
        )}
      </div>
    );
};

CustomerForm.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    isRegister: PropTypes.bool,
    errorMessage: PropTypes.string
};

export default CustomerForm;