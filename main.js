
let title = document.getElementById('title');
let description = document.getElementById('description');
let status = document.getElementById('status');
let dueDate = document.getElementById('dueDate');
let priority = document.getElementById('priority');


// pop up form 

let Ajout = document.getElementById('Ajoute');
let BarMenu = document.getElementById('BarMenu')
function opbar(){
  BarMenu.style.display = 'flex'
  
}
// BarMenu.onclick = ()=>{
//   BarMenu.style.display = 'none'
// }
function closeModal() {
    Ajoute.style.display = 'none';

}
function openAjout() {
  
    Ajoute.style.display = 'flex';
    title.value = '';
    description.value = '';
    status.value = '';
    dueDate.value = '';
    priority.value = '';
    
}

// array
let dataTask 
if(localStorage.Tasks != null){
   dataTask = JSON.parse(localStorage.Tasks); 
}else{
  dataTask = [];
}

//Ajout Task
function getData(){
  //regex for validation data 

let titleRegex = /^[a-zA-Z\s]{1,30}$/; 
let descriptionRegex = /^[\w\s.,-]{1,50}$/; 
let dueDateRegex = /^\d{4}-\d{2}-\d{2}$/; 

if (!titleRegex.test(title.value)) {
    alert("Title can only contain letters and spaces, and must be between 1 and 30 characters long.!!!!!");
    return;
}

if (!descriptionRegex.test(description.value)) {
    alert("Description must be between 1 and 50 characters long and can contain numbers, spaces, and ., - characters.!!!!");
    return;
}

if (!dueDateRegex.test(dueDate.value)) {
    alert("Enter the Due Date !!");
    return;
}

let today = new Date();
today.setHours(0, 0, 0, 0);
let inputDate = new Date(dueDate.value);
let countToday = 0
if (inputDate < today) {
  alert("The due date you entered has passed. Please enter a valid future date. !!!!")
    return; 
} 

let newobj = {
  title : title.value,
  description : description.value,
  status : status.value,
  dueDate : dueDate.value,
  priority : priority.value
}
 dataTask.push(newobj);
 localStorage.setItem('Tasks',JSON.stringify(dataTask));
 closeModal()
 cleardata();
 showdata();
}

// Clear Data

function cleardata(){
 title.value = '';
 description.value = '';
 status.value = '';
 dueDate.value = '';
 priority.value = '';

}
  
