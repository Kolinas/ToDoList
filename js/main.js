document.addEventListener('DOMContentLoaded', () => {

    const dataBase = []
    
    const newTask = document.querySelector('.main__title input'),
          newDesc = document.querySelector('.main__decription input'),
          addTask = document.querySelector('#add'),
          taskArea = document.querySelector('.main__block'),
          formAdd = document.querySelector('.form'),
          clearAllTasks = document.querySelector('#clear')
    

    const createToDoList = () => {

      taskArea.innerHTML = '';
        
        dataBase.forEach(el => {
          taskArea.innerHTML += `
            <div class="newadd">
            <div class="newadd__task">${el.title}</div>
            <div class="edit"></div>
            <div class="delete"></div>
            </div>
            <div class="desc__block">${el.description}</div>`
        })

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                dataBase.splice(i, 1);
                createToDoList();
            });
        });

        const taskEdit = document.querySelectorAll('.newadd__task')
          
        document.querySelectorAll('.edit').forEach((btn, index) => {
            btn.addEventListener('click', (e) => {
                taskEdit[index].setAttribute('contentEditable', true);
                taskEdit[index].focus()
                taskEdit[index].style.cssText = ` 
                box-shadow: 0px 0px 0px 1px red;
                outline: none;
                `
                document.addEventListener('keydown', (e) => {
                    const code = e.code;
                    if (code === 'Enter' && taskEdit[index].classList.contains('newadd__task')) {
                        dataBase[index].title = taskEdit[index].innerText;
                        taskEdit[index].removeAttribute('contentEditable');
                        createToDoList();
                    }
                });

                document.querySelector('#edit').addEventListener('click', (e) => {
                    dataBase[index].title = taskEdit[index].innerText;
                    taskEdit[index].removeAttribute('contentEditable');
                    createToDoList();
                })
            });
        });
    }

    const addNewTask = () => {
        let newTitle = newTask.value; 
        let newDescription = newDesc.value;
        if (newTitle) {

            if (newTitle.length > 15) {
                newTitle = newTitle.slice(0,16)
            }

            if (newTitle.length > 20) {
                newDescription = newDescription.slice(0,21)
            }

            dataBase.push({title:newTitle, description:newDescription}); 
        }
        formAdd.reset();
         createToDoList()
    }


    addTask.addEventListener('click', addNewTask)

    clearAllTasks.addEventListener('click', () => {
        taskArea.innerHTML = '';
        dataBase.length = 0;
    })
});