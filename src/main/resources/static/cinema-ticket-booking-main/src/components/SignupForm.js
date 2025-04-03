import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { showErrorNotification, showSuccessNotification } from "../utils/Notification";

const SignupForm = ({ onClose, onSwitchToLogin }) => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const { signup, isLoading, error } = useAuth();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await signup(email, password, fullName, phoneNumber);
        showSuccessNotification('Account created successfully!');
        onClose();  
      } catch (err) {
        showErrorNotification('Error creating account.');
        console.log(err);
      }
    };
  
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-gray-800 to-black p-6 rounded-lg shadow-lg w-96 z-50">
        <div className='mb-6'>
          <div className="text-white text-2xl font-semibold text-center">
            Create New Account
          </div>
          <p className="mt-2 text-center text-sm text-gray-400">Please fill in the form to continue</p>
        </div>
  
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="p-3 rounded-lg border-2 border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="p-3 rounded-lg border-2 border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone Number"
            className="p-3 rounded-lg border-2 border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="p-3 rounded-lg border-2 border-gray-700 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex justify-between items-center mt-3 text-gray-400">
            <button
              type="button"
              onClick={onClose} 
              className="text-sm hover:text-white transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition duration-200"
            >
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </div>
          {error && <div className="text-red-500 text-sm mt-2 text-center">{error}</div>}
        </form>
  
        <div className="text-center text-gray-400 mt-6">
          <span className="text-sm">Already have an account? </span>
          <button
            onClick={onSwitchToLogin}
            className="text-blue-500 hover:text-blue-300"
          >
            Login
          </button>
        </div>
      </div>
    );
  };
  
  export default SignupForm;
  