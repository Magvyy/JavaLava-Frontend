import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import { TailSpin } from 'react-loader-spinner'
import { useAuthenticate } from '../hooks/useAuthenticate'

interface AuthFormProps {
  endpoint: string,
  name: string
}
export default function AuthForm({endpoint, name}: AuthFormProps) {
  const { setUsername, setPassword, authenticate, state } = useAuthenticate(endpoint);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleClick();
  }

  const handleClick = () => {
    authenticate();
  }

  return (
    <Card className="w-full max-w-sm center-sidebar">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 items-center">
        {state.loading ? (
          <TailSpin
              height="40"
              width="40"
              color="#4fa94d"
              ariaLabel="loading"
          />
        ) : (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="user_name">Username</Label>
                <Input
                  id="user_name"
                  type="user_name"
                  placeholder="Magvy"
                  onChange={e => {
                    setUsername(e.target.value);
                  }}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={e => {
                    setPassword(e.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <button type="submit" style={{display: "none"}}/>
          </form>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={() => handleClick()} className="w-full">
          {name}
        </Button>
        <p id="error-box" className="hidden"></p>
      </CardFooter>
    </Card>
  )
}