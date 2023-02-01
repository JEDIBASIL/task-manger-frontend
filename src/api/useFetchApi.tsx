import { useState, useEffect } from 'react';
import axios, { AxiosError } from "axios"
import ApiState from '../interface/api.interface';

interface AxiosConfig {
    method: 'get' | 'post' | 'put' | 'delete' | 'patch';
    url: string;
    headers?: object;
    params?: object;
    data?: object;
}

const instance = axios.create({
    baseURL: 'http://localhost:8084/api/v1'
  });


export const useApi = ({ method, url, headers, data }: AxiosConfig) => {
    const [state, setState] = useState<ApiState>({
        data: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchData = async () => {
            setState({ data, loading: false, error: null });
            try {
                const response = await instance[method](url, data, headers);
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
