const btn = document.querySelector('.btn');
const input = document.querySelector('#input');
const list = document.querySelector('.list');

let dataTodo = [];
let check = false;

if(!dataTodo.length){
    dataTodo = JSON.parse(localStorage.getItem('todo')) || [];
    inerTml(dataTodo);
    
}

btn.addEventListener('click', addItem);

function addItem(){
    let id = dataTodo.length += 1;
    if(!input.value) return -1;
    let newItem = {
        id,
        text: input.value,
        complet: false,
    }
   
    dataTodo.push(newItem);
    localStorage.setItem('todo', JSON.stringify(dataTodo));
    inerTml(dataTodo)
}

function inerTml(data){
    if(!dataTodo.length) return;
     list.innerHTML = '';
    for(let item of data){
        if(!item) continue;
        let html = `
        <li>
          <span style="text-decoration:${item.complet ? 'line-through' : 'none'};" class="item" data-id="${item?.id}">${item?.text}</span> 
         <input type="button" data-id="${item?.id}" class="remove" value="delete" />
        </li>
        `;

        list.insertAdjacentHTML('afterbegin', html)
    }

    document.querySelectorAll('.remove').forEach(el => {
        el.addEventListener('click', (e) =>{
            deleteItem(dataTodo, +e.target.dataset.id)
        })
    })
    document.querySelectorAll('.item').forEach(el => {
        el.addEventListener('click', (e) =>{
            check = !check;
            
            const zData = JSON.parse(localStorage.getItem('todo'));
            
            if(check) zData.find(el => el?.id === +e.target.dataset.id).complet = true;
            else zData.find(el => el?.id === +e.target.dataset.id).complet = false;
            localStorage.setItem('todo', JSON.stringify(zData))
            inerTml(JSON.parse(localStorage.getItem('todo')));
            dataTodo = [...zData];
            
        })
    })
    input.value = '';
}


function deleteItem(data, index){
    let database = [];
    for(let item of data){
    if(item?.id === index) continue;
       database.push(item);
    }

    localStorage.setItem('todo', JSON.stringify(database));
    location.reload();
}