document.addEventListener('DOMContentLoaded', function() {
    //Obtener la referencia de los elementos de la pagina.
    const inputBox = document.getElementById('inputBox');
    const showBtn = document.getElementById('showBtn');
    const outputBox = document.getElementById('outputBox');

    //Añadir un observador al boton.
    showBtn.addEventListener('click',function(){
        const message = inputBox.value; 
        console.log('Dato ingresado', message)
        outputBox.textContent = message;
    })

})