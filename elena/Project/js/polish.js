function Polish(polishObj) {
    this.imageID = polishObj.imgID;
    this.title = polishObj.title;
    this.price = polishObj.price;
}

Polish.prototype.toHTML = function () {
    const PATTERN = (function () {
        return '<div class="col-lg-4 col-md-6 mb-4"> \
              <div class="card h-100"> \
                <a href="#"><img class="card-img-top" src="%IMG-ID%" alt=""></a> \
                <div class="card-body"> \
                  <h4 class="card-title"> \
                    <a href="#">%TITLE%</a> \
                  </h4> \
                  <h5>%PRICE%</h5> \
                  <p class="card-text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet numquam \ aspernatur!</p> \
                </div> \
                <div class="card-footer"> \
                 <button type="button" class="btn btn-secondary">Order</button> \
                </div> \
              </div> \
            </div>';
    })();

    return PATTERN
        .replace('%IMG-ID%', this.imgID)
        .replace(/%TITLE%/g, this.title)
        .replace('%PRICE%', this.price);
};
