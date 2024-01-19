import LandingPage from "./components/LandingPage";
import { Routes, Route } from "react-router-dom"
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Homepage from "./components/HomePage";
import TaskForm from "./components/TaskForm";

const App = () => {
    return (
        <Routes>
            <Route path="/"  element={<LandingPage />}/>
            <Route path="/auth/register" element={<RegisterForm />}/>
            <Route path="/auth/login" element={<LoginForm />}/>
            <Route path="/tasks"  element={<Homepage />}/>
            <Route path="/task-form"  element={<TaskForm />}/>
        </Routes>
    )
}

export default App;