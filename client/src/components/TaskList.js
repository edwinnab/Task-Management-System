import TaskCard from "./TaskCard"
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"

const TaskList = () => {
    const [tasks, setTasks] = useState([])
    const navigate = useNavigate()

    const fetchTasks = () => {
        fetch("/tasks")
        .then((res) => {
            if(res.ok) {
                return res.json()
            } 
            if(res.status === 401 || res.status === 404) {
                alert("Unauthorized Access")
                navigate('/')
            }
        })
        .then(data => {
            if(data.length === 0) {
                alert("You do not have any tasks created!");
                navigate('/task-form');
            } else {
                setTasks(data)
            }
        })
        .catch(error => console.error("Error Data: " + error))
    }

    useEffect(() => {
        fetchTasks()
    }, [navigate])

    
    return (

       <>
            {
                tasks.map((item) => {
                    return (
                        <TaskCard 
                            key={item.id}
                            id = {item.id}
                            title={item.title}
                            description={item.description}
                            priority={item.priority}
                            due_date={item.due_date}
                            status={item.status}
                            newTasks={fetchTasks}
                        />
                    )
                })
            }
       </>

    )
}

export default TaskList;