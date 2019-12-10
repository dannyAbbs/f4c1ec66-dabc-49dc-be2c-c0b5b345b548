if ($("#towns-table").length !== 0) {
    townsTable = $("#towns-table").DataTable({
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
                title: "District",
                data: "district"
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
                        <i class="fa fa-edit edit-town"></i>&nbsp;<i class="fa fa-trash text-danger delete-town"></i>
                    </li>
                    </ul>`
            }
        ]
    });
}

let townPkId = 0, updateStatus = 0; 

const loadRegions = () => {
    mthdGet(searchCodesByTypeAPI("!", "REGS"))
        .done(function (data) {
            populateSelectBox("cmbRegion", "Select Region", data);
        });
};

const loadDistricts = () => {
    mthdGet(searchDistrictAPI("!"))
        .done(function (data) {
            populateSelectBox("cmbDistrict", "Select District", data);
        });
};

const loadDistrictsByRegion = (regionId, selectedDistrict = "") => {
    mthdGet(searchDistrictByRegionAPI(regionId))
        .done(function (data) {
            populateSelectBox("cmbDistrict", "Select District", data);

            if (selectedDistrict !== "")
                document.querySelector("#cmbDistrict").value = selectedDistrict;
        });
};

const clearDistrictForm = () => {
    $('#mdlTowns input, #mdlTowns textarea').val("");
    $('#mdlTowns select').val(0);
    townPkId = 0;
    updateStatus = 0;
    document.querySelector('#txtCode').disabled = false;
};

const loadTownsIntoGrid = () => {
    townsTable.rows().remove().draw();
    if (document.querySelector('#txtSearch').value === '') return false;
        mthdGet(searchTownAPI(document.querySelector('#txtSearch').value.trim()))
            .done(function (data) {
                populateTable(townsTable, data);
            });
};

loadRegions();
//loadDistricts();

document.querySelector("#cmbRegion").addEventListener("change", function () {
    loadDistrictsByRegion(document.querySelector("#cmbRegion").value);
});

document.querySelector('#btnAdd').addEventListener('click', function () {
    $("#mdlTowns").modal("show");
    document.querySelector('#mdlTowns .modal-title').innerHTML = getModalTitleFromPage();
    clearDistrictForm();
});

document.querySelector('#btnSubmit').addEventListener('click', function () {
    if (emptyFormErrPrompt('#txtCode') === false) return;
    if (emptyFormErrPrompt('#txtName') === false) return;
    if (selectFormErrPrompt('#cmbRegion') === false) return;
    if (selectFormErrPrompt('#cmbDistrict') === false) return;
    if (selectFormErrPrompt('#cmbStatus') === false) return;    

    let dataForm = {
        szCode: document.querySelector('#txtCode').value,
        szName: document.querySelector('#txtName').value,
        szNotes: document.querySelector('#txtNotes').value,
        iStatus: document.querySelector('#cmbStatus').value,
        iUser: userId,
        iRegion: document.querySelector('#cmbRegion').value,
        iDistrict: document.querySelector('#cmbDistrict').value
    };

    let url = Number(updateStatus) === 0 ? postTownAPI() : putTownAPI(),
        method = Number(updateStatus) === 0 ? "POST" : "PUT";

    mthdPutOrPost(url, method, dataForm, "#mdlTowns").
        done(function () {
            loadTownsIntoGrid();
        });
});

document.querySelector('#btnSearch').addEventListener('click', function () {
    loadTownsIntoGrid();
});

document.querySelector('#txtSearch').addEventListener('keyup', function (e) {
    if (Number(e.which) === 13)
        loadTownsIntoGrid();
});

let loadTownDataEdit = (data) => {
    document.querySelector("#txtCode").value = data.szCode;
    document.querySelector('#txtName').value = data.szName;
    document.querySelector('#txtNotes').value = data.szNotes;
    document.querySelector('#cmbStatus').value = data.iStatus;
    document.querySelector('#cmbRegion').value = data.iRegion;
    loadDistrictsByRegion(data.iRegion, data.iDistrict);
    //document.querySelector('#cmbDistrict').value = data.iDistrict;
    townPkId = data.pkId;
};

$('#towns-table').on('click', 'td .edit-town', function () {
    let rowData = townsTable.row($(this).closest('tr')).data();
    updateStatus = 1;
    document.querySelector('#btnSubmit').innerHTML = 'Update';
    $("#mdlTowns").modal("show");
    document.querySelector('#mdlTowns .modal-title').innerHTML = `${rowData.szName}`;
    loadTownDataEdit(rowData);
    document.querySelector('#txtCode').disabled = true;
});

$('#towns-table').on('click', 'td .delete-town', function () {
    let rowData = townsTable.row($(this).closest('tr')).data();
    document.querySelector('#txtDeleted').innerHTML = `${rowData.szName}`;
    loadTownDataEdit(rowData);
    $("#mdlDelete").modal("show");
    $(this).prop("id", "deleteThis");
});

document.querySelector("#btnYes").addEventListener("click", function () {
    mthdDelete(deleteTownAPI(townPkId)).done(function () {
        townsTable.row($('#deleteThis').parents('tr')).remove().draw();
    });
});