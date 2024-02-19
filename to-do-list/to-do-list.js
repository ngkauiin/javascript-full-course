const todoList = [{
  name:'asdfasd',
  dueDate: '02/02/2022'
},
{
  name:'asdfasasdfasdajjd',
  dueDate: '02/09/2022'
}];

renderTodoList();

function renderTodoList() {
  let todoListHTML = '';

  todoList.forEach((todoObject, index) => {
    const {name} = todoObject;
    const {dueDate} = todoObject;
    const html = `
        <div class="to-do-name">${name}</div>
        <div class="to-do-date">${dueDate}</div>
        <button class="delete-button">Delete</button>
      `;
    todoListHTML += html;
  });

  // for (i in todoList) {
  //   const todoObject = todoList[i];
  //   //const name = todoObject.name;
  //   const {name} = todoObject;
  //   const {dueDate} = todoObject;
  //   const html = `
  //       <div class="to-do-name">${name}</div>
  //       <div class="to-do-date">${dueDate}</div>
  //       <button onclick="
  //         todoList.splice(${i}, 1);
  //         renderTodoList();
  //       "
  //       class="delete-button"
  //       >Delete</button>
  //     `;
  //   todoListHTML += html;
  // }

  document.querySelector(".to-do-list").innerHTML = todoListHTML;

  document.querySelectorAll('.delete-button')
    .forEach((deleteButton, index) => {
      deleteButton.addEventListener('click', () => {
        todoList.splice(index, 1);
        renderTodoList();
      });
    });
}

document.querySelector('.add-button')
  .addEventListener('click', ()=>{
    addTodo();
  });

function addTodo() {
  const nameElement = document.querySelector(".name-input");
  const name = nameElement.value;
  const dueDateElement = document.querySelector('.due-date-input');
  const dueDate = dueDateElement.value; 

  todoList.push({name, dueDate});

  nameElement.value = '';
  dueDateElement.value = '';
  renderTodoList();
}