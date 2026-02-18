import { useEffect, useState } from 'react'

import env from "@/env/environment.json";

export default function Secret() {
  const [secret, setSecret] = useState("Hi, it is not me, the not secret.")

  useEffect(() => {
    fetch(env.backend + "/secret", {
      credentials: "include",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Credentials": "true"
      }
    }).then(response => {
      if (!response.ok) {
        // Tell user through some state in the card
      } else {
        response.text().then(temp => setSecret(temp)).catch(e => {console.log(e);})
      }
    }).catch(e => {
      console.log(e);
    })
  }, []);
    
  return (
    <div className="text-center">
      {secret}
    </div>
  )
}