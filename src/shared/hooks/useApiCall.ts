import { useEffect, useState } from "react"
import type { ApiState } from "../types/ApiResult"

interface HandleApiResponseProps {
    endpoint: string
    credentials?: boolean
    method: string
    body?: string
    authenticate?: boolean
}
export const useApiCall = <T> ({ endpoint, credentials, method, body }: HandleApiResponseProps) => {
    const [state, setState] = useState<ApiState<T>>({
        called: false,
        loading: false,
        result: null
    });

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
                    body: (method === "POST") ? body : null
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
                    called: true,
                    loading: false,
                    result: {
                        data: responseJSON,
                        error: null
                    }
                });
            } else {
                setState({
                    called: true,
                    loading: false,
                    result: {
                        data: null,
                        error: response.status.toString()
                    }
                });
                    }
        } catch (err: any) {
            setState({
                called: true,
                loading: false,
                result: {
                    data: null,
                    error: err.message
                }
            });
        }
    }
    
    return { state, handleApiCall };
}