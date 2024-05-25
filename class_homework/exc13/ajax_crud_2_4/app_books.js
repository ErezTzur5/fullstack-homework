document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = 'http://localhost:8001';
    const booksUrl = `${apiUrl}/books`;

    const booksTableBody = document.querySelector('#booksTable tbody');
    const createBookForm = document.getElementById('createBookForm');
    const createBookNameInput = document.getElementById('createBookName');
    const createBookAuthorInput = document.getElementById('createBookAuthor');
    const createBookPagesInput = document.getElementById('createBookPages');
    const deleteBookForm = document.getElementById('deleteBookForm');
    const deleteBookIdInput = document.getElementById('deleteBookId');
    const updateBookForm = document.getElementById('updateBookForm');
    const updateBookIdInput = document.getElementById('updateBookId');
    const updateBookNameInput = document.getElementById('updateBookName');
    const updateBookAuthorInput = document.getElementById('updateBookAuthor');
    const updateBookPagesInput = document.getElementById('updateBookPages');
    const prevPageButton = document.getElementById('prevPage');
    const nextPageButton = document.getElementById('nextPage');
    const pageNumberDisplay = document.getElementById('pageNumber');
    const limit = 50;
    let startIndex = 0;
    let currentPage = 1;
    let booksData = []; // Store books data globally

    const fetchBooks = async (page) => {
        try {
            const response = await fetch(`${booksUrl}?_page=${page}&_limit=${limit}`);
            const books = await response.json();
            booksData = books; // Update books data globally
            displayBooks(books);
            updatePaginationButtons(page, books.length);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const displayBooks = (books) => {
        booksTableBody.innerHTML = '';
        books.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.numPages}</td>
            `;
            booksTableBody.appendChild(row);
        });
    };

    const createBook = async (event) => {
        event.preventDefault();
        const newBook = {
            name: createBookNameInput.value,
            author: createBookAuthorInput.value,
            numPages: parseInt(createBookPagesInput.value),
            id: generateId() // Generate a unique ID for the new book
        };

        try {
            await fetch(booksUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });
            createBookForm.reset();
            fetchBooks(currentPage);
        } catch (error) {
            console.error('Error creating book:', error);
        }
    };

    const deleteBook = async (event) => {
        event.preventDefault();
        const bookId = deleteBookIdInput.value;

        try {
            await fetch(`${booksUrl}/${bookId}`, {
                method: 'DELETE',
            });
            deleteBookForm.reset();
            fetchBooks(currentPage);
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const updateBook = async (event) => {
        event.preventDefault();
        const updatedBook = {
            name: updateBookNameInput.value,
            author: updateBookAuthorInput.value,
            numPages: parseInt(updateBookPagesInput.value)
        };

        try {
            await fetch(`${booksUrl}/${updateBookIdInput.value}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBook),
            });
            updateBookForm.reset();
            fetchBooks(currentPage);
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    const updatePaginationButtons = (page, fetchedBooksCount) => {
        currentPage = page;
        pageNumberDisplay.textContent = `Page ${page}`;
        prevPageButton.disabled = page === 1;
        nextPageButton.disabled = fetchedBooksCount < limit;
    };

    const generateId = () => {
        // Generate a random ID (not guaranteed to be unique, but good enough for this example)
        return Math.random().toString(36).substr(2, 9);
    };

    createBookForm.addEventListener('submit', createBook);
    deleteBookForm.addEventListener('submit', deleteBook);
    updateBookForm.addEventListener('submit', updateBook);

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            fetchBooks(currentPage - 1);
        }
    });
    
    nextPageButton.addEventListener('click', () => {
        fetchBooks(currentPage + 1);
    });

    // Initial fetch to populate the table
    fetchBooks(currentPage);
});
