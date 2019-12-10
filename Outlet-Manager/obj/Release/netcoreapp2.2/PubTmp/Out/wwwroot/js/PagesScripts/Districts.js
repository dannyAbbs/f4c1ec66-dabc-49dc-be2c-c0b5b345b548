if ($("#districts-table").length !== 0) {
    districtsTable = $("#districts-table").DataTable({
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
                title: "Region",
                data: "region"
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
                        <i class="fa fa-edit edit-district"></i>&nbsp;<i class="fa fa-trash text-danger delete-district"></i>
                    </li>
                    </ul>`
            }
        ]
    });
}

let districtPkId = 0; updateStatus = 0;

const loadRegions = () => {
    mthdGet(searchCodesByTypeAPI("!", "REGS"))
        .done(function (data) {
            populateSelectBox("cmbRegion", "Select Region", data);
        });
};

const clearDistrictForm = () => {
    $('#mdlDistricts input, #mdlDistricts textarea').val("");
    $('#mdlDistricts select').val(0);
    districtPkId = 0;
    updateStatus = 0;
    document.querySelector('#txtCode').disabled = false;
};

const loadDistrictsIntoGrid = () => {
    districtsTable.rows().remove().draw();
    if (document.querySelector('#txtSearch').value === '') return false;        
        mthdGet(searchDistrictAPI(document.querySelector('#txtSearch').value))
            .done(function (data) {
                populateTable(districtsTable, data);
            });
};

loadRegions();

document.querySelector('#btnAdd').addEventListener('click', function () {
    $("#mdlDistricts").modal("show");
    document.querySelector('#mdlDistricts .modal-title').innerHTML = getModalTitleFromPage();
    clearDistrictForm();
});

document.querySelector('#btnSubmit').addEventListener('click', function () {
    let dataForm = {
        szCode: document.querySelector('#txtCode').value,
        szName: document.querySelector('#txtName').value,
        szNotes: document.querySelector('#txtNotes').value,
        iStatus: document.querySelector('#cmbStatus').value,
        iUserId: userId,
        iRegion: document.querySelector('#cmbRegion').value,
        pkId: districtPkId
    };

    let url = Number(updateStatus) === 0 ? postDisrictAPI() : putDisrictAPI(),
        method = Number(updateStatus) === 0 ? "POST" : "PUT";

    mthdPutOrPost(url, method, dataForm, "#mdlDistricts")
        .done(function () {
            loadDistrictsIntoGrid();
        });
});

document.querySelector('#btnSearch').addEventListener('click', function () {
    loadDistrictsIntoGrid();
});

document.querySelector('#txtSearch').addEventListener('keyup', function (e) {
    if (Number(e.which) === 13)
        loadDistrictsIntoGrid();
});

let loadDistrictDataEdit = (data) => {
    document.querySelector("#txtCode").value = data.szCode;
    document.querySelector('#txtName').value = data.szName;
    document.querySelector('#cmbStatus').value = data.iStatus;
    document.querySelector('#cmbRegion').value = data.iRegion;
    document.querySelector('#txtNotes').value = data.szNotes;
    districtPkId = data.pkId;
};

$('#districts-table').on('click', 'td .edit-district', function () {
    let rowData = districtsTable.row($(this).closest('tr')).data();
    updateStatus = 1;
    document.querySelector('#btnSubmit').innerHTML = 'Update';
    $("#mdlDistricts").modal("show");
    document.querySelector('#mdlDistricts .modal-title').innerHTML = `${rowData.szName}`;
    loadDistrictDataEdit(rowData);
    document.querySelector('#txtCode').disabled = true;
});

$('#districts-table').on('click', 'td .delete-district', function () {
    let rowData = districtsTable.row($(this).closest('tr')).data();
    document.querySelector('#txtDeleted').innerHTML = `${rowData.szName}`;
    loadDistrictDataEdit(rowData);
    $("#mdlDelete").modal("show");
    $(this).prop("id", "deleteThis");
});

document.querySelector("#btnYes").addEventListener("click", function () {
    mthdDelete(deleteDisrictAPI(districtPkId)).done(function () {
        districtsTable.row($('#deleteThis').parents('tr')).remove().draw();
    });
});
