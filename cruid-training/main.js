let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mode='create';
let tmp

// get total
function getTotal(){
    if(price.value !=''){
        let result=(+price.value + +taxes.value + +ads.value)
        - +discount.value;

        total.textContent = result;
        total.style.background="#040"
    }
    else{
        total.style.background = "#a00d02";
        total.textContent = '';
    }
}

//create element
let array;
if(localStorage.product!= null){ 
    array = JSON.parse(localStorage.product);
}
else{
    array=[]
}

submit.onclick=function(){
    let obj = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };
    if(mode =='create'){
      //count
        if (obj.count > 1 && obj.count <= 100) {
          for (let i = 0; i < obj.count; i++) {
            array.push(obj);
          }
        } else {
          array.push(obj);
        }
    }
    else{
        array[tmp]=obj;
    }
    
    //save to local storage
    localStorage.setItem("product", JSON.stringify(array));
    // console.log(array); 

    clearData();
    readData();
};

//clear inputs
function clearData(){
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}

//read 

function readData(){
    let table=''
    for(let i=0;i<array.length;i++){
        table += `<tr>
                        <td>${i}</td>
                        <td>${array[i+1].title}</td>
                        <td>${array[i].price}</td>
                        <td>${array[i].taxes}</td>
                        <td>${array[i].ads}</td>
                        <td>${array[i].discount}</td>
                        <td>${array[i].total}</td>
                        <td>${array[i].category}</td>
                        <td>
                            <button id="update" onclick="updateItem(${i})">update</button>
                        </td>
                        <td>
                            <button onclick="deleteItem(${i})" id="delete">delete</button>
                        </td>
                    </tr>`;
    }
    document.getElementById("tbody").innerHTML = table;
    let dlteall = document.getElementById("deleteall");
    if (array.length > 0) {
      dlteall.innerHTML = `<button onclick="deleteall()">delete all (${array.length})</button>`;
    } else {
      dlteall.innerHTML = "";
    }
}
readData();

//delete

function deleteItem(i){
    array.splice(i,1);
    localStorage.product = JSON.stringify(array);
    readData();

}
function deleteall(){
  array.splice(0);
  localStorage.product = JSON.stringify(array); // anothor way localStorage.clear()
  readData();
}



// update data 

function updateItem(i){
    title.value=array[i].title;
    price.value = array[i].price;
    taxes.value = array[i].taxes;
    ads.value = array[i].ads;
    discount.value = array[i].discount;
    getTotal();
    count.style.display='none';
    category.value=array[i].category;

    mode='update'
    submit.textContent='Update';
    tmp=i;


}

//search
let smode='title';
function searchby(id){
    let search = document.getElementById("search");
    if(id=='searchtitle'){
        smode = "title";

    }
    else{
        smode = "category";

    }
    search.focus();
    search.value='';
    readData();
}

function searchData(value){
    let table = "";
    if (smode == "title") {
        for(let i=0;i< array.length;i++){
            if (array[i].title.includes(value.toLowerCase())) {
              table += `<tr>
                        <td>${i}</td>
                        <td>${array[i].title}</td>
                        <td>${array[i].price}</td>
                        <td>${array[i].taxes}</td>
                        <td>${array[i].ads}</td>
                        <td>${array[i].discount}</td>
                        <td>${array[i].total}</td>
                        <td>${array[i].category}</td>
                        <td>
                            <button id="update" onclick="updateItem(${i})">update</button>
                        </td>
                        <td>
                            <button onclick="deleteItem(${i})" id="delete">delete</button>
                        </td>
                    </tr>`;
            }
        }
    }
    else{
        for (let i = 0; i < array.length; i++) {
            if (array[i].category.includes(value.toLowerCase())) {
            table += `<tr>
                        <td>${i}</td>
                        <td>${array[i].title}</td>
                        <td>${array[i].price}</td>
                        <td>${array[i].taxes}</td>
                        <td>${array[i].ads}</td>
                        <td>${array[i].discount}</td>
                        <td>${array[i].total}</td>
                        <td>${array[i].category}</td>
                        <td>
                            <button id="update" onclick="updateItem(${i})">update</button>
                        </td>
                        <td>
                            <button onclick="deleteItem(${i})" id="delete">delete</button>
                        </td>
                    </tr>`;
            }
        }

    }
    document.getElementById("tbody").innerHTML = table;
}








