import {getLocalDateString} from "./helper.js";

export function getFilteredTasks(tasks, filters) {
    // Estraiamo i filtri dall'oggetto che gli passeremo
    const { searchQuery, categoryFilter, expireFilter, userFilter } = filters;

    return tasks.filter((task) => {
        const matchTitle = task.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = categoryFilter === "" || task.category === categoryFilter;
        const matchUser = userFilter === "" || task.user === userFilter;
        const today = getLocalDateString()

        const matchExpire =
            expireFilter === "" ||
            (expireFilter === "expired" && task.expire < today) ||
            (expireFilter === "not-expired" && task.expire >= today);

        return matchTitle && matchUser && matchExpire && matchCategory;
    });
}