// Modal.tsx
import React from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50"> {/* Добавлен z-50 */}
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-80">
                <button
                    onClick={onClose}
                    className="absolute top-0 right-0 mt-2 mr-2 bg-sky-600 hover:bg-theme-blue text-white font-bold py-2 px-4 rounded"
                >
                    &#x2715;
                </button>
                <h2 className="text-xl font-semibold mb-4">Sign Up</h2>
                <form>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input type="text" className="w-full p-1 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input type="email" className="w-full p-1 border rounded" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password:</label>
                        <input type="password" className="w-full p-1 border rounded" required />
                    </div>
                    <div className='mt-4'>
                        <input type="checkbox" id="consent" name="consent" />
                        <label className='text-sm'>
                            I consent to the processing of my personal data in accordance with the Privacy Policy.
                            Please treat the checked box next to this statement as my written consent.
                        </label>
                    </div>
                    <div className='mt-4'>
                        <input type="checkbox" id="policy" name="policy" />
                        <label className='text-sm'>
                            I have read and agree to the Terms of Use and Privacy Policy.
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="bg-sky-600 hover:bg-theme-blue text-white font-bold py-2 mt-4 px-4 rounded w-full"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Modal;
