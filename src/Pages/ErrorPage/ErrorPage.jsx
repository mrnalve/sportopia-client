import React from 'react';
import { Link } from 'react-router-dom';
import warning from '../../../public/warning.png'

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={warning} alt="404 Image" className="w-64 mb-8" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">The requested page could not be found.</p>
      <Link href="/" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Back to Home</Link>
    </div>
  );
};

export default ErrorPage;
