(function (window) {
  function myLibrary() {
    let catalog = createRandomCatalog(100);

    return {
      searchProductById,
      searchProductsByPrice,
      searchProductsByType,
      searchAllProducts,
    };

    function createRandomProduct() {
      let typeArray = ['Electronics', 'Book', 'Clothing', 'Food'];
      let price = (Math.random() * 500).toFixed(2);
      let type = typeArray[Math.floor(Math.random() * 4)];

      return { price, type };
    }

    function createRandomCatalog(num) {
      let catalog = [];
      for (i = 0; i < num; i++) {
        let obj = createRandomProduct();
        catalog.push({ id: i, price: obj.price, type: obj.type });
      }
      return catalog;
    }

    function searchAllProducts() {
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(catalog);
        }, 1000);
      });
      return promise;
    }

    function searchProductById(id) {
      let promise = new Promise((resolve, reject) => {
        let i = 0;
        setTimeout(() => {
          while (i < catalog.length) {
            if (catalog[i].id == id) {
              resolve({ id, price: catalog[i].price, type: catalog[i].type });
            }
            i++;
          }
          reject('Invalid ID: ' + id);
        }, 1000);
      });
      return promise;
    }

    function searchProductsByType(type) {
      let promise = new Promise((resolve, reject) => {
        let i = 0;
        let typeArray = [];
        let possibleTypes = ['Electronics', 'Book', 'Clothing', 'Food'];
        if (!possibleTypes.includes(type)) {
          reject('Invalid Type: ' + type);
        } else {
          setTimeout(() => {
            while (i < catalog.length) {
              if (catalog[i].type === type) {
                typeArray.push({ id: catalog[i].id, price: catalog[i].price, type });
              }
              i++;
            }
            resolve(typeArray);
          }, 1000);
        }
      });
      return promise;
    }

    function searchProductsByPrice(price, difference) {
      var promise = new Promise(function (resolve, reject) {
        var i = 0;
        var priceArray = [];
        if (!isFinite(price)) {
          reject('Invalid Price: ' + price);
        } else {
          setTimeout(function () {
            while (i < catalog.length) {
              if (Math.abs(catalog[i].price - price) < difference) {
                priceArray.push({
                  id: catalog[i].id,
                  price: catalog[i].price,
                  type: catalog[i].type,
                });
              }
              i++;
            }
            resolve(priceArray);
          }, 1000);
        }
      });
      return promise;
    }
  }
  if (window.api === undefined) {
    window.api = myLibrary();
  }
})(window);
