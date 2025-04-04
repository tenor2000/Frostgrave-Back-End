function getObjectById(listName, id) {
    const idInt = parseInt(id, 10);

    for (const obj of listName) {
        if (obj.id === idInt) {
            return obj;
        }
    }

    const error = new Error("ID not found");
    error.statusCode = 404;
    throw error;
}

export default getObjectById