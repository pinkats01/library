
/*let library= [];

//make a book object constructor

function Book(title,author,pages,readingState) {
    this.title= title;
    this.author= author;
    this.pages= pages;
    this.readOrNot= readingState;
}*/

class Library{
    constructor(){
        this.books= [];
    }
    
    addBook(newBook){
        if(!this.bookExist(newBook)){
        this.books.push(newBook)
      }
    }

    bookExist(newBook){
        return this.books.some((book)=> book.title === newBook.title)
    }
}

class Book{
    constructor(title, author, pages, read){
        this.title= title;
        this.author= author;
        this.pages= pages;
        this.read= read;
    }
}

let library = new Library();

// Popup Form

let libraryUi = document.querySelector(".library");
let addBook = document.querySelector(".add-book");
let overlay= document.getElementById("overlay");
let formCloseBtn = document.getElementById("close-btn-btn");
let modal= document.querySelector("form");

addBook.addEventListener("click",() => showPopupForm());
formCloseBtn.addEventListener("click",() => hidePopupForm());
overlay.addEventListener("click", () => hidePopupForm());

function showPopupForm(){
    modal.classList.add("active");
    overlay.classList.add("active");
}

function hidePopupForm(){
    modal.classList.remove("active");
    overlay.classList.remove("active");
}

let submitBtn= document.querySelector(".submit-btn");

submitBtn.addEventListener("click", (e) => makeBook(e));

// Reset Form

function resetForm(){
    title.value= '';
    author.value= '';
    pages.value= '';
}

function makeBook(e){

    // get input from form, make a new book with the inputs
    e.preventDefault();
    let title= document.getElementById("title").value;
    let author= document.getElementById("author").value;
    let pages= document.getElementById("pages").value;
    let readingState= document.querySelector("input[type=radio]:checked").id;
    let readingStateLabel= document.querySelector(`label[for=${readingState}]`).textContent;

    let book = new Book(title, author, pages, readingStateLabel);

    library.addBook(book);

    makeLibrary(book);
    resetForm();
    hidePopupForm();
}

function createBookCard(book){

    //create the book card element
    let bookCard= document.createElement('div');
    let title= document.createElement('div');
    let author= document.createElement('div');
    let pages= document.createElement('div');
    let btnContainer= document.createElement('div');
    let readBtn= document.createElement('button');
    let deleteBtn= document.createElement('button');

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    btnContainer.appendChild(readBtn);
    btnContainer.appendChild(deleteBtn);
    bookCard.appendChild(btnContainer);
    libraryUi.appendChild(bookCard);
    
    //make the element content
    title.textContent= `${book.title}`;
    author.textContent= `${book.author}`;
    pages.textContent= `${book.pages} Pages`;
    readBtn.textContent= `${book.read}`;
    deleteBtn.textContent= "Delete";

    //add data attr
    bookCard.dataset.book = library.books.indexOf(book);

    //add style
    bookCard.classList.add("book");
    title.classList.add("book-data");
    author.classList.add("book-data");
    pages.classList.add("book-data");
    btnContainer.classList.add("btn-group");
    readBtn.classList.add("btn-group-btn");
    // add class read or not-read
    if(book.read=== 'Read'){
        readBtn.classList.add("read"); 
    } else{
        readBtn.classList.add("not-read"); 
    }
    deleteBtn.classList.add("btn-group-btn", "delete");

    // delete btn logic
    deleteBtn.addEventListener("click",(e) => deleteBookCard(e));

    function deleteBookCard(e){
        e.target.parentElement.parentElement.remove();
        library.books.splice(e.target.parentElement.parentElement.dataset.book, 1);
        makeLibrary();
  }

   // read btn toggle
   readBtn.addEventListener("click", toggleReadingState);

   function toggleReadingState(e){
    let read = e.target.textContent.toLowerCase();
       if(read === 'read'){
          e.target.textContent= 'Not Read';
          e.target.classList.remove('read');
          e.target.classList.add('not-read')
       } else {
          e.target.textContent= 'Read';
          e.target.classList.remove('not-read');
          e.target.classList.add('read')
       }
   }
}

function makeLibrary(){
    resetLibrary();
    for(let book of library.books){
        createBookCard(book);
    }
}

function resetLibrary(){
    libraryUi.innerHTML= "";
}



