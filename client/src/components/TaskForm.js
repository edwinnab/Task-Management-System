import { useState } from "react";
import img from "../assets/logo.png"
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom"

const TaskForm = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "low",
        due_date: "",
        status: "open"
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/tasks", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .catch(error => console.log("Error Data: ", error))
        .finally(() => {
            alert("Added successfull!")
            navigate("/tasks")
        })
    }

 
    return (
        <>
        <NavBar />
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-14 w-auto" src={img} alt="Your Company" />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Add task!  
                </h2>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                        <div className="mt-2">
                            <input 
                            id="title" 
                            name="title" 
                            type="text" 
                            required 
                            value={formData.title}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                        <textarea 
                        id="description" 
                        rows="4" 
                        className="block p-2.5 w-full rounded-lg border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                        placeholder="Write your thoughts here..."
                        value={formData.description}
                        onChange={handleChange}
                        >
                        </textarea>
                    </div>
                    <div>
                        <label htmlFor="priority" className="block text-sm font-medium leading-6 text-gray-900">Select priority</label>
                        <select
                            id="priority"
                            value={formData.priority}
                            onChange={handleChange}
                            className="block p-2.5 w-full rounded-lg border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="due_date" className="block text-sm font-medium leading-6 text-gray-900">Due Date</label>
                        <div className="mt-2">
                            <input 
                            id="due_date" 
                            name="title" 
                            type="date" 
                            required 
                            value={formData.due_date}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">Status</label>
                        <select
                            id="status"
                            placeholder="Select task status"
                            value={formData.status}
                            onChange={handleChange}
                            className="block p-2.5 w-full rounded-lg border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"    
                        >
                            <option value="open">Open</option>
                            <option value="pending">In Progress</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    
                    <div>
                        <button type="submit" 
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Add Task
                        </button>
                    </div>
                </form>
            </div>
        </div> 
        </>  
    )
}

export default TaskForm;