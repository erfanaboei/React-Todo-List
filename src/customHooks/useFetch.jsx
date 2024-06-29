import {useEffect, useState} from "react";

function useFetch({url}){
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(url).then(result => {
            if (!result.ok){
                throw Error("Error Fetch Todos")
            }
            return result.json();
        }).then(data => {
            console.log(data)
            setData(data)
            setIsPending(false);
            setError('')
        }).catch(err => {
            setIsPending(false);
            setError(err.message);
        });
    }, []);

    return { data, isPending, error }
}

export default useFetch;