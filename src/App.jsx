import { useState } from 'react'
import './App.css'
import TodoForm from './components/TodoForm/TodoForm'
import TodoList from './components/TodoList/TodoList'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditTodo from './components/EditTodo/EditTodo';


function App() {
const [todos,setTodos] = useState([])
const [isEditing,setIsEditing] = useState(false)
const [edittodo,setEditTodo] = useState({}) 

const addTodo= (todo_name)=>{
  setTodos(pv => [...pv,{
    id : Date.now(),
    name : todo_name,
    completed : false
  }])
  toast('Successfully Added a Todo!!',{
    type: "success",
    position: "top-center",
    autoClose : 2000
  })
}

const changeStatus = (todo_id)=>{
  const updatedTodos = todos.map((todo)=>{
    if(todo.id == todo_id){
      return {...todo,completed : !todo.completed}
    }else{
      return todo
    }
  })
  setTodos(updatedTodos)
}

const deleteTodo= (todo_id)=>{
  const updatedTodos = todos.filter((todo)=>{
    if(todo.id !== todo_id) return todo
  })

  setTodos(updatedTodos)

  toast('Deleted a Todo!!',{
    type: "info",
    position: "top-center",
    autoClose : 2000
  })
}

const showEditForm = (todo)=>{
  setIsEditing(pv=> !pv)
  setEditTodo(todo)
}

const closeEditForm = ()=>{
  setIsEditing(pv => !pv)
}

const updateTodo =(todo_id,todo_name)=>{
  const updatedTodos = todos.map((todo)=>{
    if(todo.id == todo_id){
      return {...todo,name : todo_name }
    }else {
      return todo
    }
  })
  setTodos(updatedTodos)
  setIsEditing(false)
  toast('Successfully Edited the Todo!!',{
    type: "info",
    position: "top-center",
    autoClose : 2000
  })

}

  return (
    <div className="App">
      <h1>TODO Application</h1>
      <TodoForm addTodo={addTodo}/>
      {
        isEditing ? <EditTodo edittodo={edittodo}
                              closeEditForm={closeEditForm}
                              updateTodo={updateTodo} /> 
        :
        <TodoList todos={todos} 
        changeStatus={changeStatus}
        deleteTodo={deleteTodo}
        showEditForm={showEditForm}  />
      }
     
      <ToastContainer/>
    </div>
  )
}

export default App
