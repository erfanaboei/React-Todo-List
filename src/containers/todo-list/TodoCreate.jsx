import {useState} from "react";

export default function TodoCreate({addFunc}){
    const [todo, setTodo] = useState("")

    return (
        <>
            <div>
                <input type="text"
                       placeholder='Plese Enter Your Todo'
                       className="p-3 bg-gray-300 border-gray-600 outline-0 rounded-l-2xl text-gray-500"
                       onChange={(e) => setTodo(e.target.value)}
                       onKeyUp={(e) => {
                           if(e.keyCode === 13) {
                                addFunc(todo)
                                setTodo("")
                           }
                       }}
                       value={todo}
                />
                <button
                    onClick={() => {
                        addFunc(todo)
                        setTodo("")
                    }}
                    className="p-3 bg-gray-500 text-white rounded-r-2xl"
                >Add
                </button>
            </div>
        </>
    )
}