/* globals $ */

(function () {

    var kids = [];
    var TEMPLATE = "" +
        "        <div id=\"%NAME%\" class=\"kid col-md-6 mb-5\">\n" +
        "          <div class=\"card\">\n" +
        "            <div class=\"card-heading bg-info text-white\">\n" +
        "              <h3 class=\"m-3\">%NAME%</h3>\n" +
        "            </div>\n" +
        "            <div class=\"card-body row\">\n" +
        "              <div class=\"col-lg-4\">\n" +
        "                <img class=\"img-fluid\" src=\"%IMG-URL%\">\n" +
        "              </div>\n" +
        "              <div class=\"col-lg-8\">\n" +
        "                <ul class=\"my-4\">\n" +
        "                  <li><h5>Години: %AGE%</h5></li>\n" +
        "                  <li><h5>Любим цвят: %COLOR%</h5></li>\n" +
        "                  <li><h5>Любима игра: %GAME%</h5></li>\n" +
        "                  <li><h5>Любима храна: %FOOD%</h5></li>\n" +
        "                </ul>\n" +
        "                <button type=\"button\" class=\"btn btn-outline-info\" data-toggle=\"modal\" data-target=\"#kidModal\">Още</button>\n" +
        "              </div>\n" +
        "            </div>\n" +
        "          </div>\n" +
        "        </div>\n";

    $.getJSON("./js/kids.json", function (data) {
        kids = data;
        displayKids(kids);
    });

    function displayKids(list) {
        var container = $("#kids-list");

        container.empty();

        list.forEach(function (kid) {
            var itemHTML = TEMPLATE
                .replace(/%NAME%/g, kid.name)
                .replace("%AGE%", kid.age)
                .replace("%COLOR%", kid.color)
                .replace("%FOOD%", kid.food)
                .replace("%GAME%", kid.game)
                .replace("%IMG-URL%", kid.image);



            container.append(itemHTML);

        });

        $("#keywords").on("keyup", searchKeyword);

        function searchKeyword(event) {
            var input = event.target;
            var value = input.value.toLowerCase();

            if (input.value.length < 3) {
                displayKids(kids);
                return;
            }

            var keywordFilter = kids.filter(function (kid) {
                var searchIn = kid.name + " " + kid.game + " " + kid.food;
                return searchIn.toLowerCase().includes(value);
            });
            displayKids(keywordFilter);
        }

    }


    $("#ageAsc").on("click", function () {
        var sorted = kids.sort(function (a, b) {
            return a.age - b.age;
        });

        return displayKids(sorted);
    });

    $("#ageDes").on("click", function () {
        var sorted = kids.sort(function (a, b) {
            return b.age - a.age;
        });

        return displayKids(sorted);
    });

    $("#nameAsc").on("click", function () {
        var sorted = kids.sort(function (a, b) {
            return a.name - b.name;
        });

        return displayKids(sorted);
    });





    $('#game filter').on("change", filterByGame);

    function filterByGame(event) {
        var game = $(event.target).value;

        var filteredList = kids.filter(function (kid) {
            return kid.game === game;
        });

        displayKids(filteredList);
    }

    $("to-about").on("click", function(){
        $("about").load(".html/_aboout");
    });


})();
