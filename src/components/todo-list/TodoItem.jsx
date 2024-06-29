import {useEffect, useRef, useState} from "react";

export default function TodoItem({todoId, title, status, deleteFunc, updateFunc}){
    const [editMode, setEditMode] = useState(false)
    const [todoStatus, setTodoStatus] = useState(status)
    const [todoTitle, setTodoTitle] = useState(title)

    const todoRef = useRef(null)

    const focusHandler = () => {
        setEditMode(true)
        todoRef.current.focus();
    }

    const updateHandler =()=> {
        updateFunc(todoId, todoTitle, todoStatus)
        setEditMode(false)
    }

    useEffect(()=> {
        updateHandler()
    }, [todoStatus])

    return (
        <>
            <div className='bg-gray-500 py-4 px-3 m-2 rounded-3xl text-white flex justify-between'>
                <div>
                    <input
                        type="checkbox"
                        className=''
                        defaultChecked={todoStatus}
                        onClick={(e) => {
                            setTodoStatus(e.target.checked)
                        }}
                    />
                        <input
                            className='mx-2 bg-gray-500 outline-0 rounded p-2 focus:bg-gray-700'
                            type='text'
                            ref={todoRef}
                            readOnly={!editMode}
                            defaultValue={todoTitle}
                            onKeyUp={(e) => {
                                setTodoTitle(e.target.value)
                                if (e.key === 'Enter') {
                                    updateHandler()
                                }
                            }}
                            onBlur={updateHandler}
                        />
                </div>
                <div>
                    <button className='bg-gray-800 rounded-full px-3 py-1' onClick={() => deleteFunc(todoId)}>delete
                    </button>
                    <button className='bg-gray-700 rounded-full px-3 py-1' onClick={() => focusHandler()}>edit</button>
                </div>
            </div>
        </>
    );
}