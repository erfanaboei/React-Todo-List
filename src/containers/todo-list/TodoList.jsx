import {useEffect, useState} from "react";
import TodoCreate from "./TodoCreate.jsx";
import {DeleteData, FetchData, PostData, UpdateData} from "../../services/TodoService.jsx";
import TodoItem from "../../components/todo-list/TodoItem.jsx";

export default function TodoList() {
    const [data, setData] = useState([])

    const getData = async ()=> {
        return await FetchData();
    }

    useEffect(() => {
        getData().then(result => {
            setData(result)
        });
    }, []);

    const AddNewTodo = async (title)=> {
        if (title !== ""){
            await PostData({title, status:false}).then(result => {
                setData((prevState) => [...prevState, result])
            })
        }
    }

    const DeleteTodo = async (id) => {
        await DeleteData(id)
        setData((prevState)=> prevState.filter(item => item.id != id))
    }

    const UpdateTodo = async (id, title, status) => {
        const todoIndex = data.findIndex(item => item.id === id);
        let todo = data[todoIndex];
        todo.status = status;
        todo.title = title;
        await UpdateData(id, todo).then(result => {
            if(result.status === 200){
                setData((prevState) =>  {
                    const t = prevState.find(item => item.id === id)
                    t.status = result.data.status;
                    t.title = result.data.title;
                    return [...prevState];
                })
            }
        })
    }

    return (
        <>
            <div className='rounded bg-gray-200 my-auto py-10'>
                <div className=''>
                    <h1 className='block text-3xl font-bold text-blue-950'>Todo List</h1>
                </div>

                <div className='flex'>
                    <div className='w-1/4 mt-3'>
                        <TodoCreate addFunc={AddNewTodo}/>
                    </div>
                    <div className='w-9/12 grid grid-cols-2'>
                        {data.map((item) =>
                            <TodoItem
                                key={item.id}
                                todoId={item.id}
                                title={item.title}
                                status={item.status}
                                deleteFunc={DeleteTodo}
                                updateFunc={UpdateTodo}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}