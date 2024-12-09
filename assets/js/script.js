let contactForm = document.getElementById("contact-form");
let modal = document.getElementById("myModal");
let thanksMessage = document.getElementById("thanks-message");
let span = document.getElementsByClassName("close")[0];

let formFields = {
    'name': new FormItem("nameLabel", "floatingName", "Rajoutez votre nom"),
    'mail': new FormItem("mailLabel", "floatingMail", "Ajoutez votre mail"),
    'message': new FormItem("messageLabel", "floatingMessage", "Rajoutez votre message de contact"),
};



contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (checkFormFields(formFields)) {
        thanksMessage.textContent = `Merci ${formFields['name'].input.value} !`;
        modal.style.visibility = "visible";
    }
});

function checkFormFields(fieldsArray) {
    let areValid = true;
    for (let [key, formItem] of Object.entries(fieldsArray)) {
        let isErrored = formItem.checkIfErrored();
        if (isErrored) {
            areValid = false;
            console.log(`FAUTE SUR ${formItem.value.label.textContent}`);
        }
        formItem.updateField(isErrored);
    }
    return areValid;
}


// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.visibility = "hidden";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.visibility = "hidden";
  }
}

/**
 * Represents a form item with a label and an input.
 * 
 * @param {string} labelId - the id of the label element
 * @param {string} inputId - the id of the input element
 * 
 * @property {Element} label - the label element
 * @property {Element} input - the input element
 * 
 * @method checkIfErrored - checks if the input is errored
 * @method updateFieldColor - updates the color of the label and input
 * 
 */
function FormItem(labelId, inputId, errorMessage) {
    this.label = document.getElementById(labelId);
    this.input = document.getElementById(inputId);

    this.errorSpan = document.getElementById(`error-${inputId}`);
    
    this.error = document.createElement('p');
    this.error.textContent = errorMessage;
    this.error.style.color = "red";
    this.error.setAttribute("class", "mb-4")


    this.checkIfErrored = function() {
        if (!this.input.value || !this.input.value.trim()) {
            return true;
        }
        return false;
    };

    this.updateField = function(isErrored) {
        this.input.style.borderColor = isErrored ? "red" : "light-grey";
        this.label.style.color = isErrored ? "red" : "black";
        isErrored ? this.errorSpan.appendChild(this.error) : this.error.remove();
    };
};
  