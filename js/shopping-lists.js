import List  from "./list.js";
var Lists=[];
function removeShoppingList(index) 
{
    Lists.splice(index,1);
}
function addShoppingList(shoppingListName) 
{
    const list=new List(Lists.length,shoppingListName);
    Lists.push(list);
    return Lists.length-1;
}
function getList(index) {
  return  Lists[index];
}

export {addShoppingList,removeShoppingList,getList}