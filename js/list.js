import Item from "./item.js";
export default class List {
  constructor(listId,listName) {
    this.listId=listId;
    this.listName = listName;
    this.listItems = [] ;
  }
  addItem(listId,itemName) {
    this.listItems.push(new Item(listId,itemName,false));
    return this.listItems.length-1;
  }
  removeItem(index) {
    this.listItems.splice(index, 1);
  }
  changePurchaseState(index) {
    return this.listItems[index].isPurchased = !this.listItems[index].isPurchased;
  }
  
}
