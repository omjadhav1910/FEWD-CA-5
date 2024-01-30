import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Books from './components/BookList';
import Form from './components/RegisterForm';
import './App.css';

function App() {

  return (
    <Router>
      <Routes>

        <Route path="/" element={<Books />} />

        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;