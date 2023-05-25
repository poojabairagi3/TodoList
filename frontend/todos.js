
async function SaveToCrudCrud(event){
    event.preventDefault();
    const todos= event.target.todos.value;
    const description=event.target.description.value;

    const obj={
        todos:todos,
        description:description
    }
    // localStorage.setItem(obj.sell,JSON.stringify(obj));
    try{
        let response= await axios.post('http://localhost:3000/todos/add-todos',obj)
        
        showUserOnScreen(response.data.newTodosDetails,'listofitems');
    }
    catch(err){
        console.log(err);
    }
}
async function getTodosDone(){
    let todosdone=await axios.get('http://localhost:3000/todos/get-todosdone');
        
        for(let i=0;i<todosdone.data.allTodos.length;i++){
            // console.log(response.data);
            showUserOnScreen(todosdone.data.allTodos[i],'todosdone');
        }
}
window.addEventListener('DOMContentLoaded',async()=>{ 

        try{
        let response=await axios.get('http://localhost:3000/todos/get-todos')
        for(let i=0;i<response.data.allTodos.length;i++){
            // console.log(response.data);
            showUserOnScreen(response.data.allTodos[i],'listofitems');
        }
        await getTodosDone();
    }
    catch(err){console.log(err);}
})
async function showUserOnScreen(obj,typeoftodos) {
    
   
    const parentElement = document.getElementById(typeoftodos);
    
    const childElement = document.createElement('li');

    childElement.id=obj.id;
    childElement.textContent = obj.todos+ ' - ' + obj.description;
    parentElement.appendChild(childElement);
    
    let check;
    let deleteBtn;
    if(typeoftodos=='listofitems'){
        check=document.createElement('input');
        check.type='checkbox';
        check.id='check';
         check.classList.add('ms-3','me-3');
    
        deleteBtn = document.createElement('input');
        deleteBtn.type = 'button';
        deleteBtn.value = 'X';
        deleteBtn.id='delete';
 
    }
    if(check)
    {
        childElement.appendChild(check);
        childElement.appendChild(deleteBtn);
    }
   
    parentElement.appendChild(childElement);


    document.querySelector('body').onclick=async(e)=>{

        try{
            if(e.target.id== 'delete')
            {
                const id=e.target.parentNode.id;
                
            let response= await axios.delete(`http://localhost:3000/todos/delete-todos/${id}`)
            parentElement.removeChild(e.target.parentNode);
        }
        else if(e.target.id=='check'){
            const id=e.target.parentNode.id;
            let response= await axios.post(`http://localhost:3000/todos/post-donetodo/${id}`)
            
            const parentElement = document.getElementById('listofitems');

            parentElement.removeChild(e.target.parentNode);
    
    const childElement = document.createElement('li');

    
    childElement.textContent = response.data.todo.todos+ ' - ' + response.data.todo.description;
   document.querySelector('#todosdone').appendChild(childElement);
        }
  
        }
        catch(err){
            console.log(err);
        }
    }
    
}


