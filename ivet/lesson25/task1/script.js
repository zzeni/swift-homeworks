(function () {
	"use strict"

	let display = text => {
		let output = document.createElement("p")
		output.textContent = text
		document.body.appendChild(output)
	}



	// ShoppingCart

	var shoppingCart = [
	{
		name:"product 1",
		quantity: 2,
		price: 2.95
	},
	{
		name: "product 2",
		quantity: 3,
		price: 1.20
	},
	{
		name: "product 3",
		quantity: 1,
		price:4.20
	}
	];

	function total(shoppingCart) {
		var sum = 0;
		for(var i = 0; i < shoppingCart.length; i++){
			var total = sum += (shoppingCart[i].quantity * shoppingCart[i].price);
		}
		return total;
	}

	function total(item){
		var sum = 0;
		item.forEach (function(cart) {
			sum += (cart.quantity * cart.price);
		});
		return sum;
	}

	display("Вие дължите: " + total(shoppingCart) + "лв.")


	// WordCounter



	var text = "The quick brown fox jumps over the lazy dog.";

	function wordCounter(text) {
		var totalSoFar = 0;
		for(var i = 0; i< text.length; i++) {
			if (text[i] === " ") {
				totalSoFar += 1;
			}
		}
		return totalSoFar + 1;
	}

	display("Броя на думите в изречението са: " + wordCounter(text))



	// Capitalizer

	var sentence = "The quick brown fox jumps over the lazy dog.";

	function capitalize(sentence) {
		sentence = sentence.split(" ");
		for (var i = 0; i < sentence.length; i++) {
			sentence[i] = sentence[i][0].toUpperCase() + sentence [i].substr(1);
		}
		return sentence.join(" ");
	}


	display(capitalize(sentence));



	// VowelCounter

	var sentence2 = "Напишете функция, която да преброява гласните букви в даден текст (а, ъ, о, у, е, и, ю, я)";

	function vowelCounter(sentence2) {
		var result = sentence2.match (/[аъоуеиюя]/gi);
		return result === null ? 0 : result.length;
	}

	display("Броят на гласните букви в текста е: " + vowelCounter(sentence2));


	// Sort List

	var list = [3, 45, 2, 6, 18, 5];

	function sort(list) {
		return list.sort (function(a, b) {
			if (a > b) {return 1;}
			if (a < b) {return -1;}
			return 0;
		});
	}

	display("Сортираният списък е: " + sort(list));



})()