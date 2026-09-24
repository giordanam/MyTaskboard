//recupero tutti gli ID dei buttons e gli inserisco nelle variabili

//HOME
const btnNewActivity = document.getElementById("btn-new-act")
const btnFilters = document.getElementById("btn-filters")
const btnCleanFilters = document.getElementById("btn-clean-filters")
const searchActivity = document.getElementById("search-activity")

//NEW ACTIVITY MODAL
const btnCloseNew = document.getElementById("btn-close-new")
const btnSaveNew = document.getElementById("btn-save-new")
const btnCancelNew = document.getElementById("btn-cancel-new")

//MODIFY ACTIVITY/ZOOM MODAL
const btnCloseEdit = document.getElementById("btn-close-edit")
const btnAddCheck = document.getElementById("btn-add-check")
const btnDelActivity = document.getElementById("btn-del-activity")
const btnSaveEdit = document.getElementById("btn-save-edit")
const btnCancelEdit = document.getElementById("btn-cancel-edit")

//ERROR MODAL
const btnCancelErr = document.getElementById("btn-cancel-err")
const btnExitErr = document.getElementById("btn-exit-err")

//HOME --> EVENT LISTENER BUTTONS
const gridFilters = document.getElementById("filters")
const searchInput = document.getElementById("search-input")

btnFilters.addEventListener("click", function() {
    gridFilters.classList.toggle("hidden");
})

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        console.log("Hai premuto invio! Il testo da cercare è: " + searchInput.value);
        searchInput.value = "";
        searchInput.blur()
    }
})

const labelFilter = document.getElementById("label-filter")
const dateFilter = document.getElementById("date-filter")
const userFilter = document.getElementById("user-filter")

btnCleanFilters.addEventListener("click", function() {
    labelFilter.value = "";
    dateFilter.value = "";
    userFilter.value = "";
})

//DIALOG NEW ACTIVITY
const dialogNew = document.getElementById("dialog-new")
const dialogError = document.getElementById("dialog-err")

//functions
function openDialogError() {
    dialogError.showModal()
}

function closeDialogError() {
    dialogError.close()
}

function closeNewActivity() {
    dialogNew.close()
    dialogError.close()
    //da aggiungere svuotare input
}

btnNewActivity.addEventListener("click", function (event) {
    dialogNew.showModal()
})

//event listeners
btnNewActivity.addEventListener("click", function (event) {
    dialogNew.showModal()
})

btnCloseNew.addEventListener("click", openDialogError)
btnCancelNew.addEventListener("click", openDialogError)
btnCancelErr.addEventListener("click", closeDialogError)
btnExitErr.addEventListener("click", closeNewActivity)

btnSaveNew.addEventListener("click", function (event) {
    dialogNew.close()
})