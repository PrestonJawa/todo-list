import { Storage } from "./storage.js"

export class Folder {

    constructor(folderForm) {
        this.container = document.querySelector(".folders");
        this.folderForm = folderForm;
        this.currentFolderId = null;
        this.folders = Storage.loadFolders();
        this.loadFolders();
    }

    setManager(todoManager){
        this.todoManager = todoManager;
    }

    createFolder(name) {
        const id = crypto.randomUUID();
        const folderData = {id, name};
        this.folders.push(folderData);

        const item = this.makeFolder(folderData);
        this.container.appendChild(item);
    }

    makeFolder(data) {
        const folder = document.createElement("div");
        folder.classList.add("folder");


        const folderButton = this.createFolderNameButton(data);

        const buttonActions = document.createElement("div");
        buttonActions.classList.add("button-actions");

        const buttonEdit = this.createEditButton(data);
        const buttonDelete = this.createDeleteButton(data.id);

        buttonActions.append(buttonEdit, buttonDelete);
        folder.append(folderButton, buttonActions);

        return folder;
    }

    renameFolder(newName, id) {
        const data = this.folders.find(folder => folder.id == id);
        data.name = newName;
        this.loadFolders();
    }

    loadFolders(){
        Storage.saveFolders(this.folders);
        this.container.innerHTML = "";

        for(let folder of this.folders){
            const item = this.makeFolder(folder);
            this.container.appendChild(item);
        }
    }

    createFolderNameButton(data) {
        const folderButton = document.createElement("button");
        folderButton.classList.add("folder-name");
        folderButton.textContent = data.name;

        folderButton.dataset.id = data.id;

        folderButton.addEventListener("click", () => {
            this.currentFolderId = data.id;
            this.todoManager.todo.loadTodos(this.currentFolderId);
        });

        return folderButton;
    }

    createEditButton(data) {
        const buttonEdit = document.createElement("button");
        buttonEdit.classList.add("edit");
        buttonEdit.textContent = "✏️";

        buttonEdit.addEventListener("click", (e) => {
            const folder = this.folders.find(item => item.id == data.id);

            this.folderForm.openEdit(folder.name, data.id);
        });

        return buttonEdit;
    }

    createDeleteButton(id) {
        const buttonDelete = document.createElement("button");
        buttonDelete.classList.add("delete");
        buttonDelete.textContent = "✖";

        buttonDelete.addEventListener("click", (e) => {  
            this.todoManager.deleteTodosFolder(id);
            this.currentFolderId = null;
            this.folders = this.folders.filter(folder => folder.id != id);
            this.loadFolders();
        });

        return buttonDelete;
    }
}