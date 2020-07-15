function createTableHeader(tableId) {
  var tableHeaderRow = document.createElement('TR');
  var th1 = document.createElement('TH');
  var th2 = document.createElement('TH');
  var th3 = document.createElement('TH');
  var th4 = document.createElement('TH');
  th1.appendChild(document.createTextNode('ProductId'));
  th2.appendChild(document.createTextNode('Type'));
  th3.appendChild(document.createTextNode('Price'));
  th4.appendChild(document.createTextNode('Examine'));
  tableHeaderRow.appendChild(th1);
  tableHeaderRow.appendChild(th2);
  tableHeaderRow.appendChild(th3);
  tableHeaderRow.appendChild(th4);
  document.getElementById(tableId).appendChild(tableHeaderRow);
}

function updateTable(tableId, productArray) {
  var tableBody = document.getElementById(tableId);
  //reset table
  while (tableBody.hasChildNodes()) {
    tableBody.removeChild(tableBody.firstChild);
  }
  //create table header
  createTableHeader(tableId);
  //populate table rows
  for (i = 0; i < productArray.length; i++) {
    var tr = document.createElement('TR');
    var td1 = document.createElement('TD');
    var td2 = document.createElement('TD');
    var td3 = document.createElement('TD');
    var td4 = document.createElement('button');

    td4.addEventListener('click', function () {
      processSearch(this.parentNode.firstChild.innerHTML);
    });
    td1.appendChild(document.createTextNode(productArray[i].id));
    td2.appendChild(document.createTextNode(productArray[i].type));
    td3.appendChild(document.createTextNode(productArray[i].price));
    td4.appendChild(document.createTextNode('Examine'));
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);
    tableBody.appendChild(tr);
  }
}

api.searchAllProducts().then((res) => {
  updateTable('allTable', res);
});

function updateExaminedText(product) {
  var outputString = 'Product Id: ' + product.id;
  outputString += '<br> Price: ' + product.price;
  outputString += '<br> Type: ' + product.type;
  document.getElementById('productText').innerHTML = outputString;
}

function getIntersection(arrA, arrB, searchedId) {
  let samePrice = arrA;
  let sameType = arrB;
  let similarArr = [];
  samePrice.forEach((obj1) => {
    sameType.forEach((obj2) => {
      if (obj1.id === obj2.id && obj1.id !== searchedId) {
        similarArr.push(obj1);
      }
    });
  });
  return similarArr;
}

function processSearch(searchId) {
  api
    .searchProductById(searchId)
    .then((res) => {
      return Promise.all([
        api.searchProductsByPrice(res.price, 50),
        api.searchProductsByType(res.type),
        res,
      ]);
    })
    .then((res) => {
      let similarArr = getIntersection(res[0], res[1], res[2].id);
      updateExaminedText(res[2]);
      updateTable('similarTable', similarArr);
    })
    .catch((res) => {
      alert(res);
    });
}

function processType(searchType) {
  api
    .searchProductsByType(searchType)
    .then((res) => {
      updateTable('similarTable', res);
    })
    .catch((res) => {
      alert(res);
    });
}

function processPrice(searchPrice) {
  api
    .searchProductsByPrice(searchPrice, 50)
    .then((res) => {
      updateTable('similarTable', res);
    })
    .catch((res) => {
      alert(res);
    });
}

document.getElementById('inputButton').addEventListener('click', function () {
  processSearch(document.getElementById('input').value);
});

document.getElementById('inputTypeButton').addEventListener('click', function () {
  processType(document.getElementById('inputType').value);
});

document.getElementById('inputPriceButton').addEventListener('click', function () {
  processPrice(document.getElementById('inputPrice').value);
});
