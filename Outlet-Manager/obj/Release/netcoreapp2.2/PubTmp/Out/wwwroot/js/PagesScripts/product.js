if ($("#product-table").length !== 0) {
    productTable = $("#product-table").DataTable({
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
                width: "12%",
                title: "Cost Price",
                data: "nCostPrice"
            },
            {
                width: "12%",
                title: "Unit Price",
                data: "nUnitPrice"
            },
            {
                width: "12%",
                title: "Status",
                data: "status"
            },
            {
                width: "9%",
                orderable: false,
                title: "Action",
                data: null,
                defaultContent: `<ul class="list-inline">
                    <li><i class="fa fa-edit edit-product"></i>&nbsp;<i class="fa fa-trash text-danger delete-product"></i></li></ul>`
            }
        ]
    });
}

let updateStatus = 0, productPkId = 0;

const loadProductClass = () => {
    mthdGet(searchCodesByTypeAPI("!", "PDCS"))
        .done(function (data) {
            populateSelectBox("cmbProductClass", "Select Product Class", data);
        });
};

loadProductClass();

const clearProductForm = () => {
    $('#mdlProduct input, #mdlProduct textarea').val("");
    $('#mdlProduct select').val(0);    
    document.querySelector('#btnSubmit').innerHTML = 'Submit';
    document.querySelector('#txtCode').disabled = false;
};

const loadProductsIntoGrid = () => {
    productTable.rows().remove().draw();
    if (document.querySelector('#txtSearch').value === '') return false;
        mthdGet(searchProductAPI(document.querySelector('#txtSearch').value.trim()))
            .done(function (data) {
                populateTable(productTable, data);
            });
};

document.querySelector('#btnAdd').addEventListener('click', function () {
    $("#mdlProduct").modal("show");
    document.querySelector('#mdlProduct .modal-title').innerHTML = getModalTitleFromPage();
    clearProductForm();
    updateStatus = 0;
    productPkId = 0;
});

document.querySelector('#btnSearch').addEventListener('click', function () {
    loadProductsIntoGrid();
});

document.querySelector('#txtSearch').addEventListener('keyup', function (e) {
    if (Number(e.which) === 13)
        loadProductsIntoGrid();
});

document.querySelector('#btnSubmit').addEventListener('click', function () {
    if (emptyFormErrPrompt('#txtCode') === false) return;
    if (emptyFormErrPrompt('#txtName') === false) return;
    if (emptyFormErrPrompt('#txtCost') === false) return;
    if (emptyFormErrPrompt('#txtPrice') === false) return;
    if (selectFormErrPrompt('#cmbProductClass') === false) return;
    if (selectFormErrPrompt('#cmbStatus') === false) return; 

    let dataForm = {
        szCode: document.querySelector('#txtCode').value,
        szName: document.querySelector('#txtName').value,
        szDescription: document.querySelector('#txtNotes').value,
        iStatus: document.querySelector('#cmbStatus').value,
        iUserId: userId,
        pkId: productPkId,       
        "nCostPrice": moneyInNum(document.querySelector('#txtCost').value),
        "nUnitPrice": moneyInNum(document.querySelector('#txtPrice').value),
        "iStockLevel": 0,
        "iProductClass": document.querySelector('#cmbProductClass').value,
    };

    let url = Number(updateStatus) === 0 ? postProductAPI() : putProductAPI(),
        method = Number(updateStatus) === 0 ? "POST" : "PUT";

    mthdPutOrPost(url, method, dataForm, "#mdlProduct").
        done(function () {
            if (method === "PUT")
            loadProductsIntoGrid();
        });
});

let loadProductDataEdit = (data) => {
    document.querySelector("#txtCode").value = data.szCode;
    document.querySelector('#txtName').value = data.szName;
    document.querySelector('#txtNotes').value = data.szDescription;
    document.querySelector('#cmbStatus').value = data.iStatus;
    document.querySelector("#txtCost").value = moneyInTxt(data.nCostPrice);
    document.querySelector('#txtPrice').value = moneyInTxt(data.nUnitPrice);
    document.querySelector('#cmbProductClass').value = data.iProductClass;
    productPkId = data.pkId;
};

$('#product-table').on('click', 'td .edit-product', function () {
    let rowData = productTable.row($(this).closest('tr')).data();
    updateStatus = 1;
    document.querySelector('#btnSubmit').innerHTML = 'Update';  
    $("#mdlProduct").modal("show");
    document.querySelector('#mdlProduct .modal-title').innerHTML = `${rowData.szName}`;
    loadProductDataEdit(rowData);
    document.querySelector('#txtCode').disabled = true;
});

$('#product-table').on('click', 'td .delete-product', function () {
    let rowData = productTable.row($(this).closest('tr')).data();
    document.querySelector('#txtDeleted').innerHTML = `${rowData.szName}`;
    loadProductDataEdit(rowData);
    $("#mdlDelete").modal("show");
    $(this).prop("id", "deleteThis");
});

document.querySelector("#btnYes").addEventListener("click", function () {
    mthdDelete(deleteProductAPI(productPkId)).done(function () {
        productTable.row($('#deleteThis').parents('tr')).remove().draw();
    });
});