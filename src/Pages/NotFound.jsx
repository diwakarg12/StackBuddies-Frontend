import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-red-500 to-pink-500">
      <div className="text-center">
        {/* 404 Text */}
        <h1 className="text-9xl font-bold text-white">404</h1>
        <h2 className="text-4xl font-semibold text-white mt-4">Oops! Page Not Found</h2>
        <p className="text-lg text-white mt-2">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 bg-white font-semibold rounded-lg shadow-md shadow-black hover:bg-gradient-to-r from-red-500 to-pink-500 hover:text-white transition duration-300 border border-white hover:shadow-white"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;