const form = document.forms.contact;
const message = document.querySelector('.form__confirmation')
let values = {};
const regexName = /^[a-zA-Z]+$/;
const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const inputFirstName = form.elements['first-name'];
const inputLastName = form.elements['last-name'];
const inputEmail = form.elements['email-user'];
const inputQuery = form.elements['query'];
const inputMessage = form.elements['message'];
const inputIsConsent = form.elements['consent'];

document.addEventListener('blur', (event) => {
    console.log(`Sucedio un evento en ${event.target}`);
})

form.addEventListener('submit', (event) => {
    deleteMessages();
    event.preventDefault();
    console.log(form);

    values = {
        firstName: inputFirstName.value,
        lastName: inputLastName.value,
        email: inputEmail.value,
        query: inputQuery.value,
        message: inputMessage.value,
        isConsent: inputIsConsent.checked
    }
    console.log(values);
    if (validateForm(values)) appearMessage();
})

function appearMessage() {
    message.classList.add('appear');
    setTimeout(() => {
        message.classList.remove('appear');
    }, 3000);
}

inputMessage.addEventListener('blur', () => {
    if (inputMessage.value.length < 1) {
        inputMessage.classList.add('error-state');
    }
    else {
        inputMessage.classList.remove('error-state');
    }
})


form.addEventListener('input', (event) => {
    if (
        event.target.closest('label[for=first-name]')
        ||
        event.target.closest('label[for=last-name]')
    ) {
        validateNameAndLastName(event);
    }
    else if (event.target.closest('label[for=email-user]')) {
        validateEmail(event);
    }
    else if (event.target.tagName === 'TEXTAREA') {
        validateMessage();
    }
    //deleteMessages();
})



const validateForm = ({ firstName, lastName, email, query, message, isConsent }) => {
    flag = false;
    if (!regexName.test(firstName)) {
        inputFirstName.classList.add('error-state');
        return flag;
    }
    if (!regexName.test(lastName)) {
        inputLastName.classList.add('error-state');
        return flag;
    }
    if (!regexEmail.test(email)) {
        inputEmail.classList.add('error-state');
        return flag;
    }
    if (query === '') {
        //alert('Favor de llenar los campos');
        document.querySelector('.error-message.radio').classList.add('js-show');
        return flag;
    }
    if (isConsent === false) {
        document.querySelector('.error-message.checkbox').classList.add('js-show');
        return flag;
    }
    flag = true;
    deleteMessages();
    return flag;
}

const deleteMessages = () => {
    document.querySelector('.error-message.radio').classList.remove('js-show');
    document.querySelector('.error-message.checkbox').classList.remove('js-show');

    document.querySelectorAll('.error-state').forEach((el) => {
        el.classList.remove('error-state');
    });
}
const validateNameAndLastName = (event) => {
    if (!regexName.test(event.target.value)) {
        event.target.classList.add('error-state');
    }
    else {
        event.target.classList.remove('error-state');
    }
}
const validateEmail = (event) => {
    if (!regexEmail.test(event.target.value)) {
        event.target.classList.add('error-state');
    } else {
        event.target.classList.remove('error-state');
    }
}
const validateMessage = () => {
    if (inputMessage.value.length < 1) {
        inputMessage.classList.add('error-state');
    }
    else {
        inputMessage.classList.remove('error-state');
    }
}
const valideConsent = (isConsent) => {
    if (isConsent === false) {
        document.querySelector('.error-message.checkbox').classList.add('js-show');
    } else {
        document.querySelector('.error-message.checkbox').classList.remove('js-show');
    }
}