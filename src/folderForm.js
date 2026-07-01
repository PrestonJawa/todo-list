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

    openEdit(name, id) {
        this.mode = "edit";
        this.editingId = id;
        this.name = name;
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
}