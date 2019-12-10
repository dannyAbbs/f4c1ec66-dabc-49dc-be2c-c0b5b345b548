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
    mthdGet(searchUserAPI(document.querySelector('#txtSearch').value.trim()))
        .done(function (data) {
            populateTable(usersTable, data);
        });
};

const loadOutlets = () => {
    mthdGet(searchOutletAPI("!"))
        .done(function (data) {
            console.log(data);
            let divContent = '';

            for (var i = 0; i < data.length; i++) {
                divContent += `<div class="col-md-6">
                                        <div style="border: 1px solid; border-radius: 5px !important; margin-top:3% !important; 
                                            padding-left: 5% !important; min-height: 30px !important; padding-top: 0.35em !important">
                                            <input type="checkbox" name="5FEA7383-E666-4860-8590-72405BC2FE65" id="${data[i].pkId}" class="menuChks"/> ${data[i].szName}
                                        </div>
                                    </div>`;
            }

            document.querySelector("#divOutletId").innerHTML = divContent;
        });
};

loadOutlets();

const loadMenusByAppId = (appId, parentBodyId) => {
    mthdGet(getMenusByAppIdAPI(appId))
        .done(function (data) {
            let divContent = '';

            for (var i = 0; i < data.length; i++) {
                divContent += `<div class="col-md-6">
                                        <div style="border: 1px solid; border-radius: 5px !important; margin-top:3% !important; 
                                            padding-left: 5% !important; height: 30px !important; padding-top: 0.35em !important">
                                            <input type="checkbox" name="${data[i].iAppId}" id="${data[i].pkId}" class="menuChks"/> ${data[i].szName}
                                        </div>
                                    </div>`;
            }

            document.querySelector(parentBodyId).innerHTML = divContent;
        });
};

loadMenusByAppId('7AF4E9A6-B1A1-4E60-BD32-529910D08AB0', '#divClientId');
loadMenusByAppId('80EDB7E6-BA7D-4CAA-B358-770935AF79DB', '#divAdminId');

$("#chkClientId, #chkAdminId, #chkOutletId").change(function () {
    if ($(this).is(':checked') === true) {
        $(this).parent().parent().children('.loadMenus').children('div').children('div').children('input').prop("checked", true);
    } else {
        $(this).parent().parent().children('.loadMenus').children('div').children('div').children('input').prop("checked", false);
    }    
});

const findCheckAll = (parentBodyId) => {
    let allChkBx = $(parentBodyId).find('.menuChks'),
        allAppMenusCheckedChkBx = $(parentBodyId).find('.menuChks:checked');

    if (Number(allChkBx.length) !== Number(allAppMenusCheckedChkBx.length)) {
        $(parentBodyId).siblings().children().prop("checked", false);
        return;
    }

    $(parentBodyId).siblings().children().prop("checked", true);
};

$(document).on('change', '.menuChks', function () {
    let findParentId = $(this).closest('.loadMenus').prop('id');
    findCheckAll(`#${findParentId}`);
});

const clearUserForm = () => {
    $('#mdlUsers input, #mdlUsers textarea').val("");
    $('#mdlUsers select').val(0);
    userPkId = 0;
    updateStatus = 0;
    $("input[type=checkbox]").prop("checked", false);
    $("#btnSubmit").text("Submit");
    document.querySelector("#txtUsername").disabled = false;
};

document.querySelector('#btnAdd').addEventListener('click', function () {
    $("#mdlUsers").modal("show");
    document.querySelector('#mdlUsers .modal-title').innerHTML = getModalTitleFromPage();
    clearUserForm();
});

document.querySelector('#btnSearch').addEventListener('click', function () {
    loadUsersIntoGrid();
});

document.querySelector('#btnSubmit').addEventListener('click', function () {
    let allAppMenusCheckedChkBx = $('.appMenus').find('.menuChks:checked');
    let allOutletsCheckedChkBx = $('.outletCls').find('.menuChks:checked');
    let segments = [];
    let menus = [];
        
    if (emptyFormErrPrompt('#txtUsername') === false) return;
    if (emptyFormErrPrompt('#txtFName') === false) return;
    if (emptyFormErrPrompt('#txtLName') === false) return;
    if (emptyFormErrPrompt('#txtEmail') === false) return;
    if (validateEmail('#txtEmail') === false) return;
    if (emptyFormErrPrompt('#txtPhone') === false) return;
    if (selectFormErrPrompt('#cmbStatus') === false) return;

    if (Number(allOutletsCheckedChkBx.length) < 1) {
        toastr.info('Assign at least one <b>outlet</b> to this user.');
        return false;
    }

    if (Number(allAppMenusCheckedChkBx.length) < 1) {
        toastr.info('Assign at least one <b>admin or client</b> right to this user.');
        return false;
    }
    
    for (var i = 0; i < allAppMenusCheckedChkBx.length; i++) {
        menus.push({
            iUser: userPkId,
            iApp: $(allAppMenusCheckedChkBx[i]).prop('name'),
            iMenu: $(allAppMenusCheckedChkBx[i]).prop('id'),
            "iStatus": "F3355609-A598-433A-9EDC-3137768FD52B",
            createdBy: userId
        });
    }

    for (var j = 0; j < allOutletsCheckedChkBx.length; j++) {
        segments.push({
            iUserId: userPkId,
            iSegmentId: $(allOutletsCheckedChkBx[j]).prop('name'),
            iSegmentItem: $(allOutletsCheckedChkBx[j]).prop('id')
        });
    }
    
    let dataForm = {
        id: userPkId,
        "userName": document.querySelector('#txtUsername').value,
        "email": document.querySelector('#txtEmail').value,
        "phoneNo": document.querySelector('#txtPhone').value,
        "firstName": document.querySelector('#txtFName').value,
        "lastName": document.querySelector('#txtLName').value,
        middleName: "",
        "user": userId,
        "status": document.querySelector('#cmbStatus').value,
        "userApp": menus,
        "userSegment": segments
    };
    
    let url = Number(updateStatus) === 0 ? postUserAPI() : putUserAPI(),
        method = Number(updateStatus) === 0 ? "POST" : "PUT";
    
    mthdPutOrPost(url, method, dataForm, "#mdlUsers")
        .done(function () {
            if (method === "PUT")
                loadUsersIntoGrid();
        });
});

document.querySelector('#txtSearch').addEventListener('keyup', function (e) {
    if (Number(e.which) === 13)
        loadUsersIntoGrid();
});

let loadUserDataEdit = (data) => {
    document.querySelector("#txtUsername").value = data.userName;
    document.querySelector("#txtUsername").disabled = true;
    document.querySelector('#txtFName').value = data.firstName;
    document.querySelector('#txtLName').value = data.lastName;
    document.querySelector('#txtEmail').value = data.email;
    document.querySelector('#txtPhone').value = data.phoneNo;
    //document.querySelector('#cmbStatus').value = data.iStatus;
    userPkId = data.id;
    
    let statusId = data.statusName.toLowerCase() === 'active' ? 'f3355609-a598-433a-9edc-3137768fd52b' : '29794592-76b7-4a16-ae76-7042c1c8534d';
    
    document.querySelector('#cmbStatus').value = statusId;
    $(`#mdlUsers input[type=checkbox]`).prop("checked", false);
   
    mthdGet(getUserSegmentsAPI(userPkId))
        .done(function (data) {
            for (var i = 0; i < data.length; i++) {
                console.log(data[i].iSegmentItem);
                $(`#divOutletId #${data[i].iSegmentItem}`).prop("checked", true);                
            }
        });

    mthdGet(getUserAccessAPI(userPkId))
        .done(function (data) {
            for (var i = 0; i < data.length; i++) {
                $(`#mdlUsers #${data[i].iMenu}`).prop("checked", true);
            }
        }); 

    let findParentId = $(this).closest('.loadMenus').prop('id');
    findCheckAll(`#${findParentId}`);
};

$('#user-table').on('click', 'td .edit-user', function () {
    let rowData = usersTable.row($(this).closest('tr')).data();
    updateStatus = 1;
    document.querySelector('#btnSubmit').innerHTML = 'Update';  
    $("#mdlUsers").modal("show");
    document.querySelector('#mdlUsers .modal-title').innerHTML = `${rowData.lastName}, ${rowData.firstName}`;
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