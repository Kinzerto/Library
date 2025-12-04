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

const book1 = new Book('one piece', 'echiro oda', 1167);
const book2 = new Book('Bleach','Tite Kubo' , 686);




addBookToLibrary(book1);
addBookToLibrary(book2);

const main = document.querySelector('main');

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

    // BUTTONS
    const status = document.createElement('button');
    const remove = document.createElement('button');

    cardContainer.appendChild(status);
    cardContainer.appendChild(remove);

    status.classList.add('status');
    remove.classList.add('remove');

    // DOM
    bookName.textContent = books.bookName;
    author.textContent = books.author;
    page.textContent = books.page;
    status.textContent = 'mark as read';
    remove.textContent = 'remove';

    // cardContainer.textContent = books.bookName

})


