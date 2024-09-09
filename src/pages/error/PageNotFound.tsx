const PageNotFound = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
        <p className="mt-2 text-gray-500">
          The page you are looking for doesn't exist.
        </p>
        <a
          href="/"
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back Home
        </a>
      </div>
    );
  };
  
  export default PageNotFound;
  