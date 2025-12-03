const myLibrary = [];

function Book(book) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.bookName = book
}

function addBookToLibrary(book) {
    // take params, create a book then store it in the array
    myLibrary.push(book)
}

const book1 = new Book('One Piece');
const book2 = new Book('Bleach');


addBookToLibrary(book1);
addBookToLibrary(book2);



console.log(myLibrary);