// show data
function showdata(){
  let todo = document.getElementById('todo');
  let doing = document.getElementById('doing');
  let done = document.getElementById('done');

  // Clear existing content
  todo.innerHTML = '';
  doing.innerHTML = '';
  done.innerHTML = '';
  // creat compteur tasks
  let CountstoDo = 0;
  let Countsdoing = 0;
  let Countsdone = 0;
  // creat compteur priority
  let countP1 = 0;
  let countP2 = 0;
  let countP3 = 0;
  let countToday = 0
for(let i = 0 ; i < dataTask.length ; i++){
  // count today
  let today = new Date();
   today.setHours(0, 0, 0, 0);
  let inputDate = new Date(dueDate.value);
  if (inputDate.getTime() == today.getTime()){
    countToday++;
  }
  // time 
  let mounth = ["Jan","Fev","Mar","Apr","May","Jun","Aug","Sep","Oct","Nov","Dec"]
  let time = dataTask[i].dueDate.split("-");  
    //change color priority
  let ChangeColor = dataTask[i].priority == 'P1' ? 
  'bg-red-300 text-red-700 border-red-700' : 
  (dataTask[i].priority == 'P2' ? 
  'bg-yellow-200 text-orange-700 border-yellow-600' : 
  'bg-green-200 text-green-700 border-green-700');

       // Card template
       let cards = `<div  class="flex flex-col  bg-cardsColor w-j  mt-1 rounded-xl border-[1px] shadow-xl border-black" draggable="true">
       <div class="flex items-center justify-around flex-nowrap">
           <h3 class="mr-20 text-[18px] ">${dataTask[i].title}</h3> 
           
        <select class="shadow selcup  border rounded  text-gray-700 leading-tight focus:outline-none focus:shadow-outline"

          id="status ${i}" onchange="Updatedata(${i})">
                <option value="1" ${dataTask[i].status === '1' ? 'selected' : ''}>To do</option>
                <option value="2" ${dataTask[i].status === '2' ? 'selected' : ''}>Doing</option>
                <option value="3" ${dataTask[i].status === '3' ? 'selected' : ''}>Done</option>
            <option value="#"class=" mr-2 text-red "  onclick="deletdata(${i})" > Delet</option></select>
         </option>   
        </select>
           
       </div>
       
       <div class="mt-1 w-full h-[60px] text-[13px] text-descpcolor text-start ml-1">
           <h6>${dataTask[i].description}</h6>
       </div>
       <div class="mt-[2px] h-7 flex justify-around items-center">
           <h3 class="${ChangeColor} w-10 h-[23px] rounded-2xl text-center border-2 text-[13px] font-medium">
               ${dataTask[i].priority}
           </h3>
          <h3 class="ml-32 tmpr"><i class="fas fa-clock text-[12px]"></i><span class="ml-2 text-[12px]">${time[2]} ${mounth[time[1] - 1]}</span></h3>
       </div>
       
       </div>
   </div>
   
</div>
   `;

   // total task for today          
   todid.innerHTML = `<span class="ml-9 bg-gray-700 text-white rounded-full px-2 py-1 text-xs">${countToday}</span> `
  // total task 
  tttsk.innerHTML = `<span class="bg-gray-700 text-white rounded-full px-1 py-1 text-xs">${dataTask.length}</span>`
  

   switch (dataTask[i].priority) {
    case 'P1':
      countP1++;
      break;
    case 'P2':
      countP2++;
      break;
    case 'P3':
      countP3++;
      break;
  }

  // compteur for task list (todo - doing -done)
   switch (dataTask[i].status) {
      case '1':
          CountstoDo++;
          todo.innerHTML += cards;
          break;
      case '2':
          Countsdoing++;
          doing.innerHTML += cards;
          break;
      case '3':
          Countsdone++;
          done.innerHTML += cards;
          break;
    }
  }
  // show statistic tasks in todo ,dooing and done 
    if(dataTask.length > 0){
      btntodo.innerHTML = ` <h6> ${CountstoDo}</h6>  `
      btndoing.innerHTML = ` <h6> ${Countsdoing}</h6>  `  
      btndone.innerHTML = ` <h6> ${Countsdone}</h6>  `
      // <i class="fa-solid fa-trash text-rose-500 cursor-pointer" onclick="DeletAll()"></i>   
    }else{
      btntodo.innerHTML = '';
      btndoing.innerHTML = '';
      btndone.innerHTML = '';

    }
    // show statistic P1 P2 P3 
    if(dataTask.length > 0){
      stP1.innerHTML = ` <span class="bg-gray-700 text-white rounded-full px-1 py-1 text-xs">${countP1}</span>`
      stP2.innerHTML = ` <span class="bg-gray-700 text-white rounded-full px-1 py-1 text-xs">${countP2}</span>`
      stP3.innerHTML = ` <span class="bg-gray-700 text-white rounded-full px-1 py-1 text-xs">${countP3}</span>`
    }else{
      stP1.innerHTML =``;
      stP2.innerHTML =``;
      stP3.innerHTML =``;
    }
}  
  


// delet tasks
function deletdata(i){
  dataTask.splice(i,1)
 localStorage.Tasks = JSON.stringify(dataTask);
 showdata();
}
// delet all
function DeletAll(){
  localStorage.clear();
  dataTask.splice(0);
  showdata();
}
//Update Data
function Updatedata(i) {
  let upStatus = document.getElementById(`status ${i}`).value;
  dataTask[i].status = upStatus;
  localStorage.setItem('Tasks', JSON.stringify(dataTask));
  showdata();
}
//tri par Priority

function sortByPriority() {
  // Sort the dataTask array based on the priority
  dataTask.sort((a, b) => {
      const priorityOrder = { P1: 1, P2: 2, P3: 3 }; // Define the order of priority
      return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  // Show the updated data
  showdata();
}


showdata();

