import React, { useState } from "react";

type Props = {
  searchValueFunc:(value:any) => void
};

const Search = ({searchValueFunc}: Props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value); // Update searchValue with the current input value
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchValueFunc(searchValue);

  };

  const handleInputClear = (e:any) => {
    if (e.target.value === "") {
      searchValueFunc('');
    }
  };

  return (
    <form className=" w-full md:w-[40%]" onSubmit={handleSubmit}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-blue-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="search"
          id="default-search"
          value={searchValue} // Bind searchValue to the input field
          onChange={handleInputChange} // Call handleInputChange on input change
          className="block w-full p-2 ps-10 text-sm text-blue-900 border border-gray-300 rounded-full bg-white placeholder:text-blue-300 border-none focus:outline-none"
          placeholder="Search employee"
          onInput={handleInputClear}
        />
      </div>
    </form>
  );
};

export default Search;
