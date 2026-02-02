import AuthForm from "@/features/auth/components/AuthForm";



export function LoginPage() {
    return (
        <AuthForm
            endpoint="/auth/login"
            name="Login"
        />
    )
}