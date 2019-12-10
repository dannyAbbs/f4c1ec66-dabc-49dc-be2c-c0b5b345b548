if ($("#codes-table").length !== 0) {
    codesTable = $("#codes-table").DataTable({
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
                    <li><i class="fa fa-edit edit-code"></i>&nbsp;<i class="fa fa-trash text-danger delete-code"></i></li></ul>`
            }
        ]
    });
}

let szType = '', updateStatus = 0, codesPkId = 0;

switch (getPageNameFromURL(window.location.href).toLowerCase().trim()) {
    case 'region':
        szType = 'REGS';
        break;

    case 'product-class':
        szType = 'PDCS';
        break;

    case 'expense':
        szType = 'EXPS';
        break;

    case 'outlet-type':
        szType = 'OUTT';
        break;

    case 'bank':
        szType = 'BNKS';
        break;

    default:
}

const clearCodesForm = () => {
    $('#mdlCodes input, #mdlCodes textarea').val("");
    $('#mdlCodes select').val(0);    
    document.querySelector('#btnSubmit').innerHTML = 'Submit';
    document.querySelector('#txtCode').disabled = false;
};

const loadCodesIntoGrid = () => {
    codesTable.rows().remove().draw();
    if (document.querySelector('#txtSearch').value === '') return false;
        mthdGet(searchCodesByTypeAPI(document.querySelector('#txtSearch').value.trim(), szType))
            .done(function (data) {
                populateTable(codesTable, data);
            });
};

document.querySelector('#btnAdd').addEventListener('click', function () {
    $("#mdlCodes").modal("show");
    document.querySelector('#mdlCodes .modal-title').innerHTML = getModalTitleFromPage();
    clearCodesForm();
    updateStatus = 0;
    codesPkId = 0;    
});

document.querySelector('#btnSearch').addEventListener('click', function () {
    loadCodesIntoGrid();
});

document.querySelector('#txtSearch').addEventListener('keyup', function (e) {
    if (Number(e.which) === 13)
        loadCodesIntoGrid();
});

document.querySelector('#btnSubmit').addEventListener('click', function () {
    if (emptyFormErrPrompt('#txtCode') === false) return;
    if (emptyFormErrPrompt('#txtName') === false) return;
    if (emptyFormErrPrompt('#txtCode') === false) return;
    if (selectFormErrPrompt('#cmbStatus') === false) return;

    let dataForm = {
        szCode: document.querySelector('#txtCode').value,
        szName: document.querySelector('#txtName').value,
        szDescription: document.querySelector('#txtNotes').value,
        iStatus: document.querySelector('#cmbStatus').value,
        iUserId: userId,
        szType: szType,
        pkId: codesPkId
    };

    let url = Number(updateStatus) === 0 ? postCodeAPI() : putCodesAPI(),
        method = Number(updateStatus) === 0 ? "POST" : "PUT";

    mthdPutOrPost(url, method, dataForm, "#mdlCodes").
        done(function () {
            if (method === "PUT")
                loadCodesIntoGrid();
        });
});

let loadCodeDataEdit = (data) => {
    document.querySelector("#txtCode").value = data.szCode;
    document.querySelector('#txtName').value = data.szName;
    document.querySelector('#txtNotes').value = data.szDescription;
    document.querySelector('#cmbStatus').value = data.iStatus;
    codesPkId = data.pkId;
};

$('#codes-table').on('click', 'td .edit-code', function () {
    let rowData = codesTable.row($(this).closest('tr')).data();
    updateStatus = 1;
    document.querySelector('#btnSubmit').innerHTML = 'Update';  
    $("#mdlCodes").modal("show");
    document.querySelector('#mdlCodes .modal-title').innerHTML = `${rowData.szName}`;
    loadCodeDataEdit(rowData);
    document.querySelector('#txtCode').disabled = true;
});

$('#codes-table').on('click', 'td .delete-code', function () {
    let rowData = codesTable.row($(this).closest('tr')).data();
    document.querySelector('#txtDeleted').innerHTML = `${rowData.szName}`;
    loadCodeDataEdit(rowData);
    $("#mdlDelete").modal("show");
    $(this).prop("id", "deleteThis");
});

document.querySelector("#btnYes").addEventListener("click", function () {
    mthdDelete(deleteCodesAPI(codesPkId)).done(function () {
        codesTable.row($('#deleteThis').parents('tr')).remove().draw();
    });
});