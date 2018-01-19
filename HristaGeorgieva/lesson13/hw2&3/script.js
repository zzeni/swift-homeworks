
function convert(r, g, b) {
   var Hex;
   Hex = "#"+r.toString(16)+g.toString(16)+b.toString(16);
   return Hex;
  
}


function display(text) {
  var output = document.createElement("pre");
  output.textContent = text;
  document.body.appendChild(output);
}

display("The Hexadecimal value is: " + convert(255,100,108));

function circle(radius) {
  var result;
  result = Math.pow(Math.PI,2)*radius;
  return Math.round(result);
}

display("The area of the circle is: " + circle(4));
