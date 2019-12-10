if ($("#user-table").length !== 0) {
    usersTable = $("#user-table").DataTable({
        dom: '<"top">rt<"panel-footer"<"row"<"col-md-4"<"bottom"l>><"col-md-4"<"bottom"i>><"col-md-4"<"bottom"p>>>><"clear">',
        lengthMenu: DataTablelengthMenu,
        searching: false,
        scrollY: "40vh",
        pagingType: "simple",
        fixedHeader: {
            header: true,
            headerOffset: $("#header").height()
        },
        responsive: true,
        columns: [
            {
                title: "Username",
                data: "userName"
            },
            {
                title: "First Name",
                data: "firstName"
            },
            {
                title: "Last Name",
                data: "lastName"
            },
            {
                width: "11.8%",
                title: "Status",
                data: "statusName"
            },
            {
                width: "9%",
                orderable: false,
                title: "Action",
                data: null,
                defaultContent: `<ul class="list-inline">
                    <li>
                        <i class="fa fa-edit edit-user"></i>&nbsp;<i class="fa fa-trash text-danger delete-user"></i>
                    </li>
                    </ul>`
            }
        ]
    });
}

let updateStatus = 0, userPkId = 0;


const loadUsersIntoGrid = () => {
    if (document.querySelector('#txtSearch').value)
        usersTable.rows().remove().draw();
    mthdGet(searchUserAPI("!"))
        .done(function (data) {
            populateTable(usersTable, data);
        });
};

const clearUserForm = () => {
    $('#mdlUsers input, #mdlUsers textarea').val("");
    $('#mdlUsers select').val(0);
    userPkId = 0;
    updateStatus = 0;
};

const getMenusByAppId = (appId, tabBodyId) => {
    mthdGet(getMenusByAppIdAPI(appId))
        .done(function (data) {
            let innerHTMLData = '<ul class="list-group">';
            for (var i = 0; i < data.length; i++) {
                innerHTMLData += `<li class="list-group-item">${data[i].szName} <input type="checkbox" name="${data[i].szName}" value="0" id="${data[i].pkId}"/></li>`;
            }
            
            document.querySelector(tabBodyId).innerHTML = innerHTMLData + "</ul>";
        });    
};

getMenusByAppId('80edb7e6-ba7d-4caa-b358-770935af79db','#home');
//getMenusByAppId('menu1');

document.querySelector('#btnSubmit').addEventListener('click', function () {
    if (emptyFormErrPrompt('#txtUsername') === false) return;
    if (emptyFormErrPrompt('#txtFName') === false) return;
    if (emptyFormErrPrompt('#txtLName') === false) return;
    if (emptyFormErrPrompt('#txtEmail') === false) return;
    if (validateEmail('#txtEmail') === false) return;
    if (emptyFormErrPrompt('#txtPhone') === false) return;
    if (selectFormErrPrompt('#cmbStatus') === false) return;

    let dataForm = {
        pkId: userPkId,
        "userName": document.querySelector('#txtUsername').value,
        "email": document.querySelector('#txtEmail').value,
        "password": "password",
        "phoneNo": document.querySelector('#txtPhone').value,
        "firstName": document.querySelector('#txtFName').value,
        "lastName": document.querySelector('#txtLName').value,
        "user": userId,
        "status": document.querySelector('#cmbStatus').value
    };

    let url = Number(updateStatus) === 0 ? postUserAPI() : putUserAPI(),
        method = Number(updateStatus) === 0 ? "POST" : "PUT";

    mthdPutOrPost(url, method, dataForm, "#mdlUsers");
});

document.querySelector('#btnSearch').addEventListener('click', function () {
    loadUsersIntoGrid();
});

document.querySelector('#txtSearch').addEventListener('keyup', function (e) {
    if (Number(e.which) === 13)
        loadUsersIntoGrid();
});

let loadUserDataEdit = (data) => {
    document.querySelector("#txtUsername").value = data.szCode;
    document.querySelector('#txtFName').value = data.szName;
    document.querySelector('#txtLName').value = data.szName;
    document.querySelector('#txtEmail').value = data.szContactInfoMobileNo;
    document.querySelector('#txtPhone').value = data.szContactInfoMobileNo;
    document.querySelector('#cmbStatus').value = data.iStatus;
    userPkId = data.pkId;
};

$('#user-table').on('click', 'td .edit-user', function () {
    let rowData = usersTable.row($(this).closest('tr')).data();
    updateStatus = 1;
    document.querySelector('#btnSubmit').innerHTML = 'Update';
    $("#mdlUsers").modal("show");
    document.querySelector('#mdlUsers .modal-title').innerHTML = `${rowData.szName}`;
    loadUserDataEdit(rowData);
});

$('#user-table').on('click', 'td .delete-user', function () {
    let rowData = usersTable.row($(this).closest('tr')).data();
    document.querySelector('#txtDeleted').innerHTML = `${rowData.szName}`;
    loadUserDataEdit(rowData);
    $("#mdlDelete").modal("show");
    $(this).prop("id", "deleteThis");
});

document.querySelector("#btnYes").addEventListener("click", function () {
    mthdDelete(deleteUserAPI(userPkId)).done(function () {
        usersTable.row($('#deleteThis').parents('tr')).remove().draw();
    });
});