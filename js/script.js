// Books Class
class Books{

    static displayBooks(){
        const books = Store.getBooks();

        books.forEach(book => {
            Books.addToBookList(book);
        });
    }
    
    static addToBookList(book) {
        const table = document.querySelector('.table');
        const table_row = document.createElement('tr');
    
        table_row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><button class="btn-del delete">x</button></td>
        `
        table.appendChild(table_row);
    }
    
    static doesExist(value, books){
        const obj = Store.getBooks();

        for (let key in obj) {
            console.log(obj[key].isbn)
          if (parseInt(obj[key].isbn) === parseInt(value)) {
              return true
          }    
        }
        return false
    }

    static isNumber(value, books){
        const disply_msg = document.querySelector('.msg');
        disply_msg.style.display = 'block';
        const reg = /^\d+$/;
        let msg;
    
        if (!reg.test(value))
        {
            msg = `<p>The isbn value <b>${value}</b> should be an integer.</p>`;
            Books.alertMessage(msg, 'error');
        
        }else{
            if(this.doesExist(value, books)){
                msg = `<p><b>${value}</b> already exists please use unique isbn number</p>`;
                Books.alertMessage(msg,'error');
            }else{
                msg = `<p>Book Successfully added!</p>`;
                Books.alertMessage(msg,'success');
                Store.addBooks(books);
            }
            
        }
        
    }

    static alertMessage(msg, msg_type){
        const msg_body = document.querySelector('.msg');
        msg_body.innerHTML = msg
        msg_body.classList.add('show');
        msg_body.classList.add(msg_type);

        setTimeout(() => {
            msg_body.style.display = 'none';
        }, 3000);
        
    }
}

class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }

    static addBooks(book){
        let books = this.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBooks(isbn){
        const books = Store.getBooks();
        let msg;

        books.forEach((book, index)=>{
            if(book.isbn == isbn){
                books.splice(index, 1);
                msg = `<p>Book Successfully deleted!</p>`;
                Books.alertMessage(msg,'success');
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }

}

//
const add_btn = document.querySelector('#book-form');

Books.displayBooks();

add_btn.addEventListener('submit', (e)=>{
    e.preventDefault();
    const title_val = document.querySelector('#title').value;
    const author_val = document.querySelector('#author').value;
    const isbn_val = document.querySelector('#isbn').value;
    const books  = {title:title_val,author:author_val,isbn: isbn_val};

    Books.isNumber(isbn_val, books); 

    setInterval(()=>{
        location.reload();
    }, 3000)

})


document.querySelector('.table').addEventListener('click', (el)=>{
    console.log(el.target.classList.contains('delete'));
   
    if(el.target.classList.contains('delete')) {
        el.target.parentElement.parentElement.remove()
        const isbn = el.target.parentElement.previousElementSibling.textContent;
        Store.removeBooks(isbn);
    }
   
})
