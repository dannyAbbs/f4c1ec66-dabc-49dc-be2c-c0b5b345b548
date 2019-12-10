document.querySelector("#txtEmail").innerHTML = loginData.Email;

document.querySelector("#btnChangePassword").addEventListener("click", function () {
    $("#mdlPassword").modal("show");
});

document.querySelector('#btnSubmit').addEventListener('click', function () {
    if (emptyFormErrPrompt('#txtCurrentPassword') === false) return;
    if (emptyFormErrPrompt('#txtNewPassword') === false) return;
    if (selectFormErrPrompt('#txtConfirmNewPassword') === false) return;
    if ($('#txtNewPassword').val() !== $('#txtConfirmNewPassword').val()) {
        toastr.info("<b>New password</b> and <b>Confirm new password</b> do not match");
        return false;
    }

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