const form = document.getElementById("form");
const usermane = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';  // Le agregamos una clase nueva
    const small = formControl.querySelector('small')  // seleccionamos la etiqueta
    small.innerText = message  // Le igualamos el valor que tenemos
}

// Success Input
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
      showSuccess(input);
    } else {
      showError(input, 'Email is not valid');
    }
  }

// Check requiered fields
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {  // Barremos el arreglo
        if(input.value.trim() === ''){  // Validamos que no existan espacios
            showError(input, `${getFieldName(input)} is Required`)  // si esta vacio mandamos el error con el valor del input.id
        } else {
            showSuccess(input)  // Activamos el success
        }
    });
}

// Check input lenght 
function checkLength(input, min, max){
    if(input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} characters`)
    } else if( input.value.length > max ){
        showError(input, `${getFieldName(input)} must be less than ${max} characters`)
    }else {
        showSuccess(input)  // pasmos el input
    }
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

function getFieldName(input) {
    //  toma solo la primera letra     +       le concatenamos todo despues de la 1 letra
    return input.id.charAt(0).toUpperCase() + input.id.slice(1)
}

// Event Liseners
form.addEventListener('submit', function(e) {
    e.preventDefault()

   checkRequired([usermane, email, password, password2]) // Creamos un arreglo con todos los inputs
   checkLength(username, 3, 15);  // Definimos el tamaño min y max
   checkLength(password, 6, 25);
   checkEmail(email);
   checkPasswordsMatch(password, password2);
})


