const ErrorPage = ({ statusCode }: { statusCode?: number }) => {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-yellow-600">
          {statusCode || "Error"}
        </h1>
        <p className="mt-4 text-xl text-gray-600">
          {statusCode
            ? `An error occurred with status code: ${statusCode}`
            : "An unexpected error occurred"}
        </p>
        <a
          href="/"
          className="mt-6 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
        >
          Go Back Home
        </a>
      </div>
    );
  };
  
  export default ErrorPage;
  