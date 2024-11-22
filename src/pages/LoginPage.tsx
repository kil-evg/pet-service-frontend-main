import React from 'react';

const LoginPage: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add login handling logic here
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-start justify-center pt-12 px-4">
            <form onSubmit={handleSubmit} className="max-w-lg w-4/5 scale-90">
                <h2 className="text-2xl font-semibold mb-6 text-center">Log In</h2>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 mb-2">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 mb-2">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <div className="flex items-center mb-4">
                    <input type="checkbox" id="remember" name="remember" className="mr-2" />
                    <label htmlFor="remember" className="text-sm">Remember me</label>
                </div>
                <div className="mb-4">
                    <button
                        type="button"
                        className="text-blue-500 text-sm underline"
                        onClick={() => alert('Forgot password clicked')}
                    >
                        Forgot your password?
                    </button>
                </div>
                <button
                    type="submit"
                    className="w-full bg-sky-600 hover:bg-theme-blue text-white font-bold py-2 px-4 rounded"
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
