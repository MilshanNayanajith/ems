const InternalServerError = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-red-600">500</h1>
        <p className="mt-4 text-xl text-gray-600">Internal Server Error</p>
        <p className="mt-2 text-gray-500">
          Oops! Something went wrong on our end. Please try again later.
        </p>
        <a
          href="/"
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Go Back Home
        </a>
      </div>
    );
  };
  
  export default InternalServerError;
  