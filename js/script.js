// global Variable
var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var updateBtn =  document.getElementById("updateBtn");

var productContainer ;
if (localStorage.getItem("productsList") == null) {
    productContainer = [] ;
} else {
   productContainer =  JSON.parse(localStorage.getItem("productsList"));
   displayProduct();

}
//Retrive => Create
function addProduct() {
    if (
    validateProductName() &&
      productCategory.value != "" &&
      validateProductPrice() &&
      productDesc.value != ""
    ) {
      var product = {
        name: productName.value,
        category: productCategory.value,
        price: productPrice.value,
        desc: productDesc.value,
      };
  
      console.log(product);
      productContainer.push(product);
  
      //JSON.stringify(productsList)//convert array of objects to string
  
      localStorage.setItem("productsList", JSON.stringify(productContainer));
  
    //   console.log(productsList);
      displayProduct();
      clearForm();
      document.getElementById("lastAlert").classList.add("d-none");
      document.getElementById("lastAlert").classList.remove("d-block");
      // addBtn.removeAttribute("disabled");
    } else {
      // alert("sfkmvslmlg")
  
      //  return false;
      document.getElementById("lastAlert").classList.remove("d-none");
      document.getElementById("lastAlert").classList.add("d-block");
      // addBtn.setAttribute("disabled","true");
    }
  }





// clear 
function clearForm(){
    productName.value = " ";
    productPrice.value = "" ;
    productCategory.value = " " ;
    productDesc.value = " " ;
}
// Display
function displayProduct(){
    var cartoona = `` ;
    for (var i = 0 ; i < productContainer.length ; i ++ )
    {


        cartoona += `<tr>
        <td>${i}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
       <td>${productContainer[i].category}</td>
     <td>${productContainer[i].desc}</td>
     <td><button onclick="updateProduct(${i})" class="btn btn-outline-warning" >Update</button></td>
     <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger" id="delete">Delete</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML  = cartoona;
}

// function checkInputs() {
//     if ( validateProductName() != "" &&  productPrice.value != "" &&  productCategory.value != "" &&  productDesc.value != "" ) {
//         return true;
//     }else
//     {
//         return false ;
//     }
// }
// Delete
function deleteProduct(productIndex){
    productContainer.splice(productIndex , 1 );
    localStorage.setItem("productsList" , JSON.stringify(productContainer));
    displayProduct();
}

// Search

function searchProduct(searchItem){
    var cartoona = `` ;
    for (var i = 0 ; i < productContainer.length ; i ++ )
    {

        if (productContainer[i].name.toLowerCase().includes(searchItem.toLowerCase())  == true) {
            cartoona += `<tr>
        <td>${i}</td>
        <td>${productContainer[i].name.replace(searchItem,`<span style="background-color:yellow">${searchItem}</span>`)}</td>
        <td>${productContainer[i].price}</td>
       <td>${productContainer[i].category}</td>
     <td>${productContainer[i].desc}</td>
     <td><button class="btn btn-outline-warning" id="update">Update</button></td>
     <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger" id="delete">Delete</button></td>
        </tr>`;
        } else {
            console.log("false")
        }

        
    }
    document.getElementById("tableBody").innerHTML  = cartoona;
}


// Update

function updateProduct(ind){

    // console.log(ind);
    productName.value  = productContainer[ind].name ;
    productPrice.value  = productContainer[ind].price ;
    productCategory.value  = productContainer[ind].category ;
    productDesc.value  = productContainer[ind].desc ;
    updateBtn.innerHTML = "Update Product" ; 

    updateBtn.onclick = function(){
        productContainer[ind].name  = productName.value;
        productContainer[ind].price  = productPrice.value;
        productContainer[ind].category  = productCategory.value;
        productContainer[ind].desc = productDesc.value;

        displayProduct();
        localStorage.setItem("productsList" , JSON.stringify(productContainer));
        updateBtn.innerHTML = "Add Product" ; 
        clearForm();
        updateBtn.onclick = addProduct;

    }
}


function validateProductName() {
    var regexPname = /^[A-Z][a-z A-Z]{3,}/; // ybd2 b capital we fe space 3ady
  
    if (regexPname.test(productName.value) == true) {
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        document.querySelector(".alert").classList.add("d-none");
        document.querySelector(".alert").classList.remove("d-block");
        
        updateBtn.removeAttribute("disabled");
        return true;
    } else {
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        document.querySelector(".alert").classList.remove("d-none");
        document.querySelector(".alert").classList.add("d-block");
        updateBtn.disabled = true;
        updateBtn.setAttribute("disabled", "true");
    
        return false;
    }
}
  
productName.addEventListener("keyup", validateProductName);

  
 
function validateProductPrice(){
    var regexPrice = /^[1-9][0-9]{3,6}$/;
    if (regexPrice.test(productPrice.value) == true) {
       productPrice.classList.add("is-valid");
       productPrice.classList.remove("is-invalid");
       document.querySelector(".myAlert").classList.add("d-none");
       document.querySelector(".myAlert").classList.remove("d-block");
       
       updateBtn.removeAttribute("disabled");
       return true;
    } else {
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
        document.querySelector(".myAlert").classList.remove("d-none");
        document.querySelector(".myAlert").classList.add("d-block");
        updateBtn.disabled = true;
        updateBtn.setAttribute("disabled", "true");
    
        return false;
    }
}
productPrice.addEventListener("keyup", validateProductPrice);

