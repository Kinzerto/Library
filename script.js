class Library {
    static #myLibrary = [];

    static getLibrary() {
        return this.#myLibrary;
    }

    static addBook(book) {
        Library.#myLibrary.push(book);
    }
}

class Book extends Library {
    constructor(book, author, page, status = 'Not Read') {
        super();
        this.id = crypto.randomUUID();
        this.bookName = book;
        this.author = author;
        this.page = page;
        this.status = status;

        Library.addBook(this)
    }

    static getBook() {
        return Library.getLibrary()
    }
    toggleStatus (status) {
        this.status = this.status === 'Read' ? 'Not Read' : 'Read';
    }
}

const myLibrary = Book.getBook();

// function addBookToLibrary(book) {
//     myLibrary.push(book);
// }
const form = document.querySelector("dialog > form");

// PREVENT FORM RELOAD
form.addEventListener("submit", function (e) {
    e.preventDefault(); // stops page from reloading
    console.log("Form prevented!");
});

const first = new Book('One Piece', 'Eiichiro Oda', 1000, 'Read');
// addBookToLibrary(first)


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

const submit = document.querySelector(".dialog form .submit");

const libraryBook = document.querySelector('dialog #book-name');
const libraryAuthor = document.querySelector('dialog #author');
const libraryPage = document.querySelector('dialog #page');
const readOrNOt = document.querySelector('dialog #readOrNot');

submit.addEventListener('click', (e) => {
    e.preventDefault();
    if (!libraryBook.value.trim() || !libraryAuthor.value.trim() || isNaN(libraryPage.value) || libraryPage.value <= 0) {
        if (libraryBook.value.trim() === '') {
            alert("Please enter a valid book name");
        } else if (libraryAuthor.value.trim() === '') {
            alert("Please enter a valid author name");
        } else if (isNaN(libraryPage.value) || libraryPage.value <= 0) {
            alert("Please enter a valid number of pages");
        }
    } else {
        let readingStat = ''
        if (readOrNOt.checked) {
            readingStat = 'Read';
        } else {
            readingStat = 'Not Read';
        }
        new Book(libraryBook.value, libraryAuthor.value, Number(libraryPage.value), readingStat);
        // addBookToLibrary(newBook);
        displayBooks();
        libraryBook.value = "";
        libraryAuthor.value = "";
        libraryPage.value = "";
        dialog.close();
    }
})

//DISPLAY BOOKS
const main = document.querySelector('main');
main.dataset.columns; // "3"

function displayBooks() {
    main.textContent = "";
    function createElement(tag, className, parent) {
        const element = document.createElement(tag);
        element.classList.add(className);
        parent.appendChild(element);
        return element;
    }
    myLibrary.forEach(books => {
        //main CONTAINER
        const cardContainer = createElement('div', 'card', main);
        cardContainer.setAttribute('data-id', books.id);
        //CONTENT
        const bookName = createElement('h2', 'bookName', cardContainer);
        const author = createElement('div', 'author', cardContainer);
        const page = createElement('div', 'pages', cardContainer);
        const readingStatus = createElement('div', 'readingStatus', cardContainer);
        // DOM CONTENT
        bookName.textContent = `${books.bookName}`;
        author.textContent = `Author: ${books.author}`;
        page.textContent = `Pages: ${books.page}`;
        readingStatus.textContent = `Status: ${books.status}`
        // BUTTONS
        const buttonStatus = createElement('button', 'status', cardContainer);
        const remove = createElement('button', 'remove', cardContainer);
        remove.textContent = 'Remove';


        buttonStatus.textContent = books.status === 'Read' ? 'Not Read' : 'Read';

        if (books.status === 'Read') {
            readingStatus.classList.add('Read')
        } else {
            readingStatus.classList.remove('Read')
        }
    })
}
displayBooks();



main.addEventListener('click', (event) => {
    if (!event.target.closest('button')) return;
    if (event.target.closest('.remove')) {
        const cardId = event.target.closest(".card").dataset.id;
        const index = myLibrary.findIndex(book => {
            return book.id === cardId
        });

        myLibrary.splice(index, 1)
        displayBooks();
    }
    const btn = event.target.closest('.status');
    if (!btn) return;

    const cardId = btn.closest(".card").dataset.id;
    const book = myLibrary.find((book) => book.id === cardId);
    book.toggleStatus(book);
    displayBooks()
})





