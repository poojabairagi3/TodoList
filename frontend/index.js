let sum = 0;
let sum_of = document.getElementById('sum-of');
sum_of.textContent = `Total value worth of products:- ${sum}`
async function SaveToCrudCrud(event){
    event.preventDefault();
    const price= event.target.price.value;
    const product=event.target.product.value;

    const obj={
        price:price,
        product:product
    }
    // localStorage.setItem(obj.sell,JSON.stringify(obj));
    try{
        let response= await axios.post('http://localhost:3000/product/add-product',obj)
        sum += Number(obj.price);
        console.log(response);
        showUserOnScreen(response.data);
    }
    catch(err){
        console.log(err);
    }
}
window.addEventListener('DOMContentLoaded',async()=>{ 
    
        
        try{
        let response=await axios.get('http://localhost:3000/product/get-product')
        for(let i=0;i<response.data.allProduct.length;i++){
            showUserOnLoad(response.data.allProduct[i]);
            sum += Number(response.data.allProduct[i].price);
        }
        sum_of.textContent = `Total value worth of products:- ${sum}`
    }
    catch(err){
        console.log(err);
    }
})

async function showUserOnLoad(obj){
    const parentElement = document.getElementById('ListOfItems');
    console.log(obj);
console.log(obj.newProductDetails);
    const childElement = document.createElement('li');
    childElement.textContent = obj.price+ ' - ' + obj.product;
    parentElement.appendChild(childElement);

    
    const deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete User';
    deleteBtn.onclick = async() => {  
        try{
                   let response= await axios.delete(`http://localhost:3000/product/delete-product/${obj.id}`)

            parentElement.removeChild(childElement)
            sum -= obj.price;
            sum_of.textContent = `Total value worth of products:- ${sum}`;
        }
        catch(err){
            console.log(err);
        };   
    }
    sum_of.textContent = `Total value worth of products:- ${sum}`
    childElement.appendChild(deleteBtn);
    parentElement.appendChild(childElement);
}



async function showUserOnScreen(obj) {

    const parentElement = document.getElementById('ListOfItems');
    console.log(obj);
// console.log(obj.newProductDetails);
    const childElement = document.createElement('li');
    childElement.textContent = obj.newProductDetails.price+ ' - ' + obj.newProductDetails.product;
    parentElement.appendChild(childElement);

    
    const deleteBtn = document.createElement('input');
    deleteBtn.type = 'button';
    deleteBtn.value = 'Delete User';
    deleteBtn.onclick = async() => {  
        try{
                   let response= await axios.delete(`http://localhost:3000/product/delete-product/${obj.newProductDetails.id}`)

            parentElement.removeChild(childElement)
            sum -= obj.newProductDetails.price;
            sum_of.textContent = `Total value worth of products:- ${sum}`;
        }
        catch(err){
            console.log(err);
        };   
    }
    sum_of.textContent = `Total value worth of products:- ${sum}`
    childElement.appendChild(deleteBtn);
    parentElement.appendChild(childElement);
}