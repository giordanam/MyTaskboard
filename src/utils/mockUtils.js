import { CATEGORIES, USERS, STATUS } from "../constants.jsx";

export function formatFetchedTasks(apiData) {
    const possibleCategories = CATEGORIES.map(category => category.value);
    const possibleUsers = USERS.map(user => user.value);
    const statusNoDone = STATUS.filter(state => state.value !== "done").map(state => state.value);

    return apiData.map((task) => {
        const randomCategory = possibleCategories[Math.floor(Math.random() * possibleCategories.length)];
        const randomUser = possibleUsers[Math.floor(Math.random() * possibleUsers.length)];

        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + Math.floor(Math.random() * 10));

        return {
            id: crypto.randomUUID(),
            title: task.title,
            category: randomCategory,
            status: task.completed ? "done" : statusNoDone[Math.floor(Math.random() * statusNoDone.length)],
            user: randomUser,
            expire: expireDate.toISOString().split('T')[0],
            description: `Descrizione automatica per: "${task.title}". Verificare i requisiti.`,
            checklist: ["Lettura documentazione", "Esecuzione", "Test finale"].map((text) => ({
                id: crypto.randomUUID(),
                text,
                done: false
            }))
        };
    });
}