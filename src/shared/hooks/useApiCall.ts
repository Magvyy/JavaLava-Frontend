import { useEffect, useState } from "react"
import type { ApiState } from "../types/ApiResult"

interface HandleApiResponseProps {
    endpoint: string
    credentials?: boolean
    method: string
    data?: string
}
export const useApiCall = <T> ({ endpoint, credentials, method, data }: HandleApiResponseProps) => {
    const [state, setState] = useState<ApiState<T>>({
        loading: true,
        result: null
    });

    useEffect(() => {
        const handleApiCall = async () => {
            try {
                const response = (credentials)
                    ? await fetch(endpoint, {
                        credentials: "include",
                        method: method,
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json",
                            "Access-Control-Allow-Credentials": "true"
                        },
                        body: (method === "POST") ? data : null
                    })
                    : await fetch(endpoint, {
                        method: method,
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        }
                    });

                if (response.ok) {
                    const responseJSON = await response.json();
                    setState({
                        loading: false,
                        result: {
                            data: responseJSON,
                            error: null
                        }
                    });
                } else {
                    setState({
                        loading: false,
                        result: {
                            data: null,
                            error: response.status.toString()
                        }
                    });
                        }
            } catch (err: any) {
                setState({
                    loading: false,
                    result: {
                        data: null,
                        error: err.message
                    }
                });
            }
        }
        handleApiCall();
    }, []);
    
    return state;
}