// declare an empty books array variable
let books = [];
let index = 1;
// addBook function to add book details in the management system
function addBook(){
    const bookName = document.getElementById("bookName").value;
    const authorName = document.getElementById("authorName").value;
    const bookDescription = document.getElementById("bookDescription").value;
    const pagesNumber = parseInt(document.getElementById("pagesNumber").value);
    if(bookName && authorName && bookDescription && pagesNumber){
        const book = {
            name:bookName,
            author:authorName,
            description:bookDescription,
            pagesnumber:pagesNumber
        };
        books.push(book); // add book to the books array 
        showbook();
        clearInputs();
    }else{
        alert('Please fill in all fields correctly.');
    }

}
function showbook() {
    const lastBook = books.slice(-1);
    const Divbook = lastBook.map((book)=>`<h1>book Number: ${index++}</h1>
    <p><strong>Book Name: </strong>${book.name}</p>
    <p><strong>Book Author: </strong>${book.author}</p>
    <p><strong>Book Description: </strong>${book.description}</p>
    <p><strong>Book pagesnumber</strong>${book.pagesnumber}</p>
    `)
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class','books');
    newDiv.innerHTML=Divbook.join('');
    document.getElementById("Bookcontainer").appendChild(newDiv);
}

function clearInputs(){
    document.getElementById("bookName").value='';
    document.getElementById("authorName").value='';
    document.getElementById("bookDescription").value='';
    document.getElementById("pagesNumber").value='';
}