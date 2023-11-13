let modalManager = {
    modalID : 'modal-calendar',
    init : function() {
        this.modal = document.getElementById(this.modalID);
        
        this.set_bindings();
    },
    set_bindings : function() {

        document.querySelector(`.${timeManager.timeLeftClass}`).onclick = () => {
            this.modal.classList.add('modal-open');
            this.modal.classList.remove('modal-close');
        }

        document.querySelector(".close").onclick = () => {
            this.modal.classList.add('modal-close');
            this.modal.classList.remove('modal-open');
        }

        window.onclick = (event) => {
            if (event.target == this.modal) {
                this.modal.classList.add('modal-close');
                this.modal.classList.remove('modal-open');
            }
        }
    }
};