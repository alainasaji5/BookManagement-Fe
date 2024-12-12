import React from 'react';
import { useLocation } from 'react-router-dom';

function BookDescription() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const description = queryParams.get('description');

  return (
    <div>
      <h1 className='d-flex justify-content-center mt-4'>Book Description</h1>
      <div className='container'>
        <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-8 shadow rounded mt-5 d-flex justify-content-center'><p>{description || 'No description available.'}</p></div>
            <div className='col-md-2'></div>
        </div>
      </div>
      
    </div>
  );
}

export default BookDescription;
