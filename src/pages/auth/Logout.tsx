import {
  Card,
  CardFooter,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"



export default function Logout() {

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    localStorage.removeItem("user_id");
    window.location.href = "/";
  }

  return (
    <Card className="w-full max-w-sm">
      <CardFooter className="flex-col gap-2">
        <Button onClick={handleLogout} className="w-full">
          Logout
        </Button>
        <p id="error-box" className="hidden"></p>
      </CardFooter>
    </Card>
  )
}