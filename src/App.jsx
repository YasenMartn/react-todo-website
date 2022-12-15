import React, { useEffect, useState } from 'react';
import Button from './Components/Button';
import DarkMode from './Components/DarkMode';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import toast from 'react-hot-toast';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

const App = () => {

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("")
  const [status, setStatus] = useState("incomplete")
  const [btn, setBtn] = useState("add")

  // getting todos from localstorage
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      return JSON.parse(savedTodos);
    } else {
      return [];
    }
  });

  // open close modal
  const handleOpen = () => {
    setOpen(true);
    setBtn("add");
    setTitle("")
    setStatus("incomplete")
  }
  const handleClose = () => setOpen(false);

  // saving todos to local storage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos , open]);

  // add todo
  const addTodo = () => {
    const date = new Date();
    let minute = date.getMinutes();
    let hour = date.getHours();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate = `${hour}:${minute < 10 ? "0" + minute : minute} , ${day < 10 ? "0" + day : day}-${month}-${year}`;
    const newTodo = {title, status, id: Math.floor(Math.random() * 100), date: currentDate}
    setTodos(todos => [...todos, newTodo])
    setOpen(false)
    setTitle("")
    setStatus("incomplete")
    toast.success('Task added successfully!')
  }

  // delete todo
  const deleteTodo = (id) => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
    toast.success('Task deleted successfully!')
  }

  // id of todo
  const [todoId, setTodoId] = useState()

  // open modal to edit todo
  const openToEdit = (i) => {
    setBtn("update")
    setOpen(true)
    setTitle(i.title)
    setTodoId(i.id)
    setStatus(i.status)
  }

   // update todo
   const updateTodo = () => {
    const newTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        
        return { ...todo, title, status};
      }
      return todo;
    });
    setTodos(newTodos);
    setTitle("");
    setStatus("incomplete")
    setOpen(false)
    toast.success('Task updated successfully!')
  }
  
  // toggle todo status
  const toggleStatus = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: todo.status === "complete" ? "incomplete" : "complete"};
      }
      return todo;
    });
    setTodos(newTodos);
  }

  // sorting todos
  const [filter, setFilter] = useState("all")

  const filteredTodoList = todos.filter((item) => {
    if (filter === 'all') {
      return true;
    }
    return item.status === filter;
  });

  // deleting all todos
  const deleteTodos = () => {
    if(todos.length > 0){
      setTodos([])
      toast.success('Tasks deleted successfully!')
    } else {
    toast.error('There are no tasks to delete')
    }
  }

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-[100vh] bg-white dark:bg-slate-900 relative overflow-hidden">

      {/* delete all button */}
      <div className="absolute top-5 left-5 z-20">
        <IconButton onClick={() => deleteTodos()} className="dark:text-white">
          <DeleteIcon />                
        </IconButton>
      </div>

      {/* dark mode button */}
      <DarkMode />

      {/* circle */}
      {/* <div className='w-[500px] h-[500px] absolute -bottom-[250px] -right-[250px] bg-purple-1 rounded-full blur-[100px]'></div>
      <div className='w-[500px] h-[500px] absolute -top-[250px] -left-[250px] bg-purple-1 rounded-full blur-[100px]'></div> */}


      <div className="w-full flex flex-col items-center justify-start space-y-5 p-5 pb-0">

        {/* heading section */}
        <h1 className='text-center text-5xl font-bold text-black-1 dark:text-white z-20'>TODO APP</h1>
        <div className="flex items-center justify-between md:w-[700px] w-full">
          <Button bg="bg-purple-1 text-white z-20" onClick={handleOpen}>Add Task</Button>
          <select className='bg-gray-1 px-2 py-2 rounded-md text-base font-medium' value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="complete">Complete</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </div>

     
      
        {/* todo section */}
        <div className='bg-gray-2 dark:bg-slate-600 md:w-[700px] w-full rounded-md z-20'>
          {filteredTodoList.length > 0 ? 
            <div className='space-y-5 p-5'>
              {filteredTodoList.map(i => (
                <div  key={i.id}
                  className='bg-white px-3 pr-0 py-2 rounded-md flex items-center justify-between dark:bg-slate-800 dark:text-white' 
                >
                  <div className='flex flex-row items-center justify-center space-x-2'>
                    <div onClick={() => toggleStatus(i.id)}
                      className={`cursor-pointer flex items-center justify-center`}
                    >
                      {i.status === "incomplete" ?
                        <CheckBoxOutlineBlankIcon className='text-black-2 dark:text-white'/>
                        :
                        <CheckBoxIcon className='text-purple-1'/>
                      }
                    </div>
                    <div className='flex flex-col text-black-2 dark:text-white'>
                      <span className={`${i.status === "incomplete" ? "" : "line-through"} break-all font-medium`}>{i.title}</span>
                      <span className='text-sm'>{i.date}</span>
                    </div>
                  </div>
                  <div className='flex flex-row items-center justify-center'>
                    <IconButton onClick={() => openToEdit(i)} className="dark:text-white">
                      <EditIcon className='dark:text-white'/>                
                    </IconButton>
                    <IconButton onClick={() => deleteTodo(i.id)} className="dark:text-white">
                      <DeleteIcon className='dark:text-white'/>                
                    </IconButton>
                  </div>
                </div>
              ))}
            </div> 
          :   
          <div  className='flex items-center justify-center flex-col p-5 space-y-2 bg-gray-2 dark:bg-slate-800 rounded-md'>
            <img src="/emptyp.png" alt="empty" className='w-40 h-40 object-contain' />
            <span className='font-bold text-black-2 dark:text-white text-2xl'>NO TODOS!</span>
            <span className='font-medium text-black-2 dark:text-slate-400 text-base'>Your todo app is empty</span>
            <span className='font-medium text-black-2 dark:text-slate-400 text-base'>Let's add some todos shall we ?</span>
            <Button bg="bg-purple-1 text-white" onClick={handleOpen}>Add Task</Button>
          </div> 
          }
        </div>

      </div>

      {/* modal */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{timeout: 500}}
        className="flex items-center justify-center"
      >
        <Fade in={open}>
          <div className="sm:w-[500px] w-[90%] bg-white dark:bg-slate-800 rounded-lg p-5 absolute flex flex-col space-y-5">

            <span className='dark:text-white text-black-1 font-medium text-xl'>
              {btn === "add" ? "Add Todo" : "Update Todo"}
            </span>

            <label className='dark:text-white text-black-1'>Title</label>
            <input type="text" value={title} className='p-2 border border-black-1 rounded-md' onChange={(e) => setTitle(e.target.value)} />

            <label className='dark:text-white text-black-1'>Status</label>
            <select value={status} className='bg-gray-1 px-2 py-2 rounded-md text-base font-medium' onChange={(e) => setStatus(e.target.value)}>
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </select>

            <div className='space-x-2'>
              {btn === "add" ?
                <Button bg="bg-purple-1 text-white" 
                  onClick={() => title.length > 0 && title.trim().length !== 0 ? addTodo() : toast.error("Please enter a title")}
                  onKeyDown={(e) => e.key === 'Enter' && title.length > 0 ? addTodo() : toast.error("Please enter a title")}
                >
                  Add Task
                </Button>
              :
                <Button bg="bg-purple-1 text-white" 
                  onClick={() => title.length > 0 ? updateTodo() : toast.error("Please enter a title")}
                  onKeyDown={(e) => e.key === 'Enter' && title.length > 0 ? updateTodo() : toast.error("Please enter a title")}
                >
                  Update Task
                </Button>
              }
               
              <Button bg="bg-gray-1 text-black-1" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>

            <div 
              onClick={() => setOpen(false)}
              className='bg-white dark:bg-slate-800 absolute right-0 -top-20 p-2 cursor-pointer group hover:bg-red-500 dark:hover:bg-red-500 rounded-lg transition-all duration-300 ease-in'
            >
              <CloseIcon className='text-black dark:text-white group-hover:text-white transition-all duration-300 ease-in'/>
            </div>

          </div>
        </Fade>
      </Modal>

    </div>
  );
}

export default App;
