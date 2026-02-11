import type { ReactNode } from "react";
import type { ApiState } from "../types/ApiResult";
import { TailSpin } from "react-loader-spinner";


interface LoaderProps <T> {
    state: ApiState<T>
    children: (data: T) => ReactNode
    className?: string
}
export function Loader <T> ({ state, children, className }: LoaderProps <T>) {
    if (!state.called || state.loading) return (
        <div className={className ? "flex justify-center items-center " + className : "flex justify-center items-center"}>
            <TailSpin
                height="40"
                width="40"
                color="#4fa94d"
                ariaLabel="loading"
            />
        </div>
    )

    const result = state.result;
    if (!result) return null;

    if (result.error) return (
        <>
            {result.error}
        </>
    )

    if (result.data) return (
        <>
            {children(result.data)}
        </>
    )
}