const Library = (function() {
  const myLibrary = [];

  const library = document.querySelector('.library');
  const bookForm = library.querySelector('#book-form');
  const booksUl = library.querySelector('.books');
  const template = library.querySelector('#template').innerHTML;

  const bookTitle = bookForm.querySelector('#bookTitle');
  const bookAuthor = bookForm.querySelector('#bookAuthor');
  const bookPages = bookForm.querySelector('#bookPages');
  const bookIsRead = bookForm.querySelector('#bookIsRead');

  bookForm.addEventListener('submit', addBook);
  booksUl.addEventListener('click', removeBook);
  booksUl.addEventListener('change', handleIsReadChange);

  render();

  function handleIsReadChange(e) {
    if (e.target.id.startsWith('read-')) {
      const targetIndex = e.target.parentElement.dataset.book;
      const targetBook = myLibrary[targetIndex];

      targetBook.isRead = !targetBook.isRead;
      e.target.checked = targetBook.isRead;
    }
  }
  function addBook(e) {
    e.preventDefault();
    const book = {
      title: bookTitle.value,
      author: bookAuthor.value,
      pages: bookPages.value,
      isRead: bookIsRead.checked,
      id: myLibrary.length || 0,
      changeIsRead() {
        this.isRead = !this.isRead;
      },
    };

    myLibrary.push(book);
    bookForm.reset();

    render();
  }

  function removeBook(e) {
    if (e.target.nodeName === 'I') {
      const targetList = e.target.parentElement;
      const targetIndex = targetList.dataset.book;

      myLibrary.splice(targetIndex, 1);
      render();
    }
  }

  function render() {
    const compiledTemplate = Handlebars.compile(template);
    booksUl.innerHTML = compiledTemplate({ books: myLibrary });
  }
  return {
    myLibrary,
  };
}());

const Modal = (function() {
  const openModal = document.querySelector('.add-book');
  const closeModal = document.querySelector('.close');

  openModal.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'block';
  });

  closeModal.addEventListener('click', () => {
    const modal = document.querySelector('.modal');
    modal.style.display = 'none';
  });
}());
