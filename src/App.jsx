import React from 'react';
import BookForm from './Components/BookForm';
import BookList from './Components/BookList';
import BookDetails from './Components/BookDetails';
import { Route, Routes } from 'react-router-dom';
import BookHome from './Components/BookHome';
import Header from './Components/Header';
import { ToastContainer } from 'react-toastify';
import BookDescription from './Components/BookDescription';


function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<BookHome/>}></Route>
      <Route path='/list' element={<BookList/>}></Route>
      <Route path='/form' element={<BookForm/>}></Route>
      <Route path="/details/:id" element={<BookDetails />} />
      <Route path="/description" element={<BookDescription />} />
      {/* <Route path="/edit" element={<edit />} /> */}

      
      
      </Routes>
      <ToastContainer/>
    </>
  );
}

export default App;

