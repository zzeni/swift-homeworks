/* globals $, Polish */
(function () {
  "use strict";

  var polishContainer = $('#polish-container');

  var polish = [];
  var shoppingCart = {
    items: [],
    totalPrice: 0
  };

  getPolish();

  $('#category-filter a').on("click", filterByColor);

  function getPolish() {
    $.getJSON('/db/polishes.json', function (data) {
      polish = data.map(function (polishObj) {
        return new Polish(polishObj);
      });
      displayPolish(polish);
    });
  }

  function displayPolish(polishList) {
    polishContainer.empty();

    polishList.forEach(function (polish) {
      var html = polish.toHTML();

      var polishEl = $(html);
      polishEl.find('button').on('click', function () {
        showPolish(polish);
      });

      polishContainer.append(polishEl);
    });
  }

  function filterByColor(event) {
    event.preventDefault();
    var color = $(event.target).attr('data-color');

    var filteredList = polish.filter(function (polish) {
      return polish === 'all';
    });

    displayPolish(filteredList);
  }

    
  function showPolish(polish) {
    var modal = $('#polish-modal');
    modal.modal();

    var imageUrl = "img/polish/" + polish.imageId + ".jpg";

    modal.find('.polish-image').attr('src', imageUrl);
    modal.find('.polish-color').text(polish.color);
    modal.find('.polish-price').text(polish.price);
    modal.find('.order-btn').on('click', function () {
      addToShoppingCart(polish);
      modal.modal('hide');
    });
  }

  function addToShoppingCart(polish) {
    shoppingCart.items.push(polish);
    shoppingCart.totalPrice += polish.price;
    $('.total-price').text(shoppingCart.totalPrice);
  }
})();




