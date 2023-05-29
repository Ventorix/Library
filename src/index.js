import './index.html';
import './index.scss';

const libraryGrid = document.querySelector('.books-grid');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const addForm = document.querySelector('.add-form');
const editForm = document.querySelector('.edit-form');

const inputAddValues = document.querySelectorAll('.input-add');
const inputEditValues = document.querySelectorAll('.input-edit');

const addBookBtn = document.getElementById('addBookBtn');
const addTitle = document.getElementById('addBookTitle');
const addAuthor = document.getElementById('addBookAuthor');
const addPages = document.getElementById('addBookPages');
const addRead = document.getElementById('addBookRead');

const editTitle = document.getElementById('editBookTitle');
const editAuthor = document.getElementById('editBookAuthor');
const editPages = document.getElementById('editBookPages');
const editRead = document.getElementById('editBookRead');

window.addEventListener('load', createStorageBookCards);
addBookBtn.addEventListener('click', showAddModal);
addForm.addEventListener('submit', (e) => submitForm(e));
editForm.addEventListener('submit', (e) => submitForm(e));
overlay.addEventListener('click', hideModal);

inputAddValues.forEach((input) => input.addEventListener('focus', (e) => focusCheck(e)));
inputEditValues.forEach((input) => input.addEventListener('focus', (e) => focusCheck(e)));
inputAddValues.forEach((input) => input.addEventListener('blur', (e) => blurCheck(e)));
inputEditValues.forEach((input) => input.addEventListener('blur', (e) => blurCheck(e)));

let myLibrary = [];
let currentBookTitle;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Create book

const getBookFromInput = () => {
  const title = addTitle.value;
  const author = addAuthor.value;
  const pages = addPages.value;
  const read = addRead.value;
  return new Book(title, author, pages, read);
};

function createBookObject() {
  const newBook = getBookFromInput();
  myLibrary.push(newBook);
  saveLibraryInStorage();
  createBookCard(newBook);
}

function createRemoveBtn() {
  const removeBtn = document.createElement('button');
  removeBtn.addEventListener('click', (e) => removeBook(e));
  removeBtn.classList.add('btn');
  removeBtn.classList.add('btn-remove');
  removeBtn.textContent = 'Remove';
  return removeBtn;
}

function createEditBtn() {
  const editBtn = document.createElement('button');
  editBtn.addEventListener('click', (e) => showEditModal(e));
  editBtn.classList.add('btn');
  editBtn.classList.add('btn-edit');
  editBtn.textContent = 'Edit';
  return editBtn;
}

function createBookCard(book) {
  const gridElement = document.createElement('div');

  const title = document.createElement('p');
  const author = document.createElement('p');
  const pages = document.createElement('p');
  const read = document.createElement('p');

  title.classList.add('title');
  author.classList.add('author');
  pages.classList.add('pages');
  read.classList.add('read');

  title.textContent = book.title;
  author.textContent = book.author;
  pages.textContent = book.pages;
  read.textContent = book.read;

  gridElement.classList.add('book-card');
  gridElement.appendChild(title);
  gridElement.appendChild(author);
  gridElement.appendChild(pages);
  gridElement.appendChild(read);
  gridElement.appendChild(createEditBtn());
  gridElement.appendChild(createRemoveBtn());
  libraryGrid.appendChild(gridElement);
}

// Book actions

function addNewBook() {
  createBookObject();
  hideModal();
}

function editBook() {
  let book = myLibrary.find((book) => book.title === currentBookTitle);

  book.title = editTitle.value;
  book.author = editAuthor.value;
  book.pages = editPages.value;
  book.read = editRead.value;
  hideModal();
  saveLibraryInStorage();
  updateLibrarysGrid();
}

function removeBook(e) {
  myLibrary = myLibrary.filter(
    (book) => book.title !== e.target.parentNode.querySelector('.title').textContent,
  );

  saveLibraryInStorage();
  updateLibrarysGrid();
}

