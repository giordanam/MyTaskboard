//definizione dello stato globale
let tasks = [
    {
        id: "1",
        title: "Testare l'architettura",
        description: "Se vedo questa card, l'HTML funziona!",
        labelValue: "dev-new",
        labelText: "Sviluppo",
        state: "to-do",
        stateText: "Da fare",
        userValue: "giordana",
        userText: "Giordana Martucci",
        expire: "2026-12-31"
    }
]

//object mapping
const columns = {
    "to-do": document.getElementById("col-todo"),
    "in-progress": document.getElementById("col-in-progress"),
    "done": document.getElementById("col-done")
}

function updateUI() {
    Object.values(columns).forEach(column => {if (column) column.innerHTML = ""})

    tasks.forEach(task => {
        //estraggo SOLO i dati che mi servono
        const {id, title, labelText, state, userText, expire} = task

        //sistemo le iniziali per farle apparire a schermo
        const initials = userText.trim().split(/\s+/).map(word => word[0]).join("").substring(0,2).toUpperCase()

        const cardHTML = `
            <div class="bg-white p-4 rounded-lg shadow task-card cursor-pointer" data-id="${id}">
                <div class="mb-2">
                    <span class="inline-block px-2 py-1 font-bold text-sky-700 bg-sky-100 rounded">${labelText}</span>
                </div>
                <h3 class="text-sm font-bold text-gray-800 mb-4 js-card-title">${title}</h3>
                <div class="flex justify-between items-center mt-auto">
                    <div class="flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                        <span class="js-card-expire">${expire}</span>
                    </div>
                    <div class="w-9 h-9 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center js-card-user">${initials}</div>
                </div>
            </div>`

        //salvataggio nella colonna corretta
        //legge lo state trova la colonna nel dizionario, se c'è la inietta nel posto giusto della UI
        columns[state]?.insertAdjacentHTML("beforeend", cardHTML)
    })
}

updateUI()