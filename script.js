let items = [];
let i = 0;


function addBill(event){
    event.preventDefault();
    let Price = event.target.price.value;
    let Dish = event.target.dish.value;
    let Table = event.target.table.value;
    
    const billobj = {
        Price,
        Dish,
        Table
    }

//******Save data to local storage *******//
    items.push(billobj);
    localStorage.setItem(billobj.Dish,JSON.stringify(items[i]))
    i++;

// ********** post Data to Cloud using CrudCrud and POSTMAN **********//
    axios.post("https://crudcrud.com/api/3331fed261074c299b220d98de9ae846/waiterdata",billobj)
        .then((response) => {
            showOnScreen(response.data);
        })
        .catch((error) => {
            document.body.innerHTML = document.body.innerHTML + "<h4> Ooops! Something Went Wrong </h4>"
            console.log(error);
        })
}
//*********get data from crudcrud *******//
window.addEventListener('DOMContentLoaded',() => {
    axios.get("https://crudcrud.com/api/3331fed261074c299b220d98de9ae846/waiterdata")
        .then((response) => {
            for(let i=0; i<response.data.length; i++){
                showOnScreen(response.data[i])
            }
        })
        .catch((error) =>{
            console.log(error);
        })
})

function showOnScreen(billobj){
   // let add = document.getElementById('table').value;
    document.getElementById('price').value = '';
    document.getElementById('dish').value = '';
    document.getElementById('table').value = '';

    const ul = document.getElementById('tb-1');
    const li = `<li id="${billobj._id}"> ${billobj.Price} - ${billobj.Dish} - ${billobj.Table}
             <button onclick="deleteOrder('${billobj._id}')">Delete Order</button>
         </li>`
    ul.innerHTML = ul.innerHTML + li;

      
}
// delete user

function deleteOrder(itemId){
        axios.delete(`https://crudcrud.com/api/3331fed261074c299b220d98de9ae846/waiterdata/${itemId}`)
            .then((response)=>{
                removeFromScreen(itemId)
            
            })
            .catch((error) => {
                console.log(error)
            })
        
        
}

function removeFromScreen(itemId){
    
    const parentNode = document.getElementById('tb-1');
    const childNodeToBeDeleted = document.getElementById(itemId);
    if(childNodeToBeDeleted){
        parentNode.removeChild(childNodeToBeDeleted)
    }

}
