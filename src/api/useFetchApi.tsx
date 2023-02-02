import { useState, useEffect } from 'react';
import axios, { AxiosError } from "axios"
import ApiState from '../interface/api.interface';
import { getAuthToken } from '../utils/auth';

interface AxiosConfig {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    url: string;
    headers?: object;
    params?: object;
    data?: object;
}


const instance = axios.create({
    baseURL: 'https://jedibasil-task-manger-backend.onrender.com/api/v1',
    headers: {
        "Authorization": `Bearer ${getAuthToken("rqwt")}`
    }
});


export const useApi = ({ method, url, data }: AxiosConfig) => {
    const [state, setState] = useState<ApiState>({
        data: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            setState({ data, loading: true, error: null });
            try {
                const response = await instance[method](url, data);
                const fetchedData = response.data;
                setState({ data: fetchedData, loading: false, error: null });
            } catch (error: unknown) {
                if (error instanceof Error)
                    setState({ data: null, loading: false, error });
            }
        };

        fetchData();
    }, [url]);

    return state;
};

export const requestHandler = ({ method, url, headers, data }: AxiosConfig, setResponse: React.Dispatch<React.SetStateAction<ApiState>>) => {
    setResponse({ data: {}, loading: true, error: null });
    console.log(data)
    instance[method](url, data, headers)
        .then(res => {
            const fetchedData = res.data;
            setResponse({ data: fetchedData, loading: false, error: null });
            console.log(res.data)
        })
        .catch(e => {
            if (e instanceof AxiosError)
                setResponse({ data: null, loading: false, error: e?.response });
        })
}
