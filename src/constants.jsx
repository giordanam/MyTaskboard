export const USERS = [
    {value: "giordana", label: "Giordana Martucci", initials: "GM"},
    {value: "lucio", label: "Lucio Morelli", initials: "LM"},
    {value: "matteo", label: "Matteo Di Donato", initials: "MD"},
    {value: "federico", label: "Federico Micello", initials: "FM"},
    {value: "delin", label: "Delin Squarcella", initials: "DS"}
]

export const CATEGORIES = [
    {value: "design", label: "Design"},
    {value: "dev", label: "Sviluppo"},
    {value: "release", label: "Release"},
    {value: "bug", label: "Bug"}
]

export const STATUS = [
    {
        value: "to-do",
        label: "Da fare",
        icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
        </svg>)
    },
    {
        value: "in-progress",
        label: "In corso",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        )
    },
    {
        value: "done",
        label: "Completato",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
        )
    },
]

export const EXPIRES = [
    {value: "expired", label:"Scaduto"},
    {value: "not-expired", label: "Non scaduto"}
]
