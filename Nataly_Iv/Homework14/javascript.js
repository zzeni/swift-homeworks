//zad.1 even or odd
function calc(a) {
    if(a%2 === 0){
        return("even");
    }
    else{
        return("odd");
    }
    
}

calc(7);

//zad.2 isMember
var name = ["Gosho", "Pesho", "Mimi", "Tosho", "Katia"];

function isMember(list){
    if(list.includes(name)){
        return "yes";
    }
    else{
        return "no";
    }
}

isMember("Ivan");

//zad.3 ternaren operator
//1
function calc2(num) {
    return (num%2 === 0)? "even" : "odd";
}

calc2(7);

//2
var name = ["Gosho", "Pesho", "Mimi", "Tosho", "Katia"];

function isMember2(list){
    return (list.includes(name)) ? "yes" : "no";
 
}

isMember2("Ivan");