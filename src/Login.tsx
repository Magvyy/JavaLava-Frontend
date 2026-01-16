import { use, useState } from 'react'
import './Login.css'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"



export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  

  let redirectToRegister = () => {
    window.location.href = "/register";
  }

  let handleLogin = () => {
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        "user_name": username,
        "password": password
      })
    }).then(response => {
      if (!response.ok) {
        // Tell user through some state in the card
      } else {
        window.location.href = "/";
      }
    }).catch(e => {
      console.log(e);
    })
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <div id="login-card-header">
          <CardTitle id="login-card-title">Login</CardTitle>
          <CardAction>
            <Button variant="link" onClick={redirectToRegister}>Sign Up</Button>
          </CardAction>
        </div>
      </CardHeader>
      <CardContent>
        <form>
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
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  )
}