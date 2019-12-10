let DataTablelengthMenu = [5, 10, 20],
    tableBtnWidth = screen.width < 1400 ? "12%" : "8%",
    userId = loginData.PkID;

$.ajaxSetup({
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json, text/html',
        'Authorization': `Bearer ${loginData.token}`
    }
});



const pageLoader = (strType, parent = "body") => {
    let something;
    let theName = strType.toLowerCase();
    something = theName === 'show' ? $(parent).LoadingOverlay("show", { background: "rgba(0,0,0,0.6)" }) :
        theName === 'hide' ? $(parent).LoadingOverlay("hide", true) : console.log('Contact CoderBot if Loader does not work!');
    return something;
};

const getPageNameFromURL = (url) => {
    let urlSplit = url.split("/"),
        urlSplitFinal = urlSplit[urlSplit.length - 1];

    return urlSplitFinal || "Dashboard";
};

const setPageName = (urlValue) => {
    urlValue = urlValue.replace(/-/g, ' ');
    document.querySelector('#pageName').innerHTML = urlValue;
};

const setActivePage = (urlValue) => {
    var currentPage = document.querySelector(`.${urlValue.toLowerCase()}`);
    if (currentPage) {
        currentPage.className += ' active';
        currentPage.closest('div').className += " show"; //if it has a parent menu, this happens;
    }    
};

const getModalTitleFromPage = () => {
    return `Add ${document.querySelector('#pageName').innerHTML}`;
};

//load statuses
(() => {
    try {
        document.querySelector("#cmbStatus")
            .innerHTML = `<option value="0" selected>Select Status</option>
                              <option value="29794592-76b7-4a16-ae76-7042c1c8534d">Inactive</option>
                              <option value="f3355609-a598-433a-9edc-3137768fd52b">Active</option>`;
    } catch (e) {
        console.log('empty');
    }
})();

setPageName(getPageNameFromURL(window.location.href));
setActivePage(getPageNameFromURL(window.location.href));

//enable button only when user enters a search item
let searchInput = document.querySelector('#txtSearch');
if (searchInput) {
    searchInput.addEventListener('keyup', function () {
        document.querySelector('#btnSearch').disabled = document.querySelector('#txtSearch').value ? false : true;
    });
}

let NoButtonDeleteModal = document.querySelector('#btnNoDelete');
if (NoButtonDeleteModal) {
    NoButtonDeleteModal.addEventListener('click', function () {
        $("td .fa-trash").removeAttr("id");
    });
}

//Example value = '500' standard='en' or 'fr' if you want decimal places dec must be > 0
const moneyInTxt = (value, dec = 0) => {
    nf = new Intl.NumberFormat('en', {
        minimumFractionDigits: dec,
        maximumFractionDigits: 2
    });

    return nf.format(value);
};

//removes commas
const moneyInNum = (value) => value.replace(/,/g, '');

$('.commaSeparator')
    .focusout(function () {
        $(this).val(moneyInNum($(this).val()));//first, clean value by removing all commas
        $(this).val(moneyInTxt($(this).val(), 2));
        if ($(this).val() === 'NaN') {
            $(this).val('');
        }
    })
    .focus(function () {
        $(this).val(moneyInNum($(this).val()));
    });

const emptyFormErrPrompt = (formFieldVal) => {
    if (document.querySelector(formFieldVal).value === "" || !document.querySelector(formFieldVal).value) {
        toastr.info('<b>' + $(formFieldVal).parent().children('label').text() + '</b> cannot be empty');
        return false;
    }
};

const selectFormErrPrompt = (formFieldVal) => {
    if (Number(document.querySelector(formFieldVal).value) === 0) {
        toastr.info('Select a <b>' + $(formFieldVal).parent().children('label').text() + '</b>');
        return false;
    }
};

const validateEmail = (formFieldVal) => {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (re.test(String(document.querySelector(formFieldVal).value).toLowerCase()) === false) {
        toastr.info('<b>' + $(formFieldVal).parent().children('label').text() + '</b> is not a valid email');
        return false;
    }
};

