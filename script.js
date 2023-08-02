/* eslint-disable space-before-function-paren */
/* eslint-disable func-names */
const myLibrary = [];

const booksList = document.querySelector('.books');
const formSubmit = document.querySelector('#book-form');

const openModal = document.querySelector('.add-book');
const closeModal = document.querySelector('.close');

function saveBooksToLocal() {
  localStorage.setItem('books', JSON.stringify(myLibrary));
}

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.readIt = function (e) {
  const bookIndex = e.target.parentElement.getAttribute('data-book').split('-')[1];
  const book = myLibrary[bookIndex];

  book.isRead = !book.isRead;

  saveBooksToLocal();
};

function createBook(book, index) {
  const bookList = document.createElement('li');
  bookList.setAttribute('data-book', `book-${index}`);

  const bookTitle = document.createElement('h2');
  const bookAuthor = document.createElement('p');
  const bookPages = document.createElement('p');
  const bookIsReadLabel = document.createElement('label');
  const bookReadSpan = document.createElement('span');
  const bookNotReadSpan = document.createElement('span');
  const bookRemoveBtn = document.createElement('button');

  const bookIsReadInput = document.createElement('input');
  bookIsReadInput.type = 'checkbox';
  bookIsReadInput.id = `isRead-${index}`;
  bookIsReadInput.addEventListener('change', (e) => book.readIt(e));

  bookReadSpan.textContent = 'Read';
  bookReadSpan.className = 'read';
  bookNotReadSpan.textContent = 'Not Read';
  bookNotReadSpan.className = 'not-read';
  bookIsReadLabel.setAttribute('for', `isRead-${index}`);

  bookRemoveBtn.className = 'btn remove-btn';

  bookList.className = 'book-item';
  bookTitle.className = 'book-title';
  bookAuthor.className = 'book-author';
  bookPages.className = 'book-pages';
  bookIsReadLabel.classList.add('btn', 'read-btn');

  bookTitle.textContent = book.title;
  bookAuthor.textContent = `By ${book.author}`;
  bookPages.textContent = `${book.pages} page`;
  bookIsReadInput.checked = book.isRead;
  bookRemoveBtn.textContent = 'Remove';
  bookRemoveBtn.setAttribute('data-book', index);
  bookRemoveBtn.addEventListener('click', (e) => {
    const targetBook = e.target.parentElement;
    const bookIndex = targetBook.getAttribute('data-book').split('-')[1];
    targetBook.remove();
    myLibrary.splice(bookIndex, 1);

    saveBooksToLocal();
  });

  bookList.appendChild(bookTitle);
  bookList.appendChild(bookAuthor);
  bookList.appendChild(bookPages);
  bookList.appendChild(bookIsReadInput);
  bookIsReadLabel.appendChild(bookReadSpan);
  bookIsReadLabel.appendChild(bookNotReadSpan);
  bookList.appendChild(bookIsReadLabel);
  bookList.appendChild(bookRemoveBtn);

  booksList.appendChild(bookList);
}

function addBookToLibrary(e) {
  e.preventDefault();

  const bookTitle = document.querySelector('[name="title"]').value;
  const bookAuthor = document.querySelector('[name="author"]').value;
  const bookPages = document.querySelector('[name="pages"]').value;
  const bookIsRead = document.querySelector('[name="is-read"]').checked;

  const newBook = new Book(bookTitle, bookAuthor, parseInt(bookPages, 10), bookIsRead);

  const libLength = myLibrary.push(newBook);

  createBook(newBook, libLength - 1);

  e.target.reset();

  saveBooksToLocal();
}

openModal.addEventListener('click', () => {
  const modal = document.querySelector('.modal');
  modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  const modal = document.querySelector('.modal');
  modal.style.display = 'none';
});

formSubmit.addEventListener('submit', (e) => addBookToLibrary(e));

document.addEventListener('DOMContentLoaded', () => {
  const existingBooks = JSON.parse(localStorage.getItem('books'));
  const books = existingBooks || [];

  books.forEach((book, index) => {
    const newBook = new Book(book.title, book.author, book.pages, book.isRead);
    myLibrary.push(newBook);

    createBook(newBook, index);
  });
});
