import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const SearchBar = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
      console.log(handleSearch)
    try {
      const response = await axios.get(
        `https://reactnd-books-api.udacity.com/books?q=${searchTerm}`,
        { headers: { Authorization: 'whatever-you-want' } }
      );
      setSearchResults(response.data.books);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search books"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      <ul>
        {searchResults.map((book) => (
          <li key={book.id}>
            <img src={book.imageURL} alt={book.title} />
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBar;
