let row = 1;
let rollnumber,uname, subject, select;
let totalUsers = []
let totalRollNo = []
let selectedOption = "Local Storage"
let entry = document.getElementById("entry");
entry.addEventListener("click", displayDetails);
window.addEventListener('load', persistUsers);

//Display all the data 

function displayDetails(e) {
    e.preventDefault()
    rollnumber = document.getElementById("rollnumber").value;
    uname = document.getElementById("uname").value;
    subject = document.getElementById("subject").value;
    const form = document.getElementById("form")
    if (!rollnumber || !uname || !subject) {
        alert("🚨Please fill all the above");
        return;
    }
    totalRollNo = totalUsers?.map((user) => user.rollnumber)
    const isRollno = totalRollNo.includes(rollnumber)
    console.log('adadadad', totalRollNo, isRollno, rollnumber)
    if (isRollno) {
        alert("🚨Rollno already exists");
        return
    }
    const users = {
        rollnumber,
        uname,
        subject,
        selectedOption
    }
    totalUsers = [...totalUsers, users]
    if (selectedOption === "Local Storage") {
        let filterLocal = totalUsers.filter((user) => user.selectedOption === "Local Storage")
        localStorage.setItem('users', JSON.stringify(filterLocal))
    }
    if (selectedOption === "SessionStorage") {
        let filterSession = totalUsers.filter((user) => user.selectedOption === "SessionStorage")
        sessionStorage.setItem('users', JSON.stringify(filterSession))
    }

    let display = document.getElementById("display");
    let newRow = display.insertRow(row);
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    cell1.innerHTML = rollnumber;
    cell2.innerHTML = uname;
    cell3.innerHTML = subject;
    cell4.innerHTML = selectedOption;
    cell5.innerHTML = `<a  onClick="onEdit(this)" id="Edit">Edit</a>/
    <a onClick="updatefunc(totalUsers)" id="save" >Save</a>/
    <a data-roll = '${rollnumber}' onClick="onDelete(this)">Delete</a>`;
    row++;
    form.reset()

};

//function for select item from select tag

function printSelectedItem() {
    let e = document.getElementById("storages");
    selectedOption = e.value
}

// function for get the data from storages and store in the table
 
function persistUsers() {
    let display = document.getElementById("display");
    const usersData = JSON.parse(localStorage.getItem('users'))
    const usersDataSession = JSON.parse(sessionStorage.getItem('users'))
    totalUsers = (usersData?.length > 0) ? [...usersData] : []
    totalUsers = (usersDataSession?.length > 0) ? [...totalUsers, ...usersDataSession] : totalUsers
    totalUsers?.map((user) => {
        let newRow = display.insertRow(row);
        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let cell5 = newRow.insertCell(4);

        cell1.innerHTML = user.rollnumber;
        cell2.innerHTML = user.uname;
        cell3.innerHTML = user.subject;
        cell4.innerHTML = user.selectedOption;
        cell5.innerHTML = `<a  onClick="onEdit(this)" id="Edit">Edit</a>/
                          <a onClick="updatefunc(totalUsers)" id="save" >Save</a>/
                          <a data-roll = '${user.rollnumber}' onClick="onDelete(this)">Delete</a>`;
        row++;
    })
}

// Function for edit data on the table and storages also

function onEdit(tr) {
    console.log(tr);
    selectedRow = tr.parentElement.parentElement;
    document.querySelector("#rollnumber").value = selectedRow.cells[0].innerHTML;
    document.querySelector("#uname").value = selectedRow.cells[1].innerHTML;
    document.querySelector("#subject").value = selectedRow.cells[2].innerHTML;
    document.querySelector("#storages").value = selectedRow.cells[3].innerHTML;
}

// function for update data after edit and delete from the table and storage also

function updatefunc(ee) {
    rollnumber = document.getElementById("rollnumber").value;
    uname = document.getElementById("uname").value;
    subject = document.getElementById("subject").value;
    printSelectedItem();
    const form = document.getElementById("form")
    const users = {
        rollnumber,
        uname,
        subject,
        selectedOption
    }
    if (!rollnumber || !uname || !subject) {
        alert("Please fill all the above");
        return;
    }

    const findDetail = totalUsers.filter((user) => user.rollnumber !== rollnumber)

    totalUsers = [...findDetail, users]
        let filterLocal = totalUsers.filter((user) => user.selectedOption === "Local Storage")
        localStorage.setItem('users', JSON.stringify(filterLocal))
        let filterSession = totalUsers.filter((user) => user.selectedOption === "SessionStorage")
        sessionStorage.setItem('users', JSON.stringify(filterSession))
    row = 1
    display = document.getElementById("display");
    window.location.reload()
}

// function for delete data from the table and storage also

function onDelete(user) {
    const getRollNo = user.dataset.roll
    const findDetail = totalUsers.filter((user) => user.rollnumber !== getRollNo)
    totalUsers = [...findDetail]
    let filterLocal = totalUsers.filter((user) => user.selectedOption === "Local Storage")
        localStorage.setItem('users', JSON.stringify(filterLocal))
    let filterSession = totalUsers.filter((user) => user.selectedOption === "SessionStorage")
        sessionStorage.setItem('users', JSON.stringify(filterSession))
    window.location.reload()
}