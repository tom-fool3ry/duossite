let modalManager = {
    modalID : 'modal-calendar',
    init : function() {
        this.modal = document.getElementById(this.modalID);
        
        this.set_bindings();
    },
    set_bindings : function() {

        document.querySelector(`.${timeManager.timeLeftClass}`).onclick = () => {
            this.modal.style.display = "block";
        }

        document.querySelector(".close").onclick = () => {
            this.modal.style.display = "none";
        }

        window.onclick = (event) => {
            if (event.target == this.modal) {
                this.modal.style.display = "none";
            }
        }
    }
};