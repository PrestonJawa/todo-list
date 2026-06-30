export class Folder {
    static idCounter = 0;

    constructor(folderForm) {
        this.container = document.querySelector(".folders");
        this.folderForm = folderForm;
        this.currentFolderId = null;
        this.folders = [];
    }

    setManager(todoManager){
        this.todoManager = todoManager;
    }

    createFolder(name) {
        const folder = document.createElement("div");
        folder.classList.add("folder");

        const id = `folder-${Folder.idCounter}`;
        folder.dataset.id = id;
        Folder.idCounter++;

        const folderButton = this.createFolderNameButton(name, id);

        const buttonActions = document.createElement("div");
        buttonActions.classList.add("button-actions");

        const buttonEdit = this.createEditButton();
        const buttonDelete = this.createDeleteButton();

        buttonActions.append(buttonEdit, buttonDelete);

        folder.append(folderButton, buttonActions);
        this.container.appendChild(folder);

        const folderData = {id, name};
        this.folders.push(folderData);
        
    }

    renameFolder(newName, id) {
        const folder = this.container.querySelector(`.folder[data-id="${id}"]`);

        if (folder) {
            folder.querySelector(".folder-name").textContent = newName;
        }
    }

    createFolderNameButton(name, id) {
        const folderButton = document.createElement("button");
        folderButton.classList.add("folder-name");
        folderButton.textContent = name;

        folderButton.dataset.id = id;

        folderButton.addEventListener("click", () => {
            this.currentFolderId = id;
        });

        return folderButton;
    }

    createEditButton() {
        const buttonEdit = document.createElement("button");
        buttonEdit.classList.add("edit");
        buttonEdit.textContent = "✏️";

        buttonEdit.addEventListener("click", (e) => {
            const folder = e.currentTarget.closest(".folder");

            this.folderForm.openEdit(
                folder.dataset.id,
                folder.querySelector(".folder-name").textContent
            );
        });

        return buttonEdit;
    }

    createDeleteButton() {
        const buttonDelete = document.createElement("button");
        buttonDelete.classList.add("delete");
        buttonDelete.textContent = "✖";

        buttonDelete.addEventListener("click", (e) => {  
            this.todoManager.deleteTodosFolder(this.currentFolderId);
            e.currentTarget.closest(".folder").remove();
            this.currentFolderId = null;
            this.todoManager.todo.loadTodos(this.currentFolderId);
        });

        return buttonDelete;
    }
}