// Form modals

function showAddModal() {
  addForm.reset();
  modal.classList.add('opened');
  overlay.classList.add('opened');
  addForm.classList.remove('hide');
}

function showEditModal(e) {
  let editCard = e.target.parentNode;
  modal.classList.add('opened');
  overlay.classList.add('opened');

  editForm.classList.remove('hide');

  editTitle.value = editCard.querySelector('.title').textContent;
  editAuthor.value = editCard.querySelector('.author').textContent;
  editPages.value = editCard.querySelector('.pages').textContent;
  editRead.value = editCard.querySelector('.read').textContent;

  currentBookTitle = editCard.querySelector('.title').textContent;
}

function hideModal() {
  modal.classList.remove('opened');
  overlay.classList.remove('opened');

  removeErrors();

  if (!addForm.classList.contains('hide')) {
    addForm.classList.add('hide');
  }

  if (!editForm.classList.contains('hide')) {
    editForm.classList.add('hide');
  }
}

// Error check

function focusCheck(e) {
  let input = e.target;
  let nextElementTag = input.nextElementSibling.tagName;

  if (nextElementTag === 'P') {
    input.nextSibling.remove();
  }

  if (input.classList.contains('invalid')) {
    input.classList.remove('invalid');
  }
}

function blurCheck(e) {
  let input = e.target;
  let nextElementTag = input.nextElementSibling.tagName;

  if (input.value == '') {
    input.classList.add('invalid');
    if (nextElementTag !== 'P') {
      createError(input, `Empty ${input.name} field`);
    }
  }
}

function submitForm(e) {
  e.preventDefault();

  if (validation(e.target)) {
    if (e.target.classList.contains('add-form')) {
      addNewBook();
    } else if (e.target.classList.contains('edit-form')) {
      editBook();
    }

    removeErrors();
  }
}

function validation(form) {
  let result = true;

  if (form.classList.contains('add-form')) {
    if (myLibrary.find((book) => book.title === addTitle.value)) {
      if (addTitle.nextElementSibling.tagName !== 'P') {
        addTitle.classList.add('invalid');
        createError(addTitle, `You already have this book in your library`);
      }
      result = false;
    }

    inputAddValues.forEach((input) => {
      if (input.value == '') {
        if (input.nextElementSibling.tagName !== 'P') {
          input.classList.add('invalid');
          createError(input, `Empty ${input.name} field`);
        }
        result = false;
      }
    });
  }

  if (form.classList.contains('edit-form')) {
    inputEditValues.forEach((input) => {
      if (input.value == '') {
        if (input.nextElementSibling.tagName !== 'P') {
          createError(input, `Empty ${input.name} field`);
        }
        result = false;
      }
    });
  }

  return result;
}

function createError(input, text) {
  let errorElement = document.createElement('p');
  errorElement.classList.add('error-message');
  errorElement.textContent = text;
  input.after(errorElement);
}

function removeErrors() {
  let errors = document.querySelectorAll('.error-message');

  inputAddValues.forEach((input) => {
    if (input.classList.contains('invalid')) {
      input.classList.remove('invalid');
    }
  });

  inputEditValues.forEach((input) => {
    if (input.classList.contains('invalid')) {
      input.classList.remove('invalid');
    }
  });

  errors.forEach((elem) => elem.remove());
}

// Update Grid

function updateLibrarysGrid() {
  resetLibraryGrid();

  for (let book of myLibrary) {
    createBookCard(book);
  }
}

function resetLibraryGrid() {
  libraryGrid.innerHTML = '';
}

// Local Storage

function createStorageBookCards() {
  let storageLibrary = localStorage.getItem('library');

  if (storageLibrary) {
    myLibrary = JSON.parse(storageLibrary);

    for (let book of myLibrary) {
      createBookCard(book);
    }
  }
}

function saveLibraryInStorage() {
  localStorage.setItem('library', JSON.stringify(myLibrary));
}
