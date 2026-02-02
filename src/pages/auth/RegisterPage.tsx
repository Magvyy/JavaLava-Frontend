import AuthForm from "@/features/auth/components/AuthForm";



export function RegisterPage() {
    return (
        <AuthForm
            endpoint="/auth/register"
            name="Register"
        />
    )
}