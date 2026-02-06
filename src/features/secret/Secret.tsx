import { useEffect, useState } from 'react'
import './secret.css'

export default function Secret() {
  const [secret, setSecret] = useState("Hi, it is not me, the not secret.")

  useEffect(() => {
    fetch("http://localhost:8080/secret", {
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
    <>
      {secret}
    </>
  )
}