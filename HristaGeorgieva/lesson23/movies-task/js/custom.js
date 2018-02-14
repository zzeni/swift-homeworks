/*globals document, window, $ */
(function () {
  "use strict";

  var films = [];

   var TEMPLATE = "<div class=\"col-lg-6\">\n" +
        "          <article id=\"%FILM-ID%\" class=\"card film-item\">\n" +
        "            <div class=\"card-body d-flex p-0\">\n" +
        "              <div class=\"col-4 p-0 film-poster\">\n" +
        "                <a href=\"https://www.themoviedb.org/movie/%FILM-ID%\" target=\"blank\">\n" +
        "                  <img src=\"%IMAGE-URL%\" title=\"%FILM-TITLE%\" alt=\"%FILM-TITLE%\">\n" +
        "                </a>\n" +
        "              </div>\n" +
        "              <div class=\"col-8 p-3 film-info\">\n" +
        "                <h4 class=\"card-title\">\n" +
        "                  <a href=\"#\">%FILM-TITLE%</a>\n" +
        "                </h4>\n" +
        "                <div class=\"year-genre\">\n" +
        "                  <div>\n" +
        "                    <i class=\"fa fa-calendar\"></i>\n" +
        "                    <span class=\"year\">%YEAR%</span>\n" +
        "                  </div>\n" +
        "                  <div class=\"genre elipsis\">\n" +
        "                    %GENRE%\n" +
        "                  </div>\n" +
        "                </div>\n" +
        "                <div class=\"description\">\n" +
        "                  <p>%DESCRIPTION%</p>\n" +
        "                  <a class=\"read-more\" href=\"https://www.themoviedb.org/movie/%FILM-ID%\" target=\"blank\">more</a>\n" +
        "                </div>\n" +
        "                <div class=\"rating\">\n" +
        "                  <span class=\"rating-value\">%RATING%</span>\n" +
        "                  <i class=\"fa fa-star\"></i>\n" +
        "                </div>\n" +
        "              </div>\n" +
        "            </div>\n" +
        "          </article>\n";
    
  $.getJSON("./db/movies.json", function (data) {
     films = data;
     displayFilms(films);
  });

  document.filtersForm.year.addEventListener("change", function () {
    var input = event.target;
    var value = input.value;
    var yearFilter = films.filter(function (film){
    var searchIn = film.release_date;
    return searchIn.includes(value);
    });
   displayFilms(yearFilter);
  });
    
  $("#genre").on("change", filterGenres);
    
    function filterGenres(event) {
        var input = event.target;
        var value = input.value;
        var genreFilter = films.filter(function (film) {
            var searchIn = film.genres;
            return searchIn.includes(value);
        });
        
    displayFilms(genreFilter);
        
    } 
    
  $("#keywords").on("keyup", searchKeywords);
    
    function searchKeywords(event) {
        var input = event.target; 
        var value = input.value.toLowerCase();
        
        if (input.value.length < 3) {
            displayFilms(films);
            return;
        }
        
        var keywordFilter = films.filter(function (film) {
            var searchIn = film.title + " " + film.overview;
            return searchIn.toLowerCase().includes(value);
        });
        
        displayFilms(keywordFilter);
        
        
    }

  function displayFilms(list) {
    var collection = $("#collection");

    collection.empty();
      
    list.forEach(function (film) {
            var movieHTML = TEMPLATE
                .replace("%FILM-ID%", film.id)
                .replace(/%FILM-TITLE%/g, film.title)
                .replace("%YEAR%", film.release_date)
                .replace("%GENRE%", film.genres)
                .replace("%DESCRIPTION%", film.overview)
                .replace("%RATING%", film.vote_average)
                .replace("%IMAGE-URL%", film.poster_path);

            collection.append(movieHTML);
    });
  }

  window.addEventListener("scroll", function () {
    if (this.pageYOffset > 200) {
      $("#header nav").addClass("slim");
        } else {
            $("#header nav").removeClass("slim");
    }
  });
})();
