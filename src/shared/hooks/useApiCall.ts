import { useEffect, useState } from "react"
import type { ApiState } from "../types/ApiResult"

interface HandleApiResponseProps {
    endpoint: string
    credentials?: boolean
    method: string
    body?: string
}
export const useApiCall = <T> () => {
    const [state, setState] = useState<ApiState<T>>({
        called: false,
        loading: false,
        result: undefined
    });

    const handleApiCall = async ({ endpoint, credentials, method, body }: HandleApiResponseProps) => {
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
                        error: undefined
                    }
                });
            } else {
                setState({
                    called: true,
                    loading: false,
                    result: {
                        data: undefined,
                        error: response.status.toString()
                    }
                });
                    }
        } catch (err: any) {
            setState({
                called: true,
                loading: false,
                result: {
                    data: undefined,
                    error: err.message
                }
            });
        }
    }
    
    return { state, handleApiCall };
}