
//selects the displayBook id
const display=document.getElementById('display');
//select the table for inserting content
const table=document.getElementById('table');



//query selectors to open and close the dialog box
const dialog=document.querySelector('dialog');   //Allows us to manipulate the modal status of the dialog box
const addBookBtn=document.getElementById('addBookBtn'); //used in our event listenter to open the dialog box
const submitBtn=document.querySelector('.btn-submit'); //Submits the information and closes the dialog box

//Event listener to open the dialog. When clicked showModal() will activate the dialog box and open it on screen
addBookBtn.addEventListener('click', () =>{
    dialog.showModal();
});

//When clicked, runs the submit function|closing the dialog box, and creating a new object with values given
submitBtn.addEventListener('click', submit);

//An empty array to store all book values
const bookLib=[];

//Constructor for book
function Book(title, author, pages, readStat){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.readStat=readStat;
}

function submit(event){
    dialog.close();
    //Add prevent default and submit user data to addBook function
    event.preventDefault();
    const title=document.getElementById('title').value;
    const author=document.getElementById('author').value;
    const pages=document.getElementById('pages').value;
    const read=document.getElementById('isRead').checked ? 'read': 'not read';
    const Obj= new Book(title, author, pages, read);
    addBook(Obj);
}

function addBook(userBook){
    if(!bookLib.includes(userBook)){
        bookLib.push(userBook)
        displayBook();
    };
} 

function displayBook(){
    clearBoard();
    for (x of bookLib){
        console.log(x)
        let row=table.insertRow();
        row.insertCell(0).innerHTML=x.title;
        row.insertCell(1).innerHTML=x.author;
        row.insertCell(2).innerHTML=x.pages;
        row.insertCell(3).innerHTML=x.readStat;

        //Adds a remove button to the last cell in the row when called
        removeButton(row);
        
        
    }
}

//Function to clear the board/cards before reiterating through the array
function clearBoard(){
    for(let x=table.rows.length; x>1;x--){
        table.deleteRow(x-1);
    }
}


function addRemoveButton(){
    let remove=document.createElement('button');
    remove.className='removeStyle';
    remove.id='removeBtn';
}

function removeButton(row){
    let remove=document.createElement('button');
    let name=document.createTextNode('Remove');
    remove.className='removeStyle';
    remove.id='removeBtn';
    remove.appendChild(name)
    row.appendChild(remove);
}