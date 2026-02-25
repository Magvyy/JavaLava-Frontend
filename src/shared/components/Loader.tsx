import type { ReactNode } from "react";
import type { ApiState } from "../types/ApiResult";
import { TailSpin } from "react-loader-spinner";


interface LoaderProps <T> {
    state: ApiState<T>
    data?: T
    children: (data: T, spinner?: ReactNode) => ReactNode
}
export function Loader <T> ({ state, data, children }: LoaderProps <T>) {

    const spinner = 
        <div className="flex w-full h-full justify-center items-center">
            <TailSpin
                height="40"
                width="40"
                color="#4fa94d"
                ariaLabel="loading"
            />
        </div>

    if (!state.called || state.loading) return (
        <>
            {data ? (
                <>
                    {children(data, spinner)}
                </>
            ) : (
                spinner
            )}
        </>
    )

    const result = state.result;
    if (!result) return null;

    if (result.error) return (
        <div className="flex w-full h-full justify-center items-center">
            {result.error}
        </div>
    )

    if (result.data) return (
        <>
            {data ? children(data) : children(result.data)}
        </>
    )
}