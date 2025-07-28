document.addEventListener('DOMContentLoaded', function() {
    const number_1 = document.getElementById('number_1');
    const number_2 = document.getElementById('number_2');
    const addButton = document.getElementById('addButton');
    const resultText = document.getElementById('resultText');
    
    addButton.addEventListener('click', function(){
        const num1 =number_1.value.trim();
        const num2 =number_2.value.trim();
    
        if(
            num1===''|| 
            num2===''|| 
            isNaN(Number(num1)) || 
            isNaN(Number(num2))) {
                resultText.textContent ='Por favor, ingrese numeros validos.';
                return;
    }
       
        
    
        let result =Number(num1)+Number(num2);
        resultText.textContent=result;
    });
    
    
    
    });