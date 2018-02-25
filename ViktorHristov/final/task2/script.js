/* globals window,$, document */

(function () {
    "use strict";

    function display(text) {
        var output = document.createElement("pre");
        output.textContent = text;
        document.body.appendChild(output);
    }

    function numberOrder() {
        var arr = [2, 5, 8, 4, 1, 12];
        var ordered_numbers = arr.sort(function (a, b) {
            return a - b;
        });
        return ordered_numbers;
    }
    display("The ordered asc array is:\nAnswer:\t\t\t\t\t" + numberOrder());

    function extractWords() {
        var text = "The quick brown fox jumps over the lazy dog";
        var list = text.split(" ");
        var filteredWords = list.filter(function (items) {
            return items.length > 4;
        });
        return filteredWords;
    }
    display("The words are:\nAnswer:\t\t\t\t\t" + extractWords());
    
    
    function intFunction() {
        var newElement = document.createElement("p");
        newElement.textContent = "repetition is fun";
        $("#container").append(newElement);
    }
    window.setInterval(intFunction, 1000);
   
    
    function arrayByPrice() {
        var items = [
            {
                id: 1,
                title: "Item 1",
                price: 4.3
        },
            {
                id: 2,
                title: "Item 2",
                price: 2.0
        },
            {
                id: 3,
                title: "Item 3",
                price: 6.5
        },
            {
                id: 4,
                title: "Item 4",
                price: 1.5
        }
    ];
        var resultArray = items.sort(function (a, b) {
            return a.price - b.price;
        });
        return resultArray;
    }


    display("The ordered array is:\nAnswer:\t\t\t\t\t" + arrayByPrice());

})();