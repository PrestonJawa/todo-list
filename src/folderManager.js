import { Folder } from "./folder.js";
import { FolderForm } from "./folderForm.js";

export class FolderManager {

    constructor() {
        this.folderForm = new FolderForm();
        this.folder = new Folder(this.folderForm);

        this.folderScreen = document.querySelector("#folder-screen");
        this.form = this.folderScreen.querySelector("form");
        this.close = this.form.querySelector(".close");
        this.newFolderButton = document.querySelector(".folder-button");

        this._initialize();
    }

    setTodoManager(todoManager){
        this.todoManager = todoManager;
        this.folder.setManager(todoManager);
    }

    _initialize() {
        this.newFolderButton.addEventListener("click", () => {
            this.folderForm.openCreate();
        });

        this.close.addEventListener("click", () => {
            this.folderForm.hide();
            this.folderForm.clear();
        });

        this.folderForm.form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (this.folderForm.mode == "create") {
                this.folder.createFolder(this.folderForm.name);
            } else {
                this.folder.renameFolder(this.folderForm.name, this.folderForm.editingId);
            }

            this.folderForm.hide();
            this.folderForm.clear();
        });
    }
}