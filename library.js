
//select the table for inserting content
const tbody=document.querySelector('tbody')

//query selectors to open and close the dialog box
const dialog=document.querySelector('dialog');   //Allows us to manipulate the modal status of the dialog box
const addBookButtons=document.querySelectorAll('#addBookBtn'); //used in our event listenter to open the dialog box
const submitBtn=document.querySelector('.btn-submit'); //Submits the information and closes the dialog box
const tableHeads=document.querySelectorAll('#tableHeader'); //Selects the tableHeaders to change direction of arrows

//Event listener to open the dialog. When clicked showModal() will activate the dialog box and open it on screen
addBookButtons.forEach(addBookBtn => addBookBtn.addEventListener('click', () =>{
    dialog.showModal();
}));

//When clicked, runs the submit function|closing the dialog box, and creating a new object with values given
submitBtn.addEventListener('click', submit);

// for each of the tableHeaders clicked, swaps out the current arrow image with the opposite
tableHeads.forEach(tableHead => tableHead.addEventListener('click', ()=>{
    let content=tableHead.innerText;
    let direction; //Undeclared variable to determin the direction the algorithm should sort
    const arrow=tableHead.children[0];

    
    if(arrow.src.match('content/menu-down.svg')){
        direction='asc';
    }else if(arrow.src.match('content/menu-up.svg')){
        direction='decs';
    }

    //Checks each instance of the arrow, and provided we are not on the same cell as the one clicked
    //will reset the table and make all arrows point up before moving onto the actual sorting by cell
    const arrows=document.querySelectorAll('#arrow');
    arrows.forEach((e)=>{
        if(e.src.match('content/menu-down.svg')&&e.parentNode.innerText!=content){
            resort('asc', 'title');
            e.src='content/menu-up.svg';
        }
    });

    
    
    switch(content){
        case 'Title':
            resort(direction, 'title');
            swap(arrow);
            break;
        case 'Author':
            resort(direction, 'author');
            swap(arrow);
            break;
        case 'pages':
            resort(direction, 'pages');
            swap(arrow);
            break;
        case 'read':
            resort(direction, 'read');
            swap(arrow)
            break;
    }
}));

//An empty array to store all book values
const bookLib=[];


//Book class
class Book{
    constructor(
        title='Unknown', author='Unknown', pages=1, readStat=false
    ){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.readStat=readStat;
    }
}

// Function to swap directional arrows of table heads
function swap(arrow){
    if(arrow.src.match('content/menu-up.svg')){
        arrow.src='content/menu-down.svg';
    }else if(arrow.src.match('content/menu-down.svg')){
        arrow.src='content/menu-up.svg';
    }
}

//Takes form information and creates object from it, then pushes object to addBook function
function submit(event){
    
    const title=document.getElementById('title').value;
    const author=document.getElementById('author').value;
    const pages=document.getElementById('pages').value;
    const read=document.getElementById('isRead').checked ? 'read': 'not read';
    
    // prevent the dialog box from closing if all fields are left blank
    if (title=='' || author=='' || pages==''){
        alert('Please fill give the title of the book, author, and number of pages');
        return;
    }else if(Number(pages)<1){
        alert('Pages must be at least 1 or greater');
        return;
    }

    //Add prevent default and submit user data to addBook function
    event.preventDefault();
    dialog.close();
    const Obj= new Book(title, author, pages, read);
    addBook(Obj);
    clearForm();
}

function addBook(userBook){
    for(x of bookLib){
        if(userBook.title===x.title && userBook.author===x.author && userBook.pages===x.pages){
            alert(
                'Book already in library. If this is a remake, modern adaptation, limited edition or differs'+ 
                'from the book listed in any way, please specify.');
            dialog.showModal();
            return;
        }
    }
    bookLib.push(userBook);
    displayBook();
}

//Function to clear the form field for each of the values in the dialog box
function clearForm(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('pages').value='';
    document.getElementById('isRead').checked=false;
}

