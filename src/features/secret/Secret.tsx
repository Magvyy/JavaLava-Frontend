import { useEffect, useState } from 'react'
import './secret.css'

export default function Secret() {
  const [secret, setSecret] = useState("Hi, it is not me, the not secret.")

  useEffect(() => {
    let token = localStorage.getItem("jwt");
    if (token != null) {
      fetch("http://localhost:8080/secret", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
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
    }
  }, []);
    
  return (
    <>
      {secret}
    </>
  )
}