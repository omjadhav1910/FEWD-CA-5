import React from 'react';
import BookList from './components/BookList';
import RegisterForm from './components/RegisterForm';
import SearchBar from './components/SearchBar';
import './App.css'

const App = () => {
  return (
    <div>
      <h1>Kalvium Books</h1>
      <SearchBar />
      <BookList />
      <button onClick={() => console.log('Register button clicked')}>
        Register
      </button>
      <RegisterForm />
    </div>
  );
};

export default App;
