var inputName = document.getElementById("name");
var inputUrl = document.getElementById("url");
var addBtn = document.getElementById("addBtn");
var tableBody = document.getElementById("tableBody");

var bookMarks = [];
var mainIndex = 0;

if(localStorage.getItem("bookMarks") == null){ 
    bookMarks = [];
}
else{ 
    bookMarks = JSON.parse(localStorage.getItem("bookMarks"));
    displayBook(bookMarks);
}

addBtn.onclick = function () {
    if (addBtn.innerHTML == "Update") {
        addBtn.innerHTML = "Submit";
        var bookMark = {
            name: inputName.value,
            url: inputUrl.value
        };
        bookMarks.splice(mainIndex, 1, bookMark);
    } else {
        var bookMark = {
            name: inputName.value,
            url: inputUrl.value
        };
        bookMarks.push(bookMark);
    }

    localStorage.setItem("bookMarks", JSON.stringify(bookMarks));
    displayBook(bookMarks);
    clearData(); 
}

var nameRegex = /^[A-Za-z_]+$/;
var urlRegex = /^(https?:\/\/)?(www\.)?[A-Za-z0-9_\.]+\.[a-z]+$/;
function isNameValid(){ 
    if(nameRegex.test(inputName.value)){
        return true;
    }else{ 
        return false;
    }

}
function isUrlValid(){ 
    if(urlRegex.test(inputUrl.value)){
        return true;
    }else{ 
        return false;
    }

}

inputName.onkeyup = inputUrl.onkeyup = function () {
    addBtn.disabled = !(isUrlValid() && isNameValid());
};

function displayBook(Array){ 
    var Marks = ``;
    for(var i = 0; i < Array.length; i++){ 
        Marks += ` 
        <tr>
            <td>${Array[i].name}</td>
            <td><a href="${Array[i].url}"><button class="btn btn-primary">Visit</button></a></td>
            <td> <button onclick = "updateBook(${i})" class="btn btn-warning">Update</button></td>
            <td> <button onclick = "deleteBook(${i})" class="btn btn-danger">Delete</button></td>
        </tr> 
        `
    }

    tableBody.innerHTML = Marks;
}


function deleteBook(index){ 
    bookMarks.splice(index,1)
    localStorage.setItem("bookMarks",JSON.stringify(bookMarks));
    displayBook(bookMarks);
}


function clearData(){ 
    inputName.value = "";
    inputUrl.value = "";
}

function updateBook(index) {
    if (index >= 0 && index < bookMarks.length) {
        inputName.value = bookMarks[index].name;
        inputUrl.value = bookMarks[index].url;
        addBtn.innerHTML = "Update";
        mainIndex = index;
    }
}

function search(term) {
    var searchBook = [];
    if (term.trim() === "") {
        displayBook(bookMarks);
        return;
    }

    for (var i = 0; i < bookMarks.length; i++) {
        if (bookMarks[i].name.toLowerCase().includes(term.toLowerCase())) {
            searchBook.push(bookMarks[i]);
        }
    }

    displayBook(searchBook);
}


