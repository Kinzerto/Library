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
const form = document.querySelector("dialog > form");

// PREVENT FORM RELOAD
form.addEventListener("submit", function (e) {
    e.preventDefault(); // stops page from reloading
    console.log("Form prevented!");
});

addBookToLibrary(new Book('dded', 'dede', 222))

// DIALOG
const openModal = document.querySelector('header  .open-modal');
const dialog = document.querySelector(".dialog");
const closeButton = document.querySelector("dialog > .close");


openModal.addEventListener("click", () => {
    dialog.showModal();
});
closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    dialog.close();
});

// closeButton.innerHTML = "dkdkd";
const submit = document.querySelector(".dialog form .submit");

const libraryBook = document.querySelector('dialog #book-name');
const libraryAuthor = document.querySelector('dialog #author');
const libraryPage = document.querySelector('dialog #page')

submit.addEventListener('click', () => {


    if (libraryBook.value === '' || libraryAuthor.value === '' || isNaN(libraryPage.value) || libraryPage.value <= 0) {
    } else {
        const newBook = new Book(libraryBook.value, libraryAuthor.value, libraryPage.value);
        addBookToLibrary(newBook);
        displayBooks();
        libraryBook.value = "";
        libraryAuthor.value = "";
        libraryPage.value = "";
        dialog.close();
    }
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