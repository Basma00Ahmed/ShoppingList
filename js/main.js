import * as shoppingList from "./shopping-lists.js";
var currentList;
/////////////////////////Delete List////////////////////
var removeShoppingList = function () {
  var attribute = this.getAttribute("list-id");

  shoppingList.removeShoppingList(attribute);
  document.getElementById("li-list-" + attribute).remove();
  document.getElementById("ListItems").hidden = true;
};
//////////////////////////Add List///////////////////////////
$("#frm-shoppingList").submit(function (e) {
  e.preventDefault();
  document.getElementById("ListItems").hidden = true;
  let shoppingListName = document.getElementById("shoppingList-Name").value;
  let listId = shoppingList.addShoppingList(shoppingListName);
  let listUL = document.getElementById("list-ul");
  let li = document.createElement("li");
  li.appendChild(document.createTextNode("li-list-" + listId));
  li.setAttribute("id", "li-list-" + listId);

  let htmlDiv =
    '<div class="input-group  mb-3 ">' +
    '<label  class="form-control " id="list-Name"  title="'+shoppingListName+'"> ' +
    shoppingListName +
    " </label> " +
    '<input type="submit" class="btn btn-danger mb-3" id="Delete-btn" value="Delete" list-id="' +
    listId +
    '" />' +
    '<input type="submit" class="btn btn-primary mb-3" id="Show-btn" value="Items" list-id="' +
    listId +
    '"  /> </div> ';
  li.innerHTML = htmlDiv;
  listUL.appendChild(li);
  document.getElementById("shoppingList-Name").value = "";

  document
    .querySelector('[value="Delete"][list-id="' + listId + '"]')
    .addEventListener("click", removeShoppingList);

  document
    .querySelector('[value="Items"][list-id="' + listId + '"]')
    .addEventListener("click", showItems);
});
////////////////////////Delete Item///////////////////

var removeItem = function () {
  var attribute = this.getAttribute("item-id");

  currentList.removeItem(attribute);
  document.getElementById("li-item-" + attribute).remove();
};

//////////////////////////Add Item///////////////////////////

$("#frm-item").submit(function (e) {
  e.preventDefault();
  let itemName = document.getElementById("item-Name").value;

  let itemId = currentList.addItem(itemName);
  let itemUL = document.getElementById("item-ul");
  let li = document.createElement("li");
  li.appendChild(document.createTextNode("li-item-" + itemId));
  li.setAttribute("id", "li-item-" + itemId);
  li.setAttribute("item-id",  itemId);
  li.setAttribute("list-id",  currentList.listId);

  let htmlDiv =
    '<div class="input-group mb-3">' +
    '<label  class="form-control Purchased-false" title="'+itemName+'" id="item-' +
    currentList.listId +
    "-" +
    itemId +
    '"  > ' +
    itemName +
    " </label> " +
    '<input type="submit" class="btn btn-danger mb-3"  value="Delete"  list-id="' +
    currentList.listId +
    '" item-id="' +
    itemId +
    '" /> </div> ';
  li.innerHTML = htmlDiv;
  itemUL.appendChild(li);
  document.getElementById("item-Name").value = "";

  document
    .querySelector(
      '[value="Delete"][list-id="' +
        currentList.listId +
        '"][item-id="' +
        itemId +
        '"]'
    )
    .addEventListener("click", removeItem);

  li.addEventListener("click", purchasedItem);
});

//////////////////////////Show ListItems///////////////////////////
var showItems = function () {
  var attribute =this.getAttribute("list-id");
  currentList = shoppingList.getList(attribute);
  document.getElementById("current-list-Name").innerHTML=currentList.listName +" Items";
  document.getElementById("ListItems").hidden = false;
  let itemUL = document.getElementById("item-ul");
  itemUL.innerHTML = null;

  currentList.listItems.forEach((item, index) => {
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("li-item-" + index));
    li.setAttribute("id", "li-item-" + index);
    li.setAttribute("item-id", index);
    li.setAttribute("list-id",   currentList.listId);
    let itemClass;

    if (item.isPurchased) {
      itemClass = "Purchased-true";
    } else {
      itemClass = "Purchased-false";
    }

    let htmlDiv =
      '<div class="input-group mb-3">' +
      '<label title="' +item.itemName +'" class="form-control ' +
      itemClass +
      '" id="item-' +
      currentList.listId +
      "-" +
      index +
      '"  > ' +
      item.itemName +
      " </label> " +
      '<input type="submit" class="btn btn-danger mb-3" id="Delete-btn" value="Delete" list-id="' +
      currentList.listId +
      '" item-id="' +
      index +
      '" /> </div> ';
    li.innerHTML = htmlDiv;
    itemUL.appendChild(li);

    document
      .querySelector(
        '[value="Delete"][list-id="' +
          currentList.listId +
          '"][item-id="' +
          index +
          '"]'
      )
      .addEventListener("click", removeItem);

    li.addEventListener("click", purchasedItem);
  });
};
//////////////////////////Purchased Item///////////////////////////

var purchasedItem = function () {
  let attribute = this.getAttribute("item-id");
  let attributeList = this.getAttribute("list-id");
  var itemClass;
  if (currentList.changePurchaseState(attribute)) {
    itemClass = "Purchased-true";
  } else {
    itemClass = "Purchased-false";
  }
  this.children[0].children[0].classList.remove(this.children[0].children[0].classList[1])
  this.children[0].children[0].classList.add(itemClass);

};
