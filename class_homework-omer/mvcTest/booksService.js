import { storageService } from "./async-storage.service.js";
import { DUMMY_BOOKS } from "./constants.js";

const STORAGE_KEY = "bookDB";
let gBooks = [];

function getLocalBooks() {
  return gBooks;
}

async function getBooks() {
  const books = await storageService.get(STORAGE_KEY);
  if (books.length === 0)
    await storageService.postMany(STORAGE_KEY, DUMMY_BOOKS);
  gBooks = books;
  return books;
}
async function deleteBook(bookId) {
  await storageService.remove(STORAGE_KEY, bookId);
  gBooks = gBooks.filter((book) => {
    return book._id !== bookId;
  });
}
async function addBook(newBook) {
  await storageService.add(STORAGE_KEY, newBook);
  gBooks.push(newBook);
}

export const bookService = {
  getLocalBooks,
  getBooks,
  deleteBook,
  addBook,
};
