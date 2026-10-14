const myLibrary = [];

function Book(title, author) {
    const id = crypto.randomUUID();
    this.id = id;
    this.title = title;
    this.author = author;
    this.read = false;
    this.changeStatus = function() {
        this.read = !this.read;
    }
}

function addBookToLibrary(title, author) {
    const book = new Book(title, author);
    myLibrary.push(book);
    return book;
}

function getBookFromLibrary(id) {
    return myLibrary.find(book => book.id === id);
}

const library = document.querySelector(".library");
// function displayBooks() {
//     myLibrary.forEach(book => {
//         const bookDiv = document.createElement("div");
//         bookDiv.setAttribute("class", "book");
//         bookDiv.textContent = `title: ${book.title}, author: ${book.author}, id: ${book.id}, read: ${book.read}`;
//         library.appendChild(bookDiv);
//     })
// }

function displayNewBook(book) {
    const bookDiv = document.createElement("div");
    bookDiv.setAttribute("class", "book");
    bookDiv.setAttribute("data-id", book.id);

    const bookInfo = document.createElement("span");
    bookInfo.setAttribute("class", "book-info");
    bookInfo.textContent = `title: ${book.title}, author: ${book.author}, id: ${book.id}, read: ${book.read}`;

    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "remove-button");
    removeButton.textContent = "Remove";

    const changeStatusButton = document.createElement("button");
    changeStatusButton.setAttribute("class", "change-status-button");
    changeStatusButton.textContent = "Change Status";

    bookDiv.appendChild(bookInfo);
    bookDiv.appendChild(removeButton);
    bookDiv.appendChild(changeStatusButton);
    library.appendChild(bookDiv);
}

function updateBookInfo(book) {
    const bookId = book.id;
    const bookInfo = document.querySelector(`.book[data-id="${bookId}"] .book-info`);
    bookInfo.textContent = `title: ${book.title}, author: ${book.author}, id: ${book.id}, read: ${book.read}`;
}

const form = document.querySelector("form");
const dialog = document.getElementById('new-book-dialog');
form.addEventListener("submit", (event) => {
    event.preventDefault(); //this stops the page from reloading after form submits and 
    //trying to send data to a server (this is default html form behavior)

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const book = addBookToLibrary(title, author);

    form.reset();
    dialog.close();
    displayNewBook(book);
})

const closeButton = document.querySelector('.close-button');
closeButton.addEventListener("click", () => {
    dialog.close();
})

library.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-button")) {
        const bookElement = event.target.closest(".book");
        bookElement.remove();
    }

    if (event.target.classList.contains("change-status-button")) {
        const bookElement = event.target.closest(".book");
        const bookId = bookElement.dataset.id;

        const book = getBookFromLibrary(bookId);

        if (book) {
            book.changeStatus();
            updateBookInfo(book);
        } else {
            console.log("book does not exist");
        }
    }
})