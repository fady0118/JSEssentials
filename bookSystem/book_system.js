// declare an empty books array variable
let books = [];
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
    // grab the last book
    const lastBook = books.slice(-1);
    const last_index = books.length - 1;
    // create the book new array
    const Divbook = lastBook.map((book)=>`<h1>book Number: ${last_index+1}</h1>
    <p><strong>Book Name: </strong>${book.name}</p>
    <p><strong>Book Author: </strong>${book.author}</p>
    <p><strong>Book Description: </strong>${book.description}</p>
    <p><strong>Book pagesnumber</strong>${book.pagesnumber}</p>
    `)
    // create the book element in the html and append to the container
    const newDiv = document.createElement('div');
    newDiv.setAttribute('class','books');
    newDiv.setAttribute('id',`divbook${last_index}`);
    newDiv.innerHTML=Divbook.join('');
    document.getElementById("Bookcontainer").appendChild(newDiv);
    // create a delete button
    const delete_button = document.createElement('button');
    delete_button.innerHTML="delete";
    delete_button.setAttribute("onclick",`deletebook(${last_index})`)
    document.getElementById(`divbook${last_index}`).appendChild(delete_button);
}
function deletebook(index){
    // remove from the books array
    books.splice(index,1);
    // remove the element from DOM
    document.getElementById(`divbook${index}`).remove();
    updateIndex();
}
function updateIndex(){
    const bookslist = document.querySelectorAll("#Bookcontainer .books");
    const bookslist_buttons = document.querySelectorAll(".books button");
    const bookheaderindex = document.querySelectorAll(".books h1");
    let i=0,j=0,h=1;
    bookslist.forEach(book=>{
        book.id=`divbook${i++}`;

    })
    bookslist_buttons.forEach(button=>{
        button.setAttribute("onclick",`deletebook(${j++})`);
    })
    bookheaderindex.forEach(header=>{
        header.innerHTML=`book Number: ${h++}`
    })
}
function clearInputs(){
    document.getElementById("bookName").value='';
    document.getElementById("authorName").value='';
    document.getElementById("bookDescription").value='';
    document.getElementById("pagesNumber").value='';
}