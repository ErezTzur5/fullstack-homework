import { bookService } from "./booksService.js";

window.onload = onInit;

function onInit() {
  window.onDeleteBook = onDeleteBook;
  onGetBooks();
}

function renderBooks() {
  const booksToRender = bookService.getLocalBooks();
  const bookList = document.querySelector("#bookList");

  const strHtml = booksToRender.map((book) => {
    return `
    <li>
    <p>${book.title}</p>
    <button onclick = "onDeleteBook('${book._id}')">delete</button>
    </li>
    `;
  });
  bookList.innerHTML = strHtml.join("");
}

async function onGetBooks() {
  await bookService.getBooks();
  renderBooks();
}

async function onDeleteBook(bookId) {
  await bookService.deleteBook(bookId);
  renderBooks();
}
