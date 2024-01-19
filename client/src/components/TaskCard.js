import { useState } from 'react'
import EditForm from "../components/EditForm"

const TaskCard = ({id, title, description, priority, due_date, status, newTasks}) => {

    const [showForm, setShowForm] = useState(false)

    const [formData, setFormData ] = useState({
        title,
        description,
        priority,
       due_date,
       status
    })
    
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const toggleForm = () => {
        setShowForm(!showForm)
    }

    const handleUpdate = () => {
        fetch(`/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => toggleForm())
        .catch(error => console.error("Error Data: ", error))
    }

    const handleDelete = () => {
        fetch(`/tasks/${id}`, {
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            if(res.ok) {
                res.json()
                newTasks()
            } else {
                alert("Error Occurred!")
            }
        })
        .catch(error => console.error("Error Data: ", error))
    }

    return ( 
        <> 
        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-base font-semibold leading-6 text-gray-900" id="modal-title">{title}</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">{description}</p>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm font-semibold text-gray-600">Due Date: <span>{due_date}</span></p>
                                            <p className="text-sm font-semibold text-gray-600">Priority: <span>{priority}</span></p>
                                            <p className="text-sm font-semibold text-gray-600">Status: <span>{status}</span></p>
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button 
                            type="button" 
                            onClick={handleDelete}
                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Delete
                            </button>
                            <button 
                            type="button" 
                            onClick={handleUpdate}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 sm:mt-0 sm:w-auto">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {
            showForm ? (<EditForm  onsubmit={handleUpdate} onchange={handleChange} formdata={formData} />) : null
        }
    </>
    )
}

export default TaskCard;