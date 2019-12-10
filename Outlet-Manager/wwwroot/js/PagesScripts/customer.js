if ($("#customer-table").length !== 0) {
    customersTable = $("#customer-table").DataTable({
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
                data: "szContactInfoFirstName",
                width: "17.8%"
            },
            {
                title: "Contact Number",
                data: "szContactInfoMobileNo",
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
                        <i class="fa fa-edit edit-customer"></i>&nbsp;<i class="fa fa-trash text-danger delete-customer"></i>
                    </li>
                    </ul>`
            }
        ]
    });
}

let updateStatus = 0, customerPkId = 0;

const loadTowns = () => {
    mthdGet(searchTownAPI("!"))
        .done(function (data) {
            populateSelectBox("cmbTown", "Select Town", data);
        });
};

loadTowns();


const loadCustomersIntoGrid = () => {
    customersTable.rows().remove().draw();
    if (document.querySelector('#txtSearch').value === '') return false;
        mthdGet(searchCustomerAPI("!"))
            .done(function (data) {
                populateTable(customersTable, data);
            });
};


const clearCustomerForm = () => {
    $('#mdlCustomers input, #mdlCustomers textarea').val("");
    $('#mdlCustomers select').val(0);
    customerPkId = 0;
    updateStatus = 0;
    document.querySelector('#txtCode').disabled = false;
};

document.querySelector('#btnAdd').addEventListener('click', function () {
    $("#mdlCustomers").modal("show");
    document.querySelector('#mdlCustomers .modal-title').innerHTML = getModalTitleFromPage();
    clearCustomerForm();
});

document.querySelector('#btnSubmit').addEventListener('click', function () {
    if (emptyFormErrPrompt('#txtCode') === false) return;
    if (emptyFormErrPrompt('#txtName') === false) return;
    if (selectFormErrPrompt('#cmbPayCode') === false) return;
    if (selectFormErrPrompt('#cmbTown') === false) return;
    if (selectFormErrPrompt('#cmbStatus') === false) return;
    if (emptyFormErrPrompt('#txtFname') === false) return;
    if (emptyFormErrPrompt('#txtLname') === false) return;
    if (emptyFormErrPrompt('#txtEmail') === false) return; 
    if (validateEmail('#txtEmail') === false) return; 
    if (emptyFormErrPrompt('#txtAddress') === false) return;
    if (emptyFormErrPrompt('#txtTelephone') === false) return; 
    if (emptyFormErrPrompt('#txtMobileNo') === false) return; 

    let dataForm = {
        szCode: document.querySelector('#txtCode').value,
        szName: document.querySelector('#txtName').value,
        iStatus: document.querySelector('#cmbStatus').value,
        iUserId: userId,    
        "szContactInfoFirstName": document.querySelector('#txtFname').value,
        "szContactInfoLastName": document.querySelector('#txtLname').value,
        "iLocation": document.querySelector('#cmbTown').value,
        "szContactInfoAddress": document.querySelector('#txtAddress').value,
        "szContactInfoEmail": document.querySelector('#txtEmail').value,
        "szContactInfoTelNo": document.querySelector('#txtTelephone').value,
        "szContactInfoMobileNo": document.querySelector('#txtMobileNo').value,
        pkId: customerPkId,
        "iPaycodeType": document.querySelector('#cmbPayCode').value
    };

    let url = Number(updateStatus) === 0 ? postCustomerAPI() : putCustomerAPI(),
        method = Number(updateStatus) === 0 ? "POST" : "PUT";

    mthdPutOrPost(url, method, dataForm, "#mdlCustomers").
        done(function () {
            if (method === "PUT")
                loadCustomersIntoGrid();
        });
});

document.querySelector('#btnSearch').addEventListener('click', function () {
    loadCustomersIntoGrid();
});

document.querySelector('#txtSearch').addEventListener('keyup', function (e) {
    if (Number(e.which) === 13)
        loadCustomersIntoGrid();
});

let loadOutletDataEdit = (data) => {
    document.querySelector("#txtCode").value = data.szCode;
    document.querySelector('#txtName').value = data.szName;
    document.querySelector('#cmbStatus').value = data.iStatus;
    document.querySelector('#txtMobileNo').value = data.szContactInfoMobileNo;
    document.querySelector('#txtTelephone').value = data.szContactInfoTelNo;
    document.querySelector('#txtEmail').value = data.szContactInfoEmail;
    document.querySelector('#txtFname').value = data.szContactInfoFirstName;
    document.querySelector('#txtLname').value = data.szContactInfoLastName;
    document.querySelector('#txtAddress').value = data.szContactInfoAddress;
    document.querySelector('#cmbTown').value = data.iLocation;
    document.querySelector('#cmbPayCode').value = data.iPaycodeType;
    customerPkId = data.pkId;
};

$('#customer-table').on('click', 'td .edit-customer', function () {
    let rowData = customersTable.row($(this).closest('tr')).data();
    updateStatus = 1;
    document.querySelector('#btnSubmit').innerHTML = 'Update';
    $("#mdlCustomers").modal("show");
    document.querySelector('#mdlCustomers .modal-title').innerHTML = `${rowData.szName}`;
    loadOutletDataEdit(rowData);
    document.querySelector('#txtCode').disabled = true;
});

$('#customer-table').on('click', 'td .delete-customer', function () {
    let rowData = customersTable.row($(this).closest('tr')).data();
    document.querySelector('#txtDeleted').innerHTML = `${rowData.szName}`;
    loadOutletDataEdit(rowData);
    $("#mdlDelete").modal("show");
    $(this).prop("id", "deleteThis");
});

document.querySelector("#btnYes").addEventListener("click", function () {
    mthdDelete(deleteCustomerAPI(customerPkId)).done(function () {
        customersTable.row($('#deleteThis').parents('tr')).remove().draw();
    });
});
