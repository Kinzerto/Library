const myLibrary = [];

function Book(book, author, page) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.bookName = book;
    this.author = author;
    this.page = page;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}


addBookToLibrary(new Book('dded', 'dede', 222))

// DIALOG
const openModal = document.querySelector('header  .open-modal');
const dialog = document.querySelector(".dialog");
const closeButton = document.querySelector("dialog button");


openModal.addEventListener("click", () => {
    dialog.showModal();
});

const submit = document.querySelector(".dialog button");

const libraryBook = document.querySelector('dialog #book-name');
const libraryAuthor = document.querySelector('dialog #author');
const libraryPage = document.querySelector('dialog #page');

const output = document.querySelector('output')
submit.addEventListener('click', () => {
    addBookToLibrary(new Book(libraryBook.value, libraryAuthor.value, libraryPage.value));
    displayBooks()

})

//DISPLAY BOOKS
const main = document.querySelector('main');

function displayBooks() {
    main.textContent = ""; 
    myLibrary.forEach((books) => {
        const cardContainer = document.createElement("div");
        main.appendChild(cardContainer);
        cardContainer.classList.add("card");

        //CONTENT
        const bookName = document.createElement('h2');
        const author = document.createElement('div');
        const page = document.createElement('div');

        cardContainer.appendChild(bookName);
        cardContainer.appendChild(author);
        cardContainer.appendChild(page);

        author.classList.add('author');
        page.classList.add('pages');

        // DOM
        bookName.textContent = books.bookName;
        author.textContent = books.author;
        page.textContent = books.page;
    })
}


displayBooks()