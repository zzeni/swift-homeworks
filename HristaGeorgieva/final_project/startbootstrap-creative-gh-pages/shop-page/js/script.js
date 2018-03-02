/* globals $ */

(function () {
    "use strict";

    var shopItems = [];
    var shoppingCart = {
        items: [],
        totalPrice: 0
    };

    var TEMPLATE = "<div class=\"col-lg-4 col-md-6 mb-4\">\n" +
        "              <div class=\"card h-100\">\n" +
        "                <a href=\"#\"><img class=\"card-img-top\" src=\"img/gallery/%IMAGE-URL%.jpeg\" alt=\"\"></a>\n" +
        "                <div class=\"card-body\">\n" +
        "                  <h4 class=\"card-title\">\n" +
        "                    <a href=\"#\">%PRODUCT_NAME%</a>\n" +
        "                  </h4>\n" +
        "                  <h5>$%PRODUCT-PRICE%</h5>\n" +
        "                  <p class=\"card-text\">%PRODUCT_DESCRIPTION%</p>\n" +
        "<button type=\"button\" class=\"btn\" id=\"see-more\">\n" +
        "  See more\n" +
        "</button>\n" +
        "                </div>\n" +

        "                <div class=\"card-footer\">\n" +
        "                  <small class=\"text-muted\">&#9733; &#9733; &#9733; &#9733; &#9734;</small>\n" +
        "                </div>\n" +
        "              </div>\n" +
        "            </div>\n";

    var CARTTEMPLATE = "                <div class=\"row pb-2\">\n" +
        "                    <div class=\"col-sm-4\">\n" +
        "                        <img class=\"img-thumbnail item-image img-fluid\" src=\"./img/gallery/%IMAGE-URL%.jpeg\" alt=\"item-image\"></div>\n" +
        "                    <div class=\"col-sm-8\">\n" +
        "                        <h3 class=\"item-name\">%ITEM-NAME% $%ITEM-PRICE%</h3>\n" +
        "                        <p class=\"item-price\">%ITEM-DESC%</p>\n" +
        "                        <button type=\"button\" class=\"btn btn-light remove\">Remove</button>\n" +
        "                    </div>\n" +
        "\n" +
        "                </div>\n";

    $.getJSON("./db/items.json", function (data) {
        shopItems = data;
        displayItems(shopItems);
    });

    function displayItems(list) {
        var container = $("#shop-items");

        container.empty();

        list.forEach(function (item) {
            var itemHTML = TEMPLATE
                .replace("%IMAGE-URL%", item.url).replace("%PRODUCT_NAME%", item.name)
                .replace("%PRODUCT-PRICE%", item.price)
                .replace("%PRODUCT_DESCRIPTION%", item.description);

            var itemElement = $(itemHTML);
            itemElement.find("button").on("click", function () {
                showItem(item);
            });

            container.append(itemElement);

        });

    }


    $('#category-filter a').on("click", filterByCategory);

    function filterByCategory(event) {
        var category = $(event.target).attr("data-category");

        var filteredList = shopItems.filter(function (item) {
            return category === "all" || item.category === category;
        });

        displayItems(filteredList);

        $("#price-asc").on("click", function () {
            var sorted = filteredList.sort(function (a, b) {
                return a.price - b.price;
            });
            displayItems(sorted);
        });

        $("#price-des").on("click", function () {
            var sorted = filteredList.sort(function (a, b) {
                return b.price - a.price;
            });
            displayItems(sorted);
        });

        $("#name-asc").on("click", function () {
            var sorted = filteredList.sort(function (a, b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                if (x > y) {
                    return 1;
                }
                if (x < y) {
                    return -1;
                }
                return 0;
            });

            displayItems(sorted);
        });

        $("#name-des").on("click", function () {
            var sorted = filteredList.sort(function (a, b) {
                var x = a.name.toLowerCase();
                var y = b.name.toLowerCase();
                if (x > y) {
                    return -1;
                }
                if (x < y) {
                    return 1;
                }
                return 0;
            });

            displayItems(sorted);
        });
        
        $("#color-filter a").on("click", filterByColor);
        
        function filterByColor(event){
             var category = $(event.target).attr("data-category");

        var colorList = filteredList.filter(function (item) {
            return category === "all" || item.color === category;
        });

        displayItems(colorList);
        }

    }
    //
    //    $("#sort-by").on("change", function () {
    //        var key = this.value.split("-")[0];
    //        var direction = this.value.split("-")[1];
    //        
    //        key = { name: "name", price: "price" }
    //        [key] || key;
    //        var sign = direction === "asc" ? 1 : -1;
    //        
    //        var sorted = shopItems.sort(function(itemA, itemB) {
    //            return compare(itemA, itemB, key) * sign;
    //        });
    //        
    //        displayItems(sorted);
    //    });
    //    
    //    function compare(obj1, obj2, key) {
    //        if (obj1[key] === obj2[key]) {return 0;}
    //        if (obj1[key] > obj2[key]) {return 1; }
    //        return -1;
    //    }

    //    Първоначално използвах кода от примера с колелата, но сортирането по цена не работеше правилно. Тъй като примерът ми е малко сложен и не успях да го "дебъгна" си направих отделни функции за всяка категория. В последствие разбрах, че в json файла с моите айтеми съм задала цените като стринг, вместо като number и затова не ми ги е подреждало както трябва. Също така, сортиращите функции ги сложих вътре във филтриращата по категории функция, за да не излизат абсолютно всички айтеми когато се сортират, а да може юзъра да избере категория и след това да сортира нещата в съответната категория а да не му излизат всички. 


    $("#keywords").on("keyup", searchKeyword);

    function searchKeyword(event) {
        var input = event.target;
        var value = input.value.toLowerCase();

        if (input.value.length < 3) {
            displayItems(shopItems);
            return;
        }

        var keywordFilter = shopItems.filter(function (item) {
            var searchIn = item.name + " " + item.description;
            return searchIn.toLowerCase().includes(value);
        });
        displayItems(keywordFilter);
    }

    function showItem(item) {
        var modal = $("#item-modal");
        modal.modal();
        var imageUrl = "./img/gallery/" + item.url + ".jpeg";
        modal.find('.item-image').attr('src', imageUrl);
        modal.find('.item-name').text(item.name);
        modal.find('.item-price').text(item.price);
        modal.find('.item-description').text(item.description);
        modal.find('.buy-btn').off('click');
        modal.find('.buy-btn').on('click', function () {
            addToShoppingCart(item);
            modal.modal('hide');
        });

    }


    function addToShoppingCart(item) {
        shoppingCart.items.push(item);
        shoppingCart.totalPrice += item.price;
        $(".total-price").text(shoppingCart.totalPrice);
        var modal = $("#cart-modal");
        modal.find(".total").text(shoppingCart.totalPrice);
        var items = shoppingCart.items;
        items.forEach(function (item) {
            var itemHTML = CARTTEMPLATE
                .replace("%IMAGE-URL%", item.url).replace("%ITEM-NAME%", item.name)
                .replace("%ITEM-PRICE%", item.price)
                .replace("%ITEM-DESC%", item.description);

            $("#cart-container").append(itemHTML);
        });


    }
})();
