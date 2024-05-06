
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
        let row=table.insertRow();

        let cell1=row.insertCell(0)
        let cell2=row.insertCell(1)
        let cell3=row.insertCell(2)
        let cell4=row.insertCell(3)
        
        cell1.innerHTML=x.title;
        cell2.innerHTML=x.author;
        cell3.innerHTML=x.pages;
        cell4.innerHTML=x.readStat;
        
        readButton(cell4, x)
        //Adds a remove button to the last cell in the row when called
        removeButton(row);
    }
    //Selects dynamically added buttons. If clicked, it will take the index of of the row
    //and remove that element from the array and display the new list.
    const removeBtn=document.querySelectorAll('#removeBtn');
    removeBtn.forEach(remove => remove.addEventListener('click', ()=>{
        let idx=remove.closest('tr').rowIndex;
        if(idx>-1){
            bookLib.splice(idx-1, 1);
        }
        displayBook();
    }));

    //Selects all the dynamically read buttons, and passes the constant to an event handler
    const readBtn=document.querySelectorAll('#readCheck')
    readBtn.forEach(read=>read.addEventListener('click', ()=>{
        let idx=read.closest('tr').rowIndex;
        if (idx>-1){
            bookLib[idx-1].readStat=='read' ? bookLib[idx-1].readStat='not read':bookLib[idx-1].readStat='read';
        }
        displayBook();
    }))
}

//Function to clear the board/cards before reiterating through the array
function clearBoard(){
    for(let x=table.rows.length; x>1;x--){
        table.deleteRow(x-1);
    }
}

function removeButton(row){
    let remove=document.createElement('button');
    let name=document.createTextNode('Remove');
    remove.className='removeStyle';
    remove.id='removeBtn';
    remove.appendChild(name)
    row.appendChild(remove);
}

function readButton(idx,x){
    let read=document.createElement('input');
    read.type='checkbox';
    read.className='readStatus';
    read.id='readCheck';
    x.readStat=='read' ? read.checked=true:read.checked=false;
    idx.appendChild(read)
}