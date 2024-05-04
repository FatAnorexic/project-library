
//selects the displayBook id
const display=document.getElementById('display');
//select the table for inserting content
const table=document.getElementById('table');
//Listens for 'click' and logs the book into the console
display.addEventListener('click', ()=>{
    addBook(testBook);
    addBook(expanse);
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
        row.insertCell(0).innerHTML=x.title;
        row.insertCell(1).innerHTML=x.author;
        row.insertCell(2).innerHTML=x.pages
        row.insertCell(3).innerHTML=x.readStat
        
    }
}
const testBook= new Book('Hobbit', 'Tolkien', '256', 'Not read');
const expanse= new Book('Leviathan Wakes', 'James SA Corey', '592', 'read');
