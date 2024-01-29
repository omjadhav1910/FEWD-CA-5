import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css'
const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          'https://reactnd-books-api.udacity.com/books',
          { headers: { Authorization: 'whatever-you-want' } }
        );
        setBooks(response.data.books);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search books"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredBooks.map(book => (
          <li key={book.id}>
            <img src={book.imageURL} alt={book.title} />
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
