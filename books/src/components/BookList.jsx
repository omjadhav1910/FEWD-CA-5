// Importing necessary dependencies from React and other libraries
import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import img from '../assets/logo.png';

// React functional component for displaying a list of books
function Books() {
  // State variables to manage book data, search input, filtered books, and suggestion visibility
  const [bookData, setBookData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showSuggestion, setShowSuggestions] = useState(true);

  // Handler function to update search input and filter books based on user input
  function handleInputChange(event) {
    const userInput = event.target.value;
    setSearchText(userInput);
    setShowSuggestions(userInput !== '');

    // Filtering books based on the user input (case-insensitive)
    const filtered = bookData.filter(
      item => item.title.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredBooks(filtered);
  }

  // useEffect hook to fetch book data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching book data from the specified API
        const response = await axios.get(
          'https://reactnd-books-api.udacity.com/books',
          { headers: { Authorization: 'whatever-you-want' } }
        );
        // Setting both original and filtered book data in the state
        setBookData(response.data.books);
        setFilteredBooks(response.data.books);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    // Calling the fetchData function when the component mounts (empty dependency array)
    fetchData();
  }, []);

  // Rendering the component structure
  return (
    <div className="main-cointainer">
      <div className="header">
        {/* Logo image */}
        <img className='logo-img' src={img} alt="" />
        {/* Search input with dynamic suggestions */}
        <input
          type="text"
          placeholder=" 🔍 Enter the book name"
          list="suggestions"
          onChange={handleInputChange}
          value={searchText}  
          className="search-bar"
        />
        {/* Link to navigate to the registration form */}
        <Link to="/form">
          <button className="Register">Register</button>
        </Link>
      </div>
      {/* Displaying the list of books */}
      <div className="List-books">
        {filteredBooks.map(book => (
          <div key={book.id} className="book">
            {/* Book cover image */}
            <img src={book.imageLinks.smallThumbnail} alt="" />
            {/* Book title */}
            <h2>{book.title}</h2>
            {/* Book information: page count, average rating, and status (Free) */}
            <p>Page Count: {book.pageCount}</p>
            <p>  {book.averageRating} ⭐️<br/>Free</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Exporting the Books component as the default export
export default Books;
