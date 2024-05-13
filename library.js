
//select the table for inserting content
const table=document.getElementById('table');

//query selectors to open and close the dialog box
const dialog=document.querySelector('dialog');   //Allows us to manipulate the modal status of the dialog box
const addBookButtons=document.querySelectorAll('#addBookBtn'); //used in our event listenter to open the dialog box
const submitBtn=document.querySelector('.btn-submit'); //Submits the information and closes the dialog box

//Event listener to open the dialog. When clicked showModal() will activate the dialog box and open it on screen
addBookButtons.forEach(addBookBtn => addBookBtn.addEventListener('click', () =>{
    dialog.showModal();
}));

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

    dialog.close();
    //Add prevent default and submit user data to addBook function
    event.preventDefault();
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

/*-----------------------------------------------------------------------------------------------------------------------------
//This function is used to sort each method within the table, by clicking the headers. Should I choose to continue to use the  *
//table in design, this will allow the user to sort books by title, author, pages, or if they've been read or not. The form    *
//and function of this may change if other design approaches are chosen (IE using display cards), but either way it may be     *
//an important aspect for feature complete Project: Library.                                                                   *
//Source for this code is frome W3schools.com: https://www.w3schools.com/howto/howto_js_sort_table.asp                         
//-----------------------------------------------------------------------------------------------------------------------------*/

function sortTable(n){
    let rows, switching, i, x, y, shouldSwitch, dir, switchCount=0;
    let table=document.getElementById('table');
    switching=true;
    //sets sorting direction
    dir='asc';
    //Loop continues while no switching is done
    while(switching){
        //set switching value to false
        switching=false;
        rows=table.rows;
        if(n===0 || n===1){
            //Loop through every row, except the first, which contains the headers
            for(i=1;i<(rows.length-1);i++){
                //There should be no switching
                shouldSwitch=false;

                //compare the elements you want to compare from one row to the next
                x=rows[i].getElementsByTagName('TD')[n];
                y=rows[i+1].getElementsByTagName('TD')[n];

                //Check if the two rows should switch places
                if(dir=='asc'){
                    if(x.innerHTML.toLowerCase()>y.innerHTML.toLowerCase()){
                        shouldSwitch=true;
                        break;
                    }
                }else if(dir=='decs'){
                    if(x.innerHTML.toLowerCase()<y.innerHTML.toLowerCase()){
                        shouldSwitch=true;
                        break;
                    }
                }
            }
            
            const values = sorting(rows, shouldSwitch, switching, switchCount, dir,i);
            switching=values.switching;
            dir=values.dir;
            switchCount=values.switchCount;
            reSortArray();
        }

        if(n===2){
            for(i=1;i<rows.length-1;i++){
                shouldSwitch=false;

                x=rows[i].getElementsByTagName('TD')[n];
                y=rows[i+1].getElementsByTagName('TD')[n];

                if(dir=='asc'){
                    if(Number(x.innerHTML)>Number(y.innerHTML)){
                        shouldSwitch=true;
                        break;
                    }
                }else if(dir=='decs'){
                    if(Number(x.innerHTML)<Number(y.innerHTML)){
                        shouldSwitch=true;
                        break;
                    }
                }
            }
            const values = sorting(rows, shouldSwitch, switching, switchCount, dir,i);
            switching=values.switching;
            dir=values.dir;
            switchCount=values.switchCount;
            reSortArray();
        }

        if(n===3){
            for(i=1;i<(rows.length-1);i++){
                shouldSwitch=false;
                
                x=rows[i].getElementsByTagName('TD')[n].childNodes[1];
                y=rows[i+1].getElementsByTagName('TD')[n].childNodes[1];

                if(dir=='asc'){
                    if(x.checked==true && y.checked==false){
                        shouldSwitch=true;
                        break;
                    }
                }else if(dir=='decs'){
                    if(x.checked==false && y.checked==true){
                        shouldSwitch=true;
                        break;
                    }
                }
            }
            const values = sorting(rows, shouldSwitch, switching, switchCount, dir,i);
            switching=values.switching;
            dir=values.dir;
            switchCount=values.switchCount;
            reSortArray();
        }
    }
    reSortArray();
}

//Function to sort the rows
function sorting(rowsSwitch,shouldSwitch, switching, switchCount, dir='acs',i){
    // console.log(rowsSwitch[i].parentNode)
    if(shouldSwitch){
        rowsSwitch[i].parentNode.insertBefore(rowsSwitch[i+1], rowsSwitch[i]);
        switching=true;
        switchCount++;
        return{dir, switching, switchCount}
    }else{
        if(switchCount==0 && dir=='asc'){
            dir='decs';
            switching=true;
            return {dir, switching, switchCount}
        }
    }
    return{dir, switching, switchCount};
}

function dummyContent(){
    const book1= new Book('Hobbit', 'JRR Tolkien', '256', 'not read');
    const book2= new Book('Leviathan Wakes', 'James SA Corey', '512', 'read');
    const book3= new Book(`To Kill a Mocking Bird`, 'Harper Lee', '581','read');
    addBook(book1);
    addBook(book2);
    addBook(book3);
}

function reSortArray(){
    let rowCheck=document.getElementById('table').rows;
    let min_index, temp;
    for(let i=1;i<(rowCheck.length);i++){
        min_index=i;
        for(let j=0;j<bookLib.length;j++){
            if(bookLib[j].title==rowCheck[min_index].getElementsByTagName('TD')[0].innerHTML){
                temp=bookLib[min_index-1];
                bookLib[min_index-1]=bookLib[j];
                bookLib[j]=temp
            }
        }
    }
}

dummyContent();
