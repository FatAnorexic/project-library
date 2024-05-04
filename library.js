
//selects the displayBook id
const display=document.getElementById('display');
//select the table for inserting content
const table=document.getElementById('table');
//Listens for 'click' and logs the book into the console
display.addEventListener('click', ()=>{
    addBook(testBook);
    displayBook();
})
//An empty array to store all book values

const bookLib=[];

//Constructor for book
function Book(title, author, pages, readStat){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.readStat=readStat;
}


function addBook(userBook){
    bookLib.push(userBook)
} 

function displayBook(){
    for (x of bookLib){
        console.log(x)
        let row=table.insertRow();
        let cell=row.insertCell(0)
        cell.innerHTML=x.title
        
    }
}
const testBook= new Book('Hobbit', 'Tolkien', '256', 'Not read');

