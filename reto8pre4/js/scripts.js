document.addEventListener('DOMContentLoaded', function () {
    const number_1 = document.getElementById('number_1');
    const number_2 = document.getElementById('number_2');
    const resultText = document.getElementById('resultText');

    window.calcular = function (operacion) {
        const num1 = parseFloat(number_1.value.trim());
        const num2 = parseFloat(number_2.value.trim());

        if (isNaN(num1) || isNaN(num2)) {
            resultText.textContent = 'Por favor, ingrese numeros validos.';
            return;
        }
        let result;

        switch (operacion) {
            case 'sumar':
                result =num1+num2;
                break;
            case 'restar':
                result =num1-num2;
                break;
            case 'multiplicar':
                result =num1*num2;
                break;
            case 'dividir':
                if (num2 === 0) {
                    resultText.textContent = 'No se puede dividir por cero';
                    return;
                }
                result = num1 / num2;
                break;
            default:
                result = 'Operacion no valida'



        }
        resultText.textContent = result;

    };


});