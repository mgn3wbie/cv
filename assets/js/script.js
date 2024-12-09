let contactForm = document.getElementById("contact-form");
let formFields = [
    new FormItem("nameLabel", "floatingName", "Rajoutez votre nom"),
    new FormItem("mailLabel", "floatingMail", "Ajoutez votre mail"),
    new FormItem("messageLabel", "floatingMessage", "Rajoutez votre message de contact"),
];

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    checkFormFields(formFields);
});


// let dlButton = document.getElementById("dl-button");
// dlButton.addEventListener('click', () => {

// });

function checkFormFields(fieldsArray) {
    fieldsArray.forEach(formItem => {
        formItem.updateField(formItem.checkIfErrored());
    });
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
        this.input.style.borderColor = isErrored ? "red" : "black";
        this.label.style.color = isErrored ? "red" : "black";
        isErrored ? this.errorSpan.appendChild(this.error) : this.error.remove();
    };
};
  