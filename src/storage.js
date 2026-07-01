export const Storage = {
    saveFolders(folders){
        localStorage.setItem("folders", JSON.stringify(folders));

    },

    loadFolders(){
        let folders = [];
        let storedFolder = localStorage.getItem("folders");
        if (storedFolder){
            folders = JSON.parse(storedFolder);
        }
        return folders;
    },

    saveTodos(todos){
        localStorage.setItem("todos", JSON.stringify(todos));
    },

    loadTodos(){
        let todos = [];
        let storedTodos = localStorage.getItem("todos");
        if (storedTodos){
            todos = JSON.parse(storedTodos);
        }
        return todos;
    }
}