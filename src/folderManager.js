import { Folder } from "./folder.js";
import { FolderForm } from "./folderForm.js";

export class FolderManager {
    constructor() {
        this.container = document.querySelector(".folders");

        this.folderForm = new FolderForm();
        this.folder = new Folder(
            this.container,
            this.folderForm
        );

        this.newFolderButton = document.querySelector(".folder-button");
        this.closeButton = document.querySelector(".close");

        this.initialize();
    }

    initialize() {
        this.newFolderButton.addEventListener("click", () => {
            this.folderForm.openCreate();
        });

        this.closeButton.addEventListener("click", () => {
            this.folderForm.hide();
            this.folderForm.clear();
        });

        this.folderForm.form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (this.folderForm.mode === "create") {
                this.folder.createFolder(this.folderForm.name);
            } else {
                this.folder.renameFolder(
                    this.folderForm.editingId,
                    this.folderForm.name
                );
            }

            this.folderForm.hide();
            this.folderForm.clear();
        });
    }
}