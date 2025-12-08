const myLibrary = [];

function Book(book, author, page, status = 'Not Read') {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.id = crypto.randomUUID();
    this.bookName = book;
    this.author = author;
    this.page = page;
    this.status = status;
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

const first = new Book('first', 'kinth', 1)
addBookToLibrary(first)
addBookToLibrary(new Book('second', 'kinth', 2))
addBookToLibrary(new Book('third', 'kinth', 3))

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
    if (!libraryBook.value.trim() === '' | libraryAuthor.value.trim() === '' || isNaN(libraryPage.value) || libraryPage.value <= 0) {
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
        const newBook = new Book(libraryBook.value, libraryAuthor.value, Number(libraryPage.value), readingStat);
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
main.dataset.columns; // "3"
function displayBooks() {
    main.textContent = "";
    myLibrary.forEach((books, index) => {
        const cardContainer = document.createElement("div");
        main.appendChild(cardContainer);
        cardContainer.classList.add("card");


        //CONTENT
        const bookName = document.createElement('h2');
        const author = document.createElement('div');
        const page = document.createElement('div');
        const readingStatus = document.createElement('div');

        cardContainer.appendChild(bookName);
        cardContainer.appendChild(author);
        cardContainer.appendChild(page);
        cardContainer.appendChild(readingStatus);

        author.classList.add('author');
        page.classList.add('pages');
        readingStatus.classList.add('readingStatus');
        readingStatus.classList.add('Read');


        // DOM

        bookName.textContent = `${books.bookName}`;
        author.textContent = `Author: ${books.author}`;
        page.textContent = `Pages: ${books.page}`;
        readingStatus.textContent = `Status: ${books.status}`

        if (readingStatus.textContent === 'Status: Not Read') {
            readingStatus.classList.remove('Read');
        }




        // BUTTONS

        const remove = document.createElement('button');
        const status = document.createElement('button');
        cardContainer.appendChild(status);
        cardContainer.appendChild(remove);

        status.classList.add('status');
        remove.classList.add('remove');

        status.textContent = books.status === 'Read' ? 'Not Read' : 'Read';
        remove.textContent = 'Remove';

        cardContainer.setAttribute('data-id', books.id);

    })
}
displayBooks();

Book.prototype.toggleStatus = function (button) {
    return this.status = this.status === "Read" ? "Not Read" : "Read";
}
main.addEventListener('click', (event) => {
    const btn = event.target.closest(".status");
    if (!btn) return;

    const card = btn.closest(".card");
    const readingStatus = card.querySelector(".readingStatus");
    
    const cardId = btn.closest(".card").dataset.id;
    const book = myLibrary.find((book) => book.id === cardId);

    book.toggleStatus();
    btn.textContent = book.status;


    displayBooks()

})

main.addEventListener('click', (event) => {
    if (event.target.closest('.remove')) {
        const cardId = event.target.closest(".card").dataset.id;
        const index = myLibrary.findIndex(book => {
            return book.id === cardId
        });

        myLibrary.splice(index, 1)
        displayBooks();
    }
})





