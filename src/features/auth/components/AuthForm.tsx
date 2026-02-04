import { useState } from 'react'

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

import './auth-form.css'
import { useAuth } from '../hooks/useAuth'

interface AuthFormProps {
  isLoading?: boolean,
  endpoint: string,
  name: string
}
export default function AuthForm({isLoading = false, endpoint, name}: AuthFormProps) {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { authenticate } = useAuth();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    authenticate(username, password, endpoint);
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle id="auth-card-title">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
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
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={() => authenticate(username, password, endpoint)} className="w-full">
          {name}
        </Button>
        <p id="error-box" className="hidden"></p>
      </CardFooter>
    </Card>
  )
}