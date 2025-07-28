document.addEventListener("DOMContentLoaded",function(){
    const inputBox = document.getElementById('inputBox');
    const outputBox = document.getElementById('outputBox'); 

    inputBox.addEventListener('input',function(){
        const message = inputBox.value.toUpperCase();
        outputBox.textContent = message;

    });
});