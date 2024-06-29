import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 1000,
})

export const FetchData= async () => {
    try {
        const response = await apiClient.get('/todos');
        return response.data
    }catch (error){
        console.error(error)
        throw error;
    }
}

export const PostData = async (data)=> {
    try{
        const response = await apiClient.post('/todos', data);
        return response.data;
    }catch (error){
        console.error(error)
        throw error;
    }
}

export const DeleteData = async (id) => {
    try{
        const response = await apiClient.delete(`/todos/${id}`);
        return response
    }catch (error){
        console.error(error);
        throw error;
    }
}

export const UpdateData = async (id, data) => {
    try{
        const response = await apiClient.put(`/todos/${id}`, data)
        return response
    }catch (error){
        console.error(error)
        throw error
    }
}