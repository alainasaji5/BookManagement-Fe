import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteProjectApi, getAllProduct } from '../../services/allApi';
import { toast } from 'react-toastify';

function BookHome() {
    const [allBooks, setAllBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [hoveredBookId, setHoveredBookId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1); // Track the current page
    const booksPerPage = 10; // Number of books per page

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const result = await getAllProduct();
                if (result.data) {
                    setAllBooks(result.data);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (bookId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (confirmDelete) {
            try {
                await deleteProjectApi(bookId);
                setAllBooks(allBooks.filter(book => book.id !== bookId));
                toast.success('Book deleted successfully');
            } catch (error) {
                console.error('Error deleting book:', error);
                toast('Failed to delete book');
            }
        }
    };

    const linkStyle = (bookId) => ({
        textDecoration: 'none',
        color: hoveredBookId === bookId ? 'blue' : 'black',
    });

    // Calculate total pages and the books to display for the current page
    const totalPages = Math.ceil(allBooks.length / booksPerPage);
    const startIndex = (currentPage - 1) * booksPerPage;
    const currentBooks = allBooks.slice(startIndex, startIndex + booksPerPage);

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <table className="table table-striped table-hover shadow rounded">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Title</th>
                                        <th>Image</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentBooks.length > 0 ? (
                                        currentBooks.map((book, index) => (
                                            <tr key={book.id}>
                                                <td>{startIndex + index + 1}</td>
                                                <td>
                                                    <Link
                                                        to={{
                                                            pathname: `/details/${book.id}`,
                                                            state: { bookDetails: book },
                                                        }}
                                                        style={linkStyle(book.id)}
                                                        onMouseOver={() => setHoveredBookId(book.id)}
                                                        onMouseOut={() => setHoveredBookId(null)}
                                                    >
                                                        {book.title}
                                                    </Link>
                                                </td>
                                                <td>
                                                    <img
                                                        src={book.coverImage || "https://via.placeholder.com/250"}
                                                        alt={book.title}
                                                        height="100"
                                                        width="100"
                                                        style={{ objectFit: "cover" }}
                                                    />
                                                </td>
                                                <td>
                                                   
                                                    <button
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleDelete(book.id)}
                                                    >
                                                       <i class="fa-solid fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" className="text-center">
                                                No books available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}

                        {/* Pagination */}
                        <nav aria-label="Page navigation" className="mt-3">
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    >
                                        Previous
                                    </button>
                                </li>
                                {[...Array(totalPages).keys()].map((page) => (
                                    <li
                                        key={page + 1}
                                        className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}
                                    >
                                        <button
                                            className="page-link"
                                            onClick={() => setCurrentPage(page + 1)}
                                        >
                                            {page + 1}
                                        </button>
                                    </li>
                                ))}
                                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                    <button
                                        className="page-link"
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        </>
    );
}

export default BookHome;
