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

    //cleaning before closing
    //input text
    titleNewActivity.value = ""
    descriptionNewActivity.value = ""

    //select
    labelNewActivity.selectedIndex = 0
    stateNewActivity.selectedIndex = 0
    userNewActivity.selectedIndex = 0

    //date
    expireNewActivity.value = ""
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

//INPUT NEW ACTIVITY MODAL
const titleNewActivity = document.getElementById("title-new")
const descriptionNewActivity = document.getElementById("description-new")
const labelNewActivity = document.getElementById("category-new")
const stateNewActivity = document.getElementById("state-new")
const userNewActivity = document.getElementById("user-new")
const expireNewActivity = document.getElementById("expire-new")
const colTodo = document.getElementById("col-todo")
const colProgress = document.getElementById("col-inprogress")
const colComplete = document.getElementById("col-done")

//logica di salvataggio
btnSaveNew.addEventListener("click", function (event) {
    //pulizia errori
    const errTitle = document.getElementById("title-error")
    const errDatePast = document.getElementById("date-error-past")
    const errDateMiss = document.getElementById("date-error-miss")
    errTitle.classList.add("hidden")
    errDatePast.classList.add("hidden")
    errDateMiss.classList.add("hidden")

    //lettura dei valori OBBLIGATORI
    const title = titleNewActivity.value.trim()
    const expire = expireNewActivity.value

    const today = new Date();
    today.setHours(0, 0, 0, 0)
    const expire_date = new Date(expire)

    let isValid = true

    //check title
    if(title === "") {
        errTitle.classList.remove("hidden")
        isValid = false
    }

    //check date
    if(expire !== "" && expire_date < today) {
        errDatePast.classList.remove("hidden")
        isValid = false
    }

    if(expire === "") {
        errDateMiss.classList.remove("hidden")
        isValid = false
    }

    if(isValid) {
        //const description = descriptionNewActivity.value.trim()
        const state = stateNewActivity.value

        let colState
        //check col to put card
        if(state === "to-do") {
            colState = colTodo
        }else if(state === "in-progress") {
            colState = colProgress
        }else if(state === "done") {
            colState = colComplete
        }

        const textLabel = labelNewActivity.options[labelNewActivity.selectedIndex].text
        const textUser = userNewActivity.options[userNewActivity.selectedIndex].text
        const textState = stateNewActivity.options[stateNewActivity.selectedIndex].text

        const splitUsr = textUser.split(" ")

        let usr = ""

        if(splitUsr.length >= 2) {
            usr = splitUsr[0][0] + splitUsr[1][0]
        }else {
            usr = splitUsr[0][0]
        }

        const description = descriptionNewActivity.value.trim();
        const safeDescription = description.replace(/"/g, '&quot;')

        const newCardHTML = `
            <div class="bg-white p-4 rounded-lg shadow task-card cursor-pointer" data-label="${textLabel}" data-title="${title}" data-expire="${expire}" data-user="${userNewActivity.value}" data-description="${safeDescription}" data-state="${state}" data-edit="${textState}">
                <div class="mb-2">
                    <span class="inline-block px-2 py-1 font-bold text-sky-700 bg-sky-100 rounded">${textLabel}</span>
                </div>
                <h3 class="text-sm font-bold text-gray-800 mb-4">${title}</h3>
                <div class="flex justify-between items-center mt-auto">
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                        <span>${expire}</span>
                    </div>
                    <div class="w-9 h-9 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center">${usr}</div>
                </div>`

        colState.insertAdjacentHTML("beforeend", newCardHTML)

        //cleaning before closing
        //input text
        titleNewActivity.value = ""
        descriptionNewActivity.value = ""

        //select
        labelNewActivity.selectedIndex = 0
        stateNewActivity.selectedIndex = 0
        userNewActivity.selectedIndex = 0

        //date
        expireNewActivity.value = ""

        dialogNew.close()
    }
})

function closeEditActivity() {
    dialogEdit.close()
    dialogError.close()
}

//logica chiusura modale di errore
btnExitErr.addEventListener("click", function () {
    if (dialogNew.open) {
        closeNewActivity()
    }

    if(dialogEdit.open) {
        closeEditActivity()
    }
})


//INPUT ZOOM CARD MODAL
const dialogEdit = document.getElementById("dialog-edit")
const gridCards = document.getElementById("grid-cards")

gridCards.addEventListener("click", function (event) {
    const clickedCard = event.target.closest(".task-card")

    if (clickedCard) {

        //recupero informazioni dalla mini-card
        const cardLabel = clickedCard.dataset.label
        const cardTitle = clickedCard.dataset.title
        const cardExpire = clickedCard.dataset.expire
        const cardUser = clickedCard.dataset.user
        const cardDescription = clickedCard.dataset.description
        const cardState = clickedCard.dataset.state
        const cardStateEdit = clickedCard.dataset.edit

        //riempimento
        document.getElementById("label-edit").textContent = cardLabel
        document.getElementById("title-edit").value = cardTitle
        document.getElementById("card-user").value = cardUser
        document.getElementById("card-expire").value = cardExpire
        document.getElementById("description-edit").value = cardDescription
        document.getElementById("card-status").value = cardState
        document.getElementById("state-edit").textContent = cardStateEdit

        dialogEdit.showModal()
    }


})
//buttons event listener
btnCloseEdit.addEventListener("click", openDialogError)
//btnAddCheck
btnCancelEdit.addEventListener("click", openDialogError)

//logica recupero campi da mini card

