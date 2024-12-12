import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProductApi } from '../../services/allApi';

const BookForm = () => {
    const [productDetails, setProductDetails] = useState({
        title: "",
        author: "",
        publicationDate: "",
        isbn: "",
        genre: "",
        rating: "",
        coverImage: "",
        description: "",
        reviews: "" // Add reviews as a string field
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { title, author, publicationDate, isbn, genre, rating, coverImage, description, reviews } = productDetails;

        // Convert rating to a number and validate
        const numericRating = Number(rating);
        if (isNaN(numericRating) || numericRating < 1 || numericRating > 5) {
            toast.error("Rating must be a number between 1 and 5!");
            return;
        }

        if (!title || !author || !publicationDate || !isbn || !genre || !coverImage || !description) {
            toast.error("Please fill in all required fields!");
            return;
        }

        const formData = {
            title,
            author,
            publicationDate,
            isbn,
            genre,
            rating: numericRating,
            coverImage,
            description,
            reviews, // Add reviews to the form data
        };

        setLoading(true);

        try {
            const response = await addProductApi(formData, null);
            console.log("API Response:", response);

            if (response && response.data) {
                toast.success("Book added successfully!");
                setProductDetails({
                    title: "",
                    author: "",
                    publicationDate: "",
                    isbn: "",
                    genre: "",
                    rating: "",
                    coverImage: "",
                    description: "",
                    reviews: "", // Reset reviews input field
                });
            } else {
                toast.error("Failed to add book. Please try again.");
            }
        } catch (error) {
            console.error("Error adding book:", error);
            if (error.response) {
                toast.error(`Error: ${error.response.data.message || "Failed to add book. Please try again."}`);
            } else {
                toast.error("Network error or server is down. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <h2 className="text-center mb-4">Add a Book</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label>Title</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                value={productDetails.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Author</label>
                            <input
                                type="text"
                                name="author"
                                className="form-control"
                                value={productDetails.author}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Publication Date</label>
                            <input
                                type="date"
                                name="publicationDate"
                                className="form-control"
                                value={productDetails.publicationDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>ISBN</label>
                            <input
                                type="text"
                                name="isbn"
                                className="form-control"
                                value={productDetails.isbn}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Genre</label>
                            <select
                                name="genre"
                                className="form-control"
                                value={productDetails.genre}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Genre</option>
                                <option>Fiction</option>
                                <option>Non-Fiction</option>
                                <option>Mystery</option>
                                <option>Fantasy</option>
                                <option>Romance</option>
                                <option>Sci-Fi</option>
                            </select>
                        </div>
                        <div className="form-group mb-3">
                            <label>Rating</label>
                            <input
                                type="number"
                                name="rating"
                                className="form-control"
                                min="1"
                                max="5"
                                value={productDetails.rating}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Cover Image (Image URL)</label>
                            <input
                                type="text"
                                name="coverImage"
                                placeholder='Add URL of your image'
                                className="form-control"
                                value={productDetails.coverImage}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label>Description</label>
                            <textarea
                                name="description"
                                className="form-control"
                                rows="5"
                                value={productDetails.description}
                                onChange={handleChange}
                                placeholder="Write a brief description of the book"
                                required
                            ></textarea>
                        </div>
                        <div className="form-group mb-3">
                            <label>Review</label>
                            <textarea
                                name="reviews"
                                className="form-control"
                                rows="3"
                                value={productDetails.reviews}
                                onChange={handleChange}
                                placeholder="Write a review for the book"
                            ></textarea>
                        </div>
                        
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                                {loading ? <span>Submitting...</span> : "Add Book"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookForm;
