const EditForm = ({onsubmit, onchange, formdata}) => {
    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={onsubmit}>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">Title</label>
                    <div className="mt-2">
                        <input 
                        id="title" 
                        name="title" 
                        type="text" 
                        required 
                        value={formdata.title}
                        onChange={onchange}
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
                    value={formdata.description}
                    onChange={onchange}
                    >
                    </textarea>
                </div>
                <div>
                    <label htmlFor="priority" className="block text-sm font-medium leading-6 text-gray-900">Select priority</label>
                    <select
                        id="priority"
                        value={formdata.priority}
                        onChange={onchange}
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
                        value={formdata.due_date}
                        onChange={onchange}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">Status</label>
                    <select
                        id="status"
                        placeholder="Select task status"
                        value={formdata.status}
                        onChange={onchange}
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
                        Edit Task
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditForm;