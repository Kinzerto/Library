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
const libraryPage = document.querySelector('dialog #page')

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
        const newBook = new Book(libraryBook.value, libraryAuthor.value, Number(libraryPage.value));
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

        bookName.textContent = `${books.bookName}`;
        author.textContent = `Author: ${books.author}`;
        page.textContent = `Pages: ${books.page}`;

        // BUTTONS
        const status = document.createElement('button');
        const remove = document.createElement('button');
        cardContainer.appendChild(status);
        cardContainer.appendChild(remove);

        status.classList.add('status');
        remove.classList.add('remove');

        status.textContent = 'Not Read';
        remove.textContent = 'Remove';

        cardContainer.setAttribute('data-id', books.id);


    })
}

main.addEventListener('click', (event) => {
    if (event.target.closest('.remove')) {
        const cardId = event.target.closest(".card").dataset.id;
        const removeCard = event.target.closest(".card");
        console.log(event.target);

        const index = myLibrary.findIndex(book => {
            return book.id === cardId
        });

        myLibrary.splice(index, 1)
        displayBooks();
    }
})
displayBooks();