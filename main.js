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
          const storedBooks = [
              {
                  title: 'Rich Dad and Poor Dad',
                  author: 'Robert Kawasaski',
                  isbn: '3434434'
              },
              {
                title: 'The 5AM Club',
                author: 'Robin Sharma',
                isbn: '45678'
              }
          ];

          const books = storedBooks;

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

      static clearFields() {
          document.querySelector('#title').value = ' ';
          document.querySelector('#author').value = ' ';
          document.querySelector('#isbn').value = ' ';
      }
}
//store class: handles strorage

const container = document.querySelectorAll('.container');
container.forEach((book) => {

});

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

 // Install BOOK

 const book = new Book(title, author, isbn);

 // Add a book to UI

 Ui.addBookToList(book);

 // clear field

 Ui.clearFields();

});

//event : remove a book