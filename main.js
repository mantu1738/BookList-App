// Book class: Repersents a book
   class Book{
       constructor(title, author, isbn) {
         this.title = title;
         this.author = author;
         this.isbn = isbn;
       }
   }
// UI class: handles ui tasks
class Ui{
      static displayBooks() {
          const books = store.getBooks();

          books.forEach((book) => Ui.addBookToList(book));

      }
      static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a> </td>
        `;

        list.appendChild(row);

      }

      static deleteBook(el) {
          if(el.classList.contains('delete')) {
              el.parentElement.parentElement.remove();
          }
      }

      static showAlert(message, className) {
          const div = document.createElement('div');
          div.className =  `alert alert-${className}`;
          div.appendChild(document.createTextNode(message));
          const conatiner = document.querySelector('.container');
          const form = document.querySelector('#book-form');
          conatiner.insertBefore(div, form);

          //Make alert disspper in 3 seconds

          setTimeout(() => document.querySelector('.alert')
          .remove(), 3000);
      }

      static clearFields() {
          document.querySelector('#title').value = ' ';
          document.querySelector('#author').value = ' ';
          document.querySelector('#isbn').value = ' ';
      }
}
//store class: handles strorage

class store {
    static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
        books = [];
    }
    else{
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
    }

   static addBook(book) {
    const books = store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
    }

   static removeBook(isbn) {
     const books = store.getBooks();
     books.forEach((book, index) => {
     if(book.isbn === isbn) {
         books.splice(index, 1);
     }
     });

     localStorage.setItem('books', JSON.stringify(books));
    }
}

//event: display books

document.addEventListener('DOMContentLoaded', Ui.displayBooks);

//event: add a book
 
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // prevent actuall submit
    e.preventDefault();
 // Get Form Values
 const title = document.querySelector('#title').value;
 const author = document.querySelector('#author').value;
 const isbn = document.querySelector('#isbn').value;

// Vlaidate 

if(title === ' ' || author === ' ' || isbn === ' ') {
   Ui.showAlert('Please Fill The Forms', 'danger');
} 
else {

     // Install BOOK

 const book = new Book(title, author, isbn);

 // Add a book to UI

 Ui.addBookToList(book);

 // add book to store 

 store.addBook(book);

 // show sucess message

  Ui.showAlert('Book Added', 'info')

 // clear field

 Ui.clearFields();
}
});

//event : remove a book

document.querySelector('#book-list').addEventListener('click', (e) => {

    Ui.deleteBook(e.target);
    // Show delete messgae
    Ui.showAlert('Book Removed', 'info');

    // remove book from store
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);
});