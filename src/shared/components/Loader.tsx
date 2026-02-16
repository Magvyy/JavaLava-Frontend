import type { ReactNode } from "react";
import type { ApiState } from "../types/ApiResult";
import { TailSpin } from "react-loader-spinner";


interface LoaderProps <T> {
    state: ApiState<T>
    data?: T
    children: (data: T) => ReactNode
    upwards?: boolean
    className?: string
}
export function Loader <T> ({ state, data, children, upwards, className }: LoaderProps <T>) {
    if (!state.called || state.loading) return (
        <>
            {data ? (
                upwards ? (
                    <>
                        <div className={className ? "flex justify-center items-center " + className : "flex justify-center items-center"}>
                            <TailSpin
                                height="40"
                                width="40"
                                color="#4fa94d"
                                ariaLabel="loading"
                            />
                        </div>
                        {children(data)}
                    </>
                ) : (
                    <>
                        {children(data)}
                        <div className={className ? "flex justify-center items-center " + className : "flex justify-center items-center"}>
                            <TailSpin
                                height="40"
                                width="40"
                                color="#4fa94d"
                                ariaLabel="loading"
                            />
                        </div>
                    </>
                )
            ) : (
                <div className={className ? "flex justify-center items-center " + className : "flex justify-center items-center"}>
                    <TailSpin
                        height="40"
                        width="40"
                        color="#4fa94d"
                        ariaLabel="loading"
                    />
                </div>
            )}
        </>
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
            {data ? children(data) : children(result.data)}
        </>
    )
}