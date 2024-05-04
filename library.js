

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
    }
}
const testBook= new Book('Hobbit', 'Tolkien', '256', 'Not read');

addBook(testBook);
displayBook();