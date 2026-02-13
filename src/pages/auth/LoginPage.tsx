import AuthForm from "@/features/auth/components/AuthForm";



export function LoginPage() {
    return (
        <div className="p-5">
            <AuthForm
                endpoint="/auth/login"
                name="Login"
            />
        </div>
    )
}