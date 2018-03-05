function takeValue(x) {
            document.getElementById('display').value += x;
}

function clearInput() {
    document.getElementById('display').value = null;
}

function calculateResult() {
    var result = eval(document.getElementById('display').value);
    document.getElementById('display').value = result.toFixed(4);
}