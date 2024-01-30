import React, { useEffect, useState } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import img from '../assets/logo.png'

function Books() {

  const [bookData, setBookData] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [showSuggestion, setShowSuggestions] = useState(true);


  function handleInputChange(event) {
    const userInput = event.target.value;
    setSearchText(userInput);
    setShowSuggestions(userInput !== '');


    const filtered = bookData.filter(
      item => item.title.toLowerCase().includes(userInput.toLowerCase())
    );
    setFilteredBooks(filtered);
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://reactnd-books-api.udacity.com/books',
          { headers: { Authorization: 'whatever-you-want' } }
        );
        setBookData(response.data.books);
        setFilteredBooks(response.data.books);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);


  return (
    <div className="main-cointainer">
      <div className="header">
        <img className='logo-img' src={img} alt="" />
        <input
          type="text"
          placeholder=" 🔍 Enter the book name"
          list="suggestions"
          onChange={handleInputChange}
          value={searchText}  
          className="search-bar"
        />
        <Link to="/form">
          <button className="Register">Register</button>
        </Link>
      </div>
      <div className="List-books">

        {filteredBooks.map(book => (
          <div key={book.id} className="book">
            <img src={book.imageLinks.smallThumbnail} alt="" />
            <h2>{book.title}</h2>
            <p>Page Count: {book.pageCount}</p>
            <p>  {book.averageRating} ⭐️<br/>Free</p>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
