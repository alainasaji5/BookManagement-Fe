import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { bookDetailsById } from '../../services/allApi';

function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(''); // State to store modal content
  const reqHeader = { 'Content-Type': 'application/json' };

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await bookDetailsById(id, reqHeader);
        if (response && response.data) {
          setBook(response.data);
        } else {
          setError('No data in the response');
        }
      } catch (error) {
        setError('Error fetching book details');
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!book) return <div>No book found</div>;

  const openModal = (content) => {
    setModalContent(content); // Set content for the modal
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent('');
  };

  return (
    <div className="container mt-4 mb-3">
       <Link to="/"style={{textDecoration:"none"}}>
    <span style={{ textTransform: 'none' }}>
        <i className="fa-solid fa-arrow-left me-2"></i>
        <span className="text-primary">Back to Booklist</span>
    </span>
</Link>
      <div className="row d-flex justify-content-center">
        <div className="col-md-1"></div>
        <div className="col-md-4 shadow rounded me-3 d-flex justify-content-center">
          <img
            className="mt-4 mb-4"
            src={book.coverImage}
            width="250px"
            height="250px"
            alt={book.title}
          />
        </div>
        <div className="col-md-4 shadow rounded">
          <h1 className='mt-4 d-flex justify-content-center'>{book.title}</h1>
          <p >Author: <span className='text-success ms-1'>{book.author}</span>  </p>
          <p>Genre:<span className='text-success ms-1'>{book.genre}</span></p>
          <p>Published date:<span className='text-success ms-1'>{book.publicationDate}</span></p>
          <p>ISBN:<span className='text-success ms-1'>{book.isbn}</span></p>

          <div className="d-flex justify-content-center mb-5">
            <button
              className="btn btn-primary"
              onClick={() => openModal('description')}
            >
              Description
            </button>
            <button
              className="btn btn-success ms-3"
              onClick={() => openModal('review')}
            >
              Review
            </button>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">
                  {modalContent === 'description'
                    ? 'Description'
                    : 'Review'}
                </h1>
              </div>
              <div className="modal-body">
                <p>
                  {modalContent === 'description'
                    ? book.description || 'Description not available'
                    : book.reviews || 'Review not available'}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookDetails;
