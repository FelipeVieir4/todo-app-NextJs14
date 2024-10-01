'use client'
import Todo from "@/components/Todo";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.min.css';


export default function Home() {

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  const [todoData, setTodoData] = useState([])

  const fetchTodos = async () => {
    const response = await axios.get("/api")
    setTodoData(response.data.todos)
  }

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete('/api', {
        params: {
          mongoId: id
        }
      })

      toast.success(response.data.message)
      fetchTodos()
    } catch (error) {
      if (error.response.data) {

        toast.error(error.response.data.message)
      } else {

        toast.error(error)
      }

    }
  }

  const updateTodo = async (id) => {
    try {
      const response = await axios.put('/api', {}, {
        params: {
          mongoId: id
        }
      })

      toast.success(response.data.message)
      fetchTodos()
    } catch (error) {
      if (error.response.data) {
        toast.error(error.response.data.message)
      } else {
        toast.error(error)
      }

    }
  }

  useEffect(() => {
    fetchTodos();
  }, [])

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setFormData(form => ({ ...form, [name]: value }))
    console.log(formData)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      //API CODE
      const response = await axios.post("/api", formData)
      console.log(response)
      toast.success(response.data.message )
      setFormData({
        title: '',
        description: ''
      })
      await fetchTodos()
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.response.message)
    }

  }

  return (
    <>
      <ToastContainer />
      <form className="flex items-start flex-col gap-2 w-[80%] max-w-[600px] mt-24 px-2 mx-auto">
        <input value={formData.title} onChange={onChange} type="text" name="title" placeholder="Enter title" className="px-3 py-2 border-2 w-full " required />
        <textarea value={formData.description} onChange={onChange} name="description" placeholder="Enter description" className="px-3 py-2 border-2 w-full " required></textarea>
        <button onClick={onSubmit} type="submit" className="bg-orange-600 py-3 px-11 text-white">Add Todo</button>
      </form>


      <div className="relative overflow-x-auto mt-24 w-[60%] mx-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-700">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Id</th>
              <th scope="col" className="px-6 py-3">Title</th>
              <th scope="col" className="px-6 py-3">Description</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {todoData.map((item, index) => {
              return <Todo id={index} key={index} title={item.title} description={item.description} complete={item.isCompleted} mongoId={item._id} deleteTodo={deleteTodo} updateTodo={updateTodo} />
            })}
          </tbody>
        </table>
      </div>


    </>
  );
}
