/* globals $ */

(function () {
    "use strict";
    
    var shopItems = [];
    
    var TEMPLATE = "<div class=\"col-lg-4 col-md-6 mb-4\">\n" +
"              <div class=\"card h-100\">\n" +
"                <a href=\"#\"><img class=\"card-img-top\" src=\"img/gallery/%IMAGE-URL%.jpeg\" alt=\"\"></a>\n" +
"                <div class=\"card-body\">\n" +
"                  <h4 class=\"card-title\">\n" +
"                    <a href=\"#\">%PRODUCT_NAME%</a>\n" +
"                  </h4>\n" +
"                  <h5>%PRODUCT-PRICE%</h5>\n" +
"                  <p class=\"card-text\">%PRODUCT_DESCRIPTION%</p>\n" +
"                </div>\n" +
"                <div class=\"card-footer\">\n" +
"                  <small class=\"text-muted\">&#9733; &#9733; &#9733; &#9733; &#9734;</small>\n" +
"                </div>\n" +
"              </div>\n" +
"            </div>\n";
    
    $.getJSON("./db/items.json", function(data) {
        shopItems = data;
        displayItems(shopItems);
    });
    
    function displayItems(list) {
        var container = $("#shop-items");
        
        container.empty();
        
        list.forEach(function (item) {
            var itemHTML = TEMPLATE
                         .replace("%IMAGE-URL%", item.url)       .replace("%PRODUCT_NAME%", item.name)
                         .replace("%PRODUCT-PRICE%", item.price)
                         .replace("%PRODUCT_DESCRIPTION%", item.description);
            
            container.append(itemHTML);
        });
    }
    
    $('#category-filter a').on("click", filterByCategory);
    
    function filterByCategory(event) {
        event.preventDefault();
        var category = $(event.target).attr("data-category");
        
        var filteredList = shopItems.filter(function (item) {
           return category === "all" || item.category === category;  
        });
        
        displayItems(filteredList);
    }
    
    
}) ();
