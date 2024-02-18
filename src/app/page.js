"use client"

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {

  const [posts, setPosts] = useState([])

  async function getData() {
    const res = await fetch('https://qylcxevvcwtxviltnbtv.supabase.co/rest/v1/posts?select=*', {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5bGN4ZXZ2Y3d0eHZpbHRuYnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgxMjk4MDAsImV4cCI6MjAyMzcwNTgwMH0.7p7HktT4w6NRK0TOM9nBZNuUCIFkv8_2QsN5l11sIoQ',
        "apikey": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5bGN4ZXZ2Y3d0eHZpbHRuYnR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgxMjk4MDAsImV4cCI6MjAyMzcwNTgwMH0.7p7HktT4w6NRK0TOM9nBZNuUCIFkv8_2QsN5l11sIoQ"
      }
    })


    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    const result = await res.json()


    setPosts(result)

  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <main className={styles.main}>
      <h1>Hello Word 1!</h1>
      {posts.map(value =>
      (
        <h4>{value.title}</h4>
      )
      )}
    </main>
  );
}
