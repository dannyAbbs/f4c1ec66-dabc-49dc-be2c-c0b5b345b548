if ($("#pump-table").length !== 0) {
    pumpTable = $("#pump-table").DataTable({
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
                title: "Outlet",
                data: "retailOutlet"
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
                    <li><i class="fa fa-edit edit-pump"></i>&nbsp;<i class="fa fa-trash text-danger delete-pump"></i></li></ul>`
            }
        ]
    });
}

let updateStatus = 0, pumpPkId=0;

const clearPumpForm = () => {
    $('#mdlPump input, #mdlPump textarea').val("");
    $('#mdlPump select').val(0);
    document.querySelector('#btnSubmit').innerHTML = 'Submit';
    document.querySelector('#txtCode').disabled = false;
};

const loadPumpsIntoGrid = () => {
    pumpTable.rows().remove().draw();
    if (document.querySelector('#txtSearch').value === '') return false;       
        mthdGet(searchPumpAPI(document.querySelector('#txtSearch').value.trim()))
            .done(function (data) {
                populateTable(pumpTable, data);
            });
};

//load retail outlets
(() => {
    mthdGet(searchOutletAPI("!"))
        .done(function (data) {
            populateSelectBox("cmbOutlet", "Select Outlet", data);
        });
})();


document.querySelector('#btnAdd').addEventListener('click', function () {
    $("#mdlPump").modal("show");
    document.querySelector('#mdlPump .modal-title').innerHTML = getModalTitleFromPage();
    clearPumpForm();
    updateStatus = 0;
    pumpPkId = 0;
});

document.querySelector('#btnSubmit').addEventListener('click', function () {
    if (emptyFormErrPrompt('#txtCode') === false) return;
    if (emptyFormErrPrompt('#txtName') === false) return;
    if (selectFormErrPrompt('#cmbOutlet') === false) return;
    if (emptyFormErrPrompt('#txtInitialReading') === false) return;
    if (selectFormErrPrompt('#cmbStatus') === false) return; 

    let dataForm = {
        szCode: document.querySelector('#txtCode').value,
        szName: document.querySelector('#txtName').value,
        iStatus: document.querySelector('#cmbStatus').value,
        iUserId: userId,
        pkId: pumpPkId,
        "iRetailOutletId": document.querySelector('#cmbOutlet').value,
        "nInitMeterReading": moneyInNum(document.querySelector('#txtInitialReading').value)
    };

    let url = Number(updateStatus) === 0 ? postPumpAPI() : putPumpAPI(),
        method = Number(updateStatus) === 0 ? "POST" : "PUT";

    mthdPutOrPost(url, method, dataForm, "#mdlPump").
        done(function () {
            loadPumpsIntoGrid();
        });
});

document.querySelector('#btnSearch').addEventListener('click', function () {
    loadPumpsIntoGrid();
});

document.querySelector('#txtSearch').addEventListener('keyup', function (e) {
    if (Number(e.which) === 13)
        loadPumpsIntoGrid();
});


let loadPumpDataEdit = (data) => {
    document.querySelector("#txtCode").value = data.szCode;
    document.querySelector('#txtName').value = data.szName;
    document.querySelector('#cmbStatus').value = data.iStatus;
    document.querySelector('#cmbOutlet').value = data.iRetailOutletId;
    document.querySelector('#txtInitialReading').value = moneyInTxt(data.nInitMeterReading);
    pumpPkId = data.pkId;
};

$('#pump-table').on('click', 'td .edit-pump', function () {
    let rowData = pumpTable.row($(this).closest('tr')).data();
    updateStatus = 1;
    document.querySelector('#btnSubmit').innerHTML = 'Update';
    $("#mdlPump").modal("show");
    document.querySelector('#mdlPump .modal-title').innerHTML = `${rowData.szName}`;
    loadPumpDataEdit(rowData);
    document.querySelector('#txtCode').disabled = true;
});

$('#pump-table').on('click', 'td .delete-pump', function () {
    let rowData = pumpTable.row($(this).closest('tr')).data();
    document.querySelector('#txtDeleted').innerHTML = `${rowData.szName}`;
    loadPumpDataEdit(rowData);
    $("#mdlDelete").modal("show");
    $(this).prop("id", "deleteThis");
});

document.querySelector("#btnYes").addEventListener("click", function () {
    mthdDelete(deletePumpAPI(pumpPkId)).done(function () {
        pumpTable.row($('#deleteThis').parents('tr')).remove().draw();
    });
});