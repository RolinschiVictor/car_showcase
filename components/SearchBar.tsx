"use client";

import {SetStateAction, useState} from 'react';
import SearchManufacturer from "./SearchManufacturer";

const SearchBar = () => {
  const [manufacturer, setManufacturer] = useState('');  
  const handleSearch = () => {}

  return (
    <form className="searchbar" onSubmit={handleSearch}>
        <div className="searchbar__item">
          <SearchManufacturer manufacturer={''} setManufacturer={function (value: SetStateAction<string>): void {
                  throw new Error('Function not implemented.');
              } }/>
        </div>
    </form>
  )
}

export default SearchBar;