// FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyASEZ4xAcNJrzfoZP0Pomveb0lh51v4O88",
  
    authDomain: "form-validation-5e9b0.firebaseapp.com",
  
    projectId: "form-validation-5e9b0",
  
    storageBucket: "form-validation-5e9b0.appspot.com",
  
    messagingSenderId: "85902447475",
  
    appId: "1:85902447475:web:e06a4a2b8ab8cf84652b06",

    measurementId: "G-GD3HSV4MRJ"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

// variables del proyecto
const formulario = document.getElementById("formulario");
let emailInput = document.getElementById("email")
let emailError = document.getElementById("emailError")
let contrasenaInput = document.getElementById("contrasena")
let contrasenaError = document.getElementById("contrasenaError")
let confirmarContrasena= document.getElementById("confirmarContrasena")
let confirmarContrasenaError = document.getElementById("confirmarContrasenaError")

const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/; // validacion REGEX password (debe tener al menos 8 caracteres de longitud, al menos un digito (?=.*\d), al menos una letra minuscula y al menos una letra mayuscula)

formulario.addEventListener("submit", (event) => {
    event.preventDefault()

    if (!emailPattern.test(emailInput.value)) {
      emailError.textContent = "Por favor ingresa un email valido";
      emailError.classList.add("error-message");
    } else {
        emailError.textContent = ""
        emailError.classList.remove("error-message")
    }

    if (!passPattern.test(contrasenaInput.value)) {
    contrasenaError.textContent = "La contraseña debe contener al menos 8 caracteres, un número, una letra minúscula y una letra mayúscula"
    contrasenaError.classList.add("error-message")
    }  else {
        contrasenaError.textContent = ""
        contrasenaError.classList.remove("error-message")
    }

    if (confirmarContrasena.value !== contrasenaInput.value || confirmarContrasena.value === "") {
        confirmarContrasenaError.textContent = "La contraseña debe coicidir"
        confirmarContrasenaError.classList.add("error-message")
        }  else {
            confirmarContrasenaError.textContent = "";
            confirmarContrasenaError.classList.remove("error-message")
        }

    if (!emailError.textContent && !contrasenaError.textContent && !confirmarContrasenaError.textContent) {

        alert("Formulario enviado correctamente")

        // aca va donde voy a alojar la coleccion en FIREBASE
        db.collection("users").add({
            email: emailInput.value,
            password: contrasenaInput.value,
            confirmPass: confirmarContrasena.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

        formulario.reset();
    }
})