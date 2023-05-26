import './index.html';
import './index.scss';

const addBookBtn = document.querySelector('#addBookBtn');
const submitBookBtn = document.querySelector('#submitBookBtn');
const editBookBtn = document.querySelector('#editBookBtn');
const gridContainer = document.querySelector('.books-grid');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const editForm = document.querySelector('.edit-form');
const addForm = document.querySelector('.add-form');
const inputAddValues = document.querySelectorAll('.input-add');
const inputEditValues = document.querySelectorAll('.input-edit');

addBookBtn.addEventListener('click', showModal);
editBookBtn.addEventListener('click', editBook);
submitBookBtn.addEventListener('click', addNewBook);
overlay.addEventListener('click', hideModal);
window.addEventListener('load', createAllBookCards);

let myLibrary = [];
let currentBook;

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
  resetInputs();
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

function showModal() {
  modal.classList.add('opened');
  overlay.classList.add('opened');
}

function showEditModal(e) {
  modal.classList.add('opened');
  overlay.classList.add('opened');
  addForm.classList.add('hide');
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

  if (!editForm.classList.contains('hide')) {
    editForm.classList.add('hide');
    addForm.classList.remove('hide');
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
