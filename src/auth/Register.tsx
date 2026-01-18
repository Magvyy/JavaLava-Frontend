import { useState } from 'react'
import './Register.css'
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



export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleRegister();
  }

  const handleRegister = () => {
    fetch("http://localhost:8080/auth/register", {
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
        console.log(response);
        response.json().then(error => {
          let errorBox = document.getElementById("error-box");
          if (errorBox) {
            errorBox.innerHTML = error.message;
            errorBox.classList.remove("hidden");
            errorBox.classList.add("error-box");
          }
        }).catch(e => {
          console.log(e);
        })
      } else {
        response.json().then(token =>  {
          localStorage.setItem("jwt", token.jwt); // Turn into cookie instead
          window.location.href = "/";
        }).catch(e => {
          console.log(e);
        })
      }
    }).catch(e => {
      console.log(e);
    })
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Register</CardTitle>
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
        <Button onClick={handleRegister} className="w-full">
          Register
        </Button>
        <p id="error-box" className="hidden"></p>
      </CardFooter>
    </Card>
  )
}