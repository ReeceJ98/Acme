function loadTable() {
    const xhttp = new XMLHttpRequest();
    // xhttp.open("GET", "https://www.mecallapi.com/api/users");
    xhttp.open("GET", "http://127.0.0.1:5000/read");
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            var trHTML = '';
            const objects = JSON.parse(this.responseText)['data'];
            for (let object of objects) {
                trHTML += '<tr>';
                trHTML += '<td>' + object['EmployeeID'] + '</td>';
                // trHTML += '<td><img width="50px" src="' + object['avatar'] + '" class="avatar"></td>';
                trHTML += '<td>' + object['PersonID'] + '</td>';
                trHTML += '<td>' + object['EmployeeNum'] + '</td>';
                trHTML += '<td>' + object['EmployedDate'] + '</td>';
                trHTML += '<td>' + object['TerminatedDate'] + '</td>';
                trHTML += '<td><button type="button" class="btn btn-outline-secondary" onclick="showUserEditBox(' + object['EmployeeID'] + ')">Edit</button>';
                trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete(' + object['EmployeeID'] + ')">Del</button></td>';
                trHTML += "</tr>";
            }
            document.getElementById("mytable").innerHTML = trHTML;
        }
    };
}

loadTable();

function showUserCreateBox() {
    Swal.fire({
        title: 'Create user',
        html:
            '<input id="EmployeeID" type="hidden">' +
            '<input id="EmployeeID" class="swal2-input" placeholder="EmployeeID">' +
            '<input id="PersonID" class="swal2-input" placeholder="PersonID">' +
            '<input id="EmployeeNum" class="swal2-input" placeholder="EmployeeNum">' +
            '<input id="EmployedDate" class="swal2-input" placeholder="EmployedDate">' +
            '<input id="TerminatedDate" class="swal2-input" placeholder="TerminatedDate">',
        focusConfirm: false,
        preConfirm: () => {
            userCreate();
        }
    })
}

function userCreate() {
    const EmployeeID = document.getElementById("EmployeeID").value;
    const PersonID = document.getElementById("PersonID").value;
    const EmployeeNum = document.getElementById("EmployeeNum").value;
    const EmployedDate = document.getElementById("EmployedDate").value;
    const TerminatedDate = document.getElementById("TerminatedDate").value;

    const xhttp = new XMLHttpRequest();
    // xhttp.open("POST", "https://www.mecallapi.com/api/users/create");
    xhttp.open("POST", "http://127.0.0.1:5000/create");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    // console.log(JSON.stringify({
    //     "PersonID": PersonID, "EmployeeNum": EmployeeNum, "EmployedDate": EmployedDate, "TerminatedDate": TerminatedDate
    // }));





    xhttp.send(JSON.stringify({
        "EmployeeID": EmployeeID, "PersonID": PersonID, "EmployeeNum": EmployeeNum, "EmployedDate": EmployedDate, "TerminatedDate": TerminatedDate
    }));


    xhttp.onreadystatechange = function() {
        console.log(this.responseText)
        if (this.readyState == 4 && this.status == 200) {
            const objects = JSON.parse(this.responseText);
            Swal.fire(objects['data']);
            loadTable();
        }
    };
}