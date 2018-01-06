

function calc(radius) {
  
    var result;
    
    result = 2*Math.PI*radius;
    
    return Math.round(result);
    
}

function display(text) {
  var output = document.createElement("pre");
  output.textContent = text;
  document.body.appendChild(output);
}

display("The perimeter is: " + calc(4));
display("The perimeter is: " + calc(21));
display("The perimeter is: " + calc(3.6));
display("The perimeter is: " + calc(63));

function area(a, b, c) {
  
  var result;
  
  result = (a*b)+(a*(c-b)/2);
  
  return Math.round(result*100)/100;

}

function display(text) {
  var output = document.createElement("pre");
  output.textContent = text;
  document.body.appendChild(output);
}

display("The area is: " + area(5, 6, 9));
display("The area is: " + area(3, 4, 5));
display("The area is: " + area(6, 10, 6));
display("The area is: " + area(4, 5, 8));