function displayBook(){
    clearBoard();
    for (x of bookLib){
        let row=tbody.insertRow();
        
        // create a class for styling
        row.className='rowStyle';

        let cell1=row.insertCell(0)
        let cell2=row.insertCell(1)
        let cell3=row.insertCell(2)
        let cell4=row.insertCell(3)
        
        cell1.innerHTML=x.title;
        cell2.innerHTML=x.author;
        cell3.innerHTML=x.pages;
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
            bookLib.splice(idx, 1);
        }
        displayBook();
    }));

    //Selects all the dynamically read buttons, and passes the constant to an event handler
    const readBtn=document.querySelectorAll('#readCheck')
    readBtn.forEach(read=>read.addEventListener('click', ()=>{
        let idx=read.closest('tr').rowIndex;
        if (idx>-1){
            bookLib[idx].readStat=='read' ? bookLib[idx].readStat='not read':bookLib[idx].readStat='read';
        }
    }))
}

//Function to clear the board/cards before reiterating through the array
function clearBoard(){
    for(let x=tbody.rows.length; x>0;x--){
        tbody.deleteRow(x-1);
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

//New function that simply resorts the array objects by taking in the direction of the arrow and the specific
//header that was clicked. The item array declared is for the sole purpose of reducing redundancy, and while
//it may look a little redundant in the nested for loop, it's a vital step in keeping item and bookLib in sync|
//organizes better

function resort(direction, flag){
    let min_index, temp, tempItem;
    
    //This array allows us to assign specific items from the object. This reduces the need for
    //redundant functions. 

    let item=[];
    for(x of bookLib){
        switch(flag){
            case 'title':
                item.push(x.title.toLowerCase());
                break;
            case 'author':
                item.push(x.author.toLowerCase());
                break;
            case 'pages':
                item.push(Number(x.pages));
                break;
            case 'read':
                item.push(x.readStat);
                break;
        }
    }
    
    if(direction=='decs'){
       for(let x=0;x<item.length-1;x++){
           min_index=x;
           for(let y=x+1;y<item.length;y++){
               if(item[y]>item[min_index]){
                   min_index=y;
               }
           }
            tempItem=item[min_index];
            item[min_index]=item[x];
            item[x]=tempItem

            temp=bookLib[min_index];
            bookLib[min_index]=bookLib[x];
            bookLib[x]=temp;
        }
    }else if(direction=='asc'){
       for(let x=0;x<item.length-1;x++){
           min_index=x;
           for(let y=x+1;y<item.length;y++){
               if(item[y]<item[min_index]){
                   min_index=y;
               }
           }
            tempItem=item[min_index];
            item[min_index]=item[x];
            item[x]=tempItem

            temp=bookLib[min_index];
            bookLib[min_index]=bookLib[x];
            bookLib[x]=temp;
        }
    }
    displayBook();
}

// Dummy content for design of page--DELETE before final push!
function dummyContent(){
    const book1= new Book('Hobbit', 'JRR Tolkien', '320', 'not read');
    const book2= new Book('Leviathan Wakes', 'James S.A. Corey', '592', 'read');
    const book3= new Book(`To Kill a Mocking Bird`, 'Harper Lee', '281','read');
    addBook(book1);
    addBook(book2);
    addBook(book3);
}
// Legacy Code for future maintence and testing
/*
function massiveDummy(){
    let bookTitles=[];
    let bookAuthor=[];
    let pages=[];
    for(let x=0;x<100;x++){
        bookTitles.push(`Book Title ${x}`);
        bookAuthor.push(`Book Author ${x}`);
        let rand=Math.floor(Math.random()*(5000-100+1))+100;
        pages.push(rand);
    }

    let stat;
    for(let y=0;y<100;y++){
        if(y%2==0){
            stat='read';
        }else{
            stat='not read';
        }
        const Obj=new Book(bookTitles[y], bookAuthor[y], pages[y], stat);
        addBook(Obj);
    }

}*/

dummyContent();
// massiveDummy();