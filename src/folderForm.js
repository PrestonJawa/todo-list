export class FolderForm {
    constructor() {
        this.folderScreen = document.querySelector("#folder-screen");
        this.form = this.folderScreen.querySelector("form");
        this.title = this.form.querySelector("#folder-name");
        this.close = this.form.querySelector(".close");
        this.submit = this.form.querySelector('button[type="submit"]')

        this.mode = "create";
        this.editingId = null;
    }

    get name() {
        return this.title.value;
    }

    set name(value) {
        this.title.value = value;
    }

    openCreate() {
        this.mode = "create";
        this.editingId = null;
        this.name = "";
        this.show();
    }

    openEdit(id, currentName) {
        this.mode = "edit";
        this.editingId = id;
        this.name = currentName;
        this.show();
    }

    show() {
        this.folderScreen.classList.add("show");
    }

    hide() {
        this.folderScreen.classList.remove("show");
    }

    clear() {
        this.mode = "create";
        this.editingId = null;
        this.name = "";
    }

    _initialize(){
        this.close.addEventListener("click", () => {
            this.folderForm.hide();
            this.folderForm.clear();
        });

        this.submit.addEventListener("submit", (e) => {
            e.preventDefault();

            if (this.folderForm.mode == "create") {
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