import './index.html';
import './index.scss';

const addBookBtn = document.querySelector('#addBookBtn');
const gridContainer = document.querySelector('.books-grid');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const editForm = document.querySelector('.edit-form');
const addForm = document.querySelector('.add-form');
const inputAddValues = document.querySelectorAll('.input-add');
const inputEditValues = document.querySelectorAll('.input-edit');

addBookBtn.addEventListener('click', showAddModal);
addForm.addEventListener('submit', (e) => submitForm(e));
editForm.addEventListener('submit', (e) => submitForm(e));
overlay.addEventListener('click', hideModal);
window.addEventListener('load', createAllBookCards);
inputAddValues.forEach((input) => input.addEventListener('focus', (e) => focusCheck(e)));
inputEditValues.forEach((input) => input.addEventListener('focus', (e) => focusCheck(e)));
inputAddValues.forEach((input) => input.addEventListener('blur', (e) => blurCheck(e)));
inputEditValues.forEach((input) => input.addEventListener('blur', (e) => blurCheck(e)));

let myLibrary = [];
let currentBook;

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

function blurCheck(e) {
  let input = e.target;
  if (input.value == '') {
    input.classList.add('invalid');
    if (input.nextElementSibling.tagName !== 'P') {
      createError(input, `Empty ${input.name} field`);
    }
  }
}

function focusCheck(e) {
  let input = e.target;
  if (input.classList.contains('invalid')) {
    input.classList.remove('invalid');
    input.nextSibling.remove();
  }
}

function validation(form) {
  let result = true;

  if (form.classList.contains('add-form')) {
    inputAddValues.forEach((input) => {
      if (input.value == '') {
        if (input.nextElementSibling.tagName !== 'P') {
          createError(input, `Empty ${input.name} field`);
        }
        result = false;
      }
    });
  }

  if (form.classList.contains('edit-form')) {
    inputAddValues.forEach((input) => {
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

function submitForm(e) {
  e.preventDefault();

  if (validation(e.target) == true) {
    if (e.target.classList.contains('add-form')) {
      addNewBook();
    } else if (e.target.classList.contains('edit-form')) {
      editBook();
    }

    removeErrors();
  }
}

function Book([title, author, pages, read]) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
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

function createBookObject() {
  const arr = [];
  inputAddValues.forEach((elem) => arr.push(elem.value));
  const newBook = new Book(arr);
  myLibrary.push(newBook);
  localStorage.setItem('library', JSON.stringify(myLibrary));
  createNewBookCard(newBook);
}

function createNewBookCard(book) {
  const arr = [];
  inputAddValues.forEach((elem) => arr.push(elem.value));
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
  gridContainer.appendChild(gridElement);
}

function addNewBook() {
  createBookObject();
  hideModal();
}

function editBook() {
  let book = myLibrary.find((book) => book.title == currentBook);
  const arr = [];
  inputEditValues.forEach((elem) => arr.push(elem.value));
  let [title, author, pages, read] = arr;
  book.title = title;
  book.author = author;
  book.pages = pages;
  book.read = read;
  hideModal();
  clearLibrary();
  localStorage.setItem('library', JSON.stringify(myLibrary));
  createAllBookCards();
}

function removeBook(e) {
  myLibrary = myLibrary.filter(
    (book) => book.title !== e.target.parentNode.querySelector('.title').textContent,
  );

  localStorage.setItem('library', JSON.stringify(myLibrary));
  gridContainer.removeChild(e.target.parentNode);
}

function showAddModal() {
  modal.classList.add('opened');
  overlay.classList.add('opened');
  addForm.classList.remove('hide');
}

function showEditModal(e) {
  modal.classList.add('opened');
  overlay.classList.add('opened');

  editForm.classList.remove('hide');

  const editTitle = document.querySelector('#editBookTitle');
  const editAuthor = document.querySelector('#editBookAuthor');
  const editPages = document.querySelector('#editBookPages');
  const editState = document.querySelector('#editBookState');

  editTitle.value = e.target.parentNode.querySelector('.title').textContent;
  editAuthor.value = e.target.parentNode.querySelector('.author').textContent;
  editPages.value = e.target.parentNode.querySelector('.pages').textContent;
  editState.value = e.target.parentNode.querySelector('.read').textContent;

  currentBook = e.target.parentNode.querySelector('.title').textContent;
}

function hideModal() {
  modal.classList.remove('opened');
  overlay.classList.remove('opened');

  resetInputs();
  removeErrors();

  if (!addForm.classList.contains('hide')) {
    addForm.classList.add('hide');
  }

  if (!editForm.classList.contains('hide')) {
    editForm.classList.add('hide');
  }
}

function resetInputs() {
  inputAddValues.forEach((elem) => {
    if (elem.classList.contains('form-state')) {
      elem.value = 'Not read';
    } else elem.value = '';
  });
}

function clearLibrary() {
  while (gridContainer.firstChild) {
    gridContainer.removeChild(gridContainer.firstChild);
  }
}

function createAllBookCards() {
  let storageLibrary = localStorage.getItem('library');

  if (storageLibrary === null) {
    return;
  }

  myLibrary = JSON.parse(storageLibrary);

  for (let book of myLibrary) {
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
    gridContainer.appendChild(gridElement);
  }
}
