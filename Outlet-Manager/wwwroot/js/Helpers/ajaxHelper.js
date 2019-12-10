const msg = {
    success: "Data submitted successfully",
    fail: "Unable to save ",
    noMatch: "No match found!",
    sessionExpired: "Unauthorized! Please login again.",
    unexpected: "Something unexpected happened, please contact the admin",
    successDel: "Data deleted successfully",
    nameExist: "Code or username already used."
};

const errorCodes = (code) => {
    switch (Number(code)) {
        case 401:
            toastr.info(msg.sessionExpired);
            window.location = `http://95.179.229.183/admin/landingpage`;
            break;
        case 404:
            toastr.info(msg.noMatch);
            break;
        case 409:
            toastr.info(msg.nameExist);
            break;
        case 500:
            toastr.info(msg.unexpected);
            break;
    }
};

//use this for posts and puts
const mthdPutOrPost = (URL, method, data, parentModalId = "") => {
    pageLoader("show");

    return $.ajax({
        url: URL,
        method: method,
        crossDomain: true,
        data: JSON.stringify(data),
        contentType: "application/json",
        'Authorization': `Bearer ${loginData.token}`
    })
        .done(function (e) {
            pageLoader("hide");

            if (parentModalId !== "")
                $(`${parentModalId}`).modal("hide");

            toastr.success(msg.success);
        })
        .fail(function (xhr) {
            pageLoader("hide");
            errorCodes(xhr.status);
        });
};

//use this for all get calls
const mthdGet = (URL) => {
    pageLoader("show");

    return $.ajax({
        url: URL,
        method: "GET",
        crossDomain: true,
        'Authorization': `Bearer ${loginData.token}`
    })
        .done(function (e) {
            pageLoader("hide");
        })
        .fail(function (xhr) {
            pageLoader("hide");
            errorCodes(xhr.status);
        });
};

//use this for all get calls
const mthdDelete = (URL) => {
    pageLoader("show");

    return $.ajax({
        url: URL,
        method: "DELETE",
        crossDomain: true,
        'Authorization': `Bearer ${loginData.token}`
    })
        .done(function (e) {
            pageLoader("hide");
            $(`#mdlDelete`).modal("hide");
            toastr.success(msg.successDel);
        })
        .fail(function (xhr) {
            console.log(xhr);
            pageLoader("hide");
            errorCodes(xhr.status);
        });
};

const populateTable = (tableName, data) => {
    tableName.rows().remove().draw();
    if (data)
        tableName.rows.add(data).draw().nodes();
};

const populateSelectBox = (selectId, placeholder, data) => {
    $(`#${selectId}`).html("");
    var options = `<option value="0" selected >${placeholder}</option>`;
    if (data.length > 0) {
        $(data).each(function (key, value) {
            options += '<option value="' + value.pkId + '">' + value.szName + '</option>';
        });
    }
    $(`#${selectId}`).html(options);
};