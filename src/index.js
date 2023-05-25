import './index.html';
import './index.scss';

const addBookBtn = document.querySelector('#addBookBtn');
const submitBookBtn = document.querySelector('#submitBookBtn');
const gridContainer = document.querySelector('.books-grid');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const inputValues = document.querySelectorAll('.input');

addBookBtn.addEventListener('click', showModal);
submitBookBtn.addEventListener('click', addNewBook);
overlay.addEventListener('click', hideModal);

let myLibrary = [];

function Book([title, autor, pages, read]) {
  this.title = title;
  this.autor = autor;
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

function createBookInfo(value) {
  let bookInfo = document.createElement('p');
  bookInfo.textContent = `${value}`;
  return bookInfo;
}

function createBookObject() {
  const arr = [];
  inputValues.forEach((elem) => arr.push(elem.value));
  const newBook = new Book(arr);
  myLibrary.push(newBook);
}

function createAllBookCards() {
  for (let elem of myLibrary) {
    const gridElement = document.createElement('div');

    for (let value of Object.values(elem)) {
      gridElement.appendChild(createBookInfo(value));
    }

    gridElement.classList.add('book-card');
    gridElement.appendChild(createRemoveBtn());
    gridContainer.appendChild(gridElement);
  }
}

function createNewBookCard() {
  const arr = [];
  inputValues.forEach((elem) => arr.push(elem.value));
  const gridElement = document.createElement('div');

  for (let value of arr) {
    gridElement.appendChild(createBookInfo(value));
  }

  gridElement.classList.add('book-card');
  gridElement.appendChild(createRemoveBtn());
  gridContainer.appendChild(gridElement);
}

function addNewBook() {
  createBookObject();
  createNewBookCard();
  hideModal();
  resetInputs();
}

function removeBook(e) {
  gridContainer.removeChild(e.target.parentNode);
}

function showModal() {
  modal.classList.add('opened');
  overlay.classList.add('opened');
}

function resetInputs() {
  inputValues.forEach((elem) => {
    if (elem.classList.contains('form-state')) {
      elem.value = 'Not read';
    } else elem.value = '';
  });
}

function hideModal() {
  modal.classList.remove('opened');
  overlay.classList.remove('opened');
}
