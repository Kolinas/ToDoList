document.addEventListener('DOMContentLoaded', () => {

    let dataBase = []

    const newDataBase = JSON.parse(localStorage.getItem('title'))
    
    const newTask = document.querySelector('.main__title input'),
          newDesc = document.querySelector('.main__decription input'),
          addTask = document.querySelector('#add'),
          taskArea = document.querySelector('.main__block'),
          formAdd = document.querySelector('.form'),
          clearAllTasks = document.querySelector('#clear'),
          taskCounter = document.querySelector('#task'),
          container = document.querySelector('.container');

    
    
    const checkLocalStorage = () => {

        if (localStorage.length === dataBase.length) return;

        return dataBase = newDataBase

    }

    checkLocalStorage()
  
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

        taskCounter.innerHTML = dataBase.length;

        document.querySelectorAll('.delete').forEach((btn, i) => {
            btn.addEventListener('click', () => {
                btn.parentElement.remove();
                dataBase.splice(i, 1);
                localStorage.setItem('title', JSON.stringify(dataBase))
                createToDoList();
            });
        });

        const taskEdit = document.querySelectorAll('.newadd__task')
        const descEdit = document.querySelectorAll('.desc__block')
          
        document.querySelectorAll('.edit').forEach((btn, index) => {
            btn.addEventListener('click', (event) => {
                event.stopPropagation()
                formAdd.reset();
                taskEdit[index].setAttribute('contentEditable', true);
                descEdit[index].setAttribute('contentEditable', true);
                taskEdit[index].focus()
                taskEdit[index].style.cssText = ` 
                box-shadow: 0px 0px 0px 1px red;
                outline: none;
                `
                // descEdit[index].style.cssText = ` 
                // box-shadow: 0px 0px 0px 1px red;
                // outline: none;
                // `

                btn.classList.toggle('accept')

                const acceptBtn = document.querySelector('.accept')

                const titleEditMode = () => {

                    if (taskEdit[index].innerText.length > 200) {
                        dataBase[index].title = taskEdit[index].innerText.slice(0,200);
                        taskEdit[index].removeAttribute('contentEditable');
                    }else {
                        dataBase[index].title = taskEdit[index].innerText;
                        dataBase[index].description = descEdit[index].innerText;
                        localStorage.setItem('title', JSON.stringify(dataBase))
                        taskEdit[index].removeAttribute('contentEditable');
                    }
                }

                const confirmEditfromClick = (e) => {
                    if (e.target === taskEdit[index] || e.target === descEdit[index]) {
                
                    } else {
                        titleEditMode()
                        createToDoList();
                        container.removeEventListener('click', confirmEditfromClick)
                    }
                }
                
                acceptBtn.addEventListener('click', confirmEditfromClick)
                container.addEventListener('click', confirmEditfromClick)


                document.addEventListener('keydown', (e) => {
                    const code = e.code;
                    if (code === 'Enter' && taskEdit[index].classList.contains('newadd__task')) {
                        titleEditMode()
                        createToDoList();
                    }
                });
            });
        });
    }

    if (localStorage.length === 0) {

    } else {
        createToDoList()
    }


    const addNewTask = () => {

        let newTitle = newTask.value; 
        let newDescription = newDesc.value;

        if (!newTitle) {
            newTask.style.border = '2px solid red'
            newTask.focus()
        } else {
            newTask.style.border = 'none'
        }

        if (newTitle) {

            if (newTitle.length > 15) {
                newTitle = newTitle.slice(0,16)
            }

            if (newDescription.length > 20) {
                newDescription = newDescription.slice(0,21)
            }

            dataBase.push({title:newTitle, description:newDescription}); 

            
            // const titles = dataBase.map(el => el.title)
            // const d = dataBase.map(el => el.description)

            localStorage.setItem('title', JSON.stringify(dataBase))

        }

        formAdd.reset();
         createToDoList()
    }

    newTask.addEventListener('input', (e) => {
        if (newTask.value) {
            newTask.style.border = 'none'
        }
    })


    addTask.addEventListener('click', addNewTask)

    clearAllTasks.addEventListener('click', (e) => {
        taskArea.innerHTML = '';
        dataBase.length = 0;
        localStorage.clear()
        // console.log(dataBase.map(el => el.title) === localStorage.getItem('t').split(','));
        let arr = []
        console.log(JSON.parse(localStorage.getItem('title'))); 
        console.log(dataBase);
    })
});
