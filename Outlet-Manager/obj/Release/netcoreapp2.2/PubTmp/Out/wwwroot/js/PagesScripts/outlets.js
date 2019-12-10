if ($("#outlets-table").length !== 0) {
    outletsTable = $("#outlets-table").DataTable({
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
                width: "11.8%",
                title: "Code",
                data: "szCode"
            },
            {
                title: "Name",
                data: "szName"
            },
            {
                title: "Contact Person",
                data: "szContFName",
                width: "17.8%"
            },
            {
                title: "Contact Number",
                data: "szMobileNo",
                width: "12.8%"
            },
            {
                width: "11.8%",
                title: "Status",
                data: "status"
            },
            {
                width: "9%",
                orderable: false,
                title: "Action",
                data: null,
                defaultContent: `<ul class="list-inline">
                    <li>
                        <i class="fa fa-edit edit-outlet"></i>&nbsp;<i class="fa fa-trash text-danger delete-outlet"></i>
                    </li>
                    </ul>`
            }
        ]
    });
}

let updateStatus = 0, outletsPkId = 0;

const loadTowns = () => {
    mthdGet(searchTownAPI("!"))
        .done(function (data) {
            populateSelectBox("cmbTown", "Select Town", data);
        });
};

const loadOutletsIntoGrid = () => {
    outletsTable.rows().remove().draw();
    if (document.querySelector('#txtSearch').value === '') return false;
    mthdGet(searchOutletAPI(document.querySelector('#txtSearch').value.trim()))
            .done(function (data) {
                populateTable(outletsTable, data);
            });
};


loadTowns();

const clearOutletsForm = () => {
    $('#mdlOutlets input, #mdlOutlets textarea').val("");
    $('#mdlOutlets select').val(0);
    outletsPkId = 0;
    updateStatus = 0;
    document.querySelector('#txtCode').disabled = false;
    $("#btnSubmit").text("Submit");
};

document.querySelector('#btnAdd').addEventListener('click', function () {
    $("#mdlOutlets").modal("show");
    document.querySelector('#mdlOutlets .modal-title').innerHTML = getModalTitleFromPage();
    clearOutletsForm();
});

document.querySelector('#btnSubmit').addEventListener('click', function () {
    if (emptyFormErrPrompt('#txtCode') === false) return;
    if (emptyFormErrPrompt('#txtName') === false) return;
    if (emptyFormErrPrompt('#txtLicense') === false) return;
    if (emptyFormErrPrompt('#txtLicenseDate') === false) return;    
    if (selectFormErrPrompt('#cmbTown') === false) return;
    if (selectFormErrPrompt('#cmbStatus') === false) return; 
    if (emptyFormErrPrompt('#txtAddress') === false) return; 
    if (emptyFormErrPrompt('#txtFname') === false) return; 
    if (emptyFormErrPrompt('#txtLname') === false) return; 
    if (emptyFormErrPrompt('#txtEmail') === false) return; 
    if (validateEmail('#txtEmail') === false) return; 
    if (emptyFormErrPrompt('#txtTelephone') === false) return; 
    if (emptyFormErrPrompt('#txtMobileNo') === false) return;


    let dataForm = {
        szCode: document.querySelector('#txtCode').value,
        szName: document.querySelector('#txtName').value,
        iStatus: document.querySelector('#cmbStatus').value,
        iUser: userId,        
        "szLicenseNumber": document.querySelector('#txtLicense').value,
        "dLicenseDate": document.querySelector('#txtLicenseDate').value,
        "szContFName": document.querySelector('#txtFname').value,
        "szContLName": document.querySelector('#txtLname').value,
        "uniTownId": document.querySelector('#cmbTown').value,
        "szAddress": document.querySelector('#txtAddress').value,
        "szEmail": document.querySelector('#txtEmail').value,
        "szTelephone": document.querySelector('#txtTelephone').value,
        "szMobileNo": document.querySelector('#txtMobileNo').value,
        pkId: outletsPkId
    };

    let url = Number(updateStatus) === 0 ? postOutletAPI() : putOutletAPI(),
        method = Number(updateStatus) === 0 ? "POST" : "PUT";

    mthdPutOrPost(url, method, dataForm, "#mdlOutlets").
        done(function () {
            if (method === "PUT")
                loadOutletsIntoGrid();
        });
});

document.querySelector('#txtLicenseDate').addEventListener('keypress', function (e) {
    e.preventDefault();
});

document.querySelector('#btnSearch').addEventListener('click', function () {
    loadOutletsIntoGrid();
});

let loadOutletDataEdit = (data) => {
    document.querySelector("#txtCode").value = data.szCode;
    document.querySelector('#txtName').value = data.szName;
    document.querySelector('#txtLicenseDate').value = data.dLicenseDate.split('T')[0];
    document.querySelector('#cmbStatus').value = data.iStatus;
    document.querySelector('#txtLicense').value = data.szLicenseNumber;
    document.querySelector('#txtMobileNo').value = data.szMobileNo;
    document.querySelector('#txtTelephone').value = data.szTelephone;
    document.querySelector('#txtEmail').value = data.szEmail;
    document.querySelector('#txtFname').value = data.szContFName;
    document.querySelector('#txtLname').value = data.szContLName;
    document.querySelector('#txtAddress').value = data.szAddress;
    document.querySelector('#cmbTown').value = data.uniTownId;
    outletsPkId = data.pkId;
};

$('#outlets-table').on('click', 'td .edit-outlet', function () {
    let rowData = outletsTable.row($(this).closest('tr')).data();
    updateStatus = 1;
    document.querySelector('#btnSubmit').innerHTML = 'Update';
    $("#mdlOutlets").modal("show");
    document.querySelector('#mdlOutlets .modal-title').innerHTML = `${rowData.szName}`;
    loadOutletDataEdit(rowData);
    document.querySelector('#txtCode').disabled = true;
});

$('#outlets-table').on('click', 'td .delete-outlet', function () {
    let rowData = outletsTable.row($(this).closest('tr')).data();
    document.querySelector('#txtDeleted').innerHTML = `${rowData.szName}`;
    loadOutletDataEdit(rowData);
    $("#mdlDelete").modal("show");
    $(this).prop("id", "deleteThis");
});

document.querySelector("#btnYes").addEventListener("click", function () {
    mthdDelete(deleteOutletAPI(outletsPkId)).done(function () {
        outletsTable.row($('#deleteThis').parents('tr')).remove().draw();
    });
});
