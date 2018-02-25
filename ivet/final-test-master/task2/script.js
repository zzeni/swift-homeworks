  "use strict"

// задача 1 (4т.)
// Сортирайте следния списък от числа във възходящ ред:

function numberOrder(){
  var arr = [2, 5, 8, 4, 1, 12];
  var order_numbers = arr.sort(function(a, b) {
    return a - b;
  });
  return order_numbers;
}


// задача 2 (4т.)
// Напишете функция, която да изважда всички думи, с дължина над 4 символа от следния текст:

function extractWords() {
    var text = "The quick brown fox jumps over the lazy dog";
    var list = text.split(" ");
    var filteredWords = list.filter(function(items) {

      return items.length > 4;
  });

  return filteredWords;
}

// задача 3 (5т.)
// Напишете код, който на всяка секунда закача към `#container` елемента следния html елемент: `<p>repetition is fun</p>`

 function intFunction() {
    var newElement = document.createElement("p");
    newElement.textContent = "repetition is fun";
    $("#container").append(newElement);
    }
    window.setInterval(intFunction, 1000);

// задача 4 (6т.)
// Направете така, че 2 секунди след зареждането на дадена страница, всички картинки в нея да се завъртят по вертикалната си ос (по Y)

 setTimeout(function () {
        var images = document.getElementsByTagName("img");
        for (var i = 0; i < images.length; i++) {
            images[i].style.transform = "scaleY(-1)";
        }
    }, 2000);

// задача 5 (6т.)
// Напишете функция, която да сортира следния списък от обекти по полето `price`:

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


// ...
