class Book {
    constructor(title, author, isbn) {
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById('book-list');
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X<a></td>
        `
        list.appendChild(row)
        
    }

    clearFields() {
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }

    showAlert(message, classname) {
        const div = document.createElement('div')
        // add class
        div.className = `alert ${classname}`
        // add message
        div.appendChild(document.createTextNode(message))
        // get parent
        const container = document.querySelector('.container');

        const form = document.querySelector('#book-form')

        container.insertBefore(div, form)

        //timeout after 3 sec
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000)
    }

    deleteBook(target) {
        if(target.className === 'delete') {
            target.parentElement.parentElement.remove()
        }
    }
    

}

// local storage class

class Store {
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
            books = []
        } else {
            books  = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }

    static displayBooks() {
        const books = Store.getBooks();

        books.forEach(function(book)  {
            const ui = new UI()
           // add book to ui
           ui.addBookToList(book) 
        });
    }

    static addBook(book) {
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books))
    }

    static removeBook() {


    }
}
    // DOM  Load Event


document.addEventListener('DOMContentLoaded', Store.displayBooks)


document.getElementById('book-form').addEventListener('submit', function(e) {
    const title  = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn   = document.getElementById('isbn').value
    
    // instantiate new Book object
    const book = new Book(title, author, isbn)
    
    // instantiate new UI object
    const ui = new UI()

    //validate

    if(title === '' || author === '' || isbn === '' ) {
        ui.showAlert('Please fill in all files', 'error')
    } else {

        ui.addBookToList(book)

        //add to local storage
        Store.addBook(book)

        ui.showAlert('Book Added', 'success')

        ui.clearFields()
    }

    
    

    e.preventDefault()
})

// delete eventlistener

document.getElementById('book-list').addEventListener('click', function(e) {

    const ui = new UI()

    ui.deleteBook(e.target)

    ui.showAlert('Book removed', 'success')

    e.preventDefault()
})







