export class Folder {
    static idCounter = 0;

    constructor(container, folderForm) {
        this.container = document.querySelector(".folders");
        this.folderForm = folderForm;
    }

    createFolder(name) {
        const folder = document.createElement("div");
        folder.classList.add("folder");

        const id = `folder-${Folder.idCounter}`;
        folder.dataset.id = id;
        Folder.idCounter++;

        const folderButton = document.createElement("button");
        folderButton.classList.add("folder-name");
        folderButton.textContent = name;

        const buttonActions = document.createElement("div");
        buttonActions.classList.add("button-actions");

        const buttonEdit = this._createEditButton();
        const buttonDelete = this._createDeleteButton();

        buttonActions.append(buttonEdit, buttonDelete);

        folder.append(folderButton, buttonActions);
        this.container.appendChild(folder);
    }

    renameFolder(id, newName) {
        const folder = this.container.querySelector(`.folder[data-id="${id}"]`);

        if (folder) {
            folder.querySelector(".folder-name").textContent = newName;
        }
    }

    _createEditButton() {
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

    _createDeleteButton() {
        const buttonDelete = document.createElement("button");
        buttonDelete.classList.add("delete");
        buttonDelete.textContent = "✖";

        buttonDelete.addEventListener("click", (e) => {
            e.currentTarget.closest(".folder").remove();
        });

        return buttonDelete;
    }
}