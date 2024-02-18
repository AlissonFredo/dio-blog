"use client"

import { useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { useRouter } from 'next/navigation'
import { APIKEY, AUTHORIZATION, BASEURL } from "@/services/variables";

export default function Home() {
  const router = useRouter()

  const [posts, setPosts] = useState([])

  async function getData() {
    const res = await fetch(`${BASEURL}/posts?select=*`, {
      headers: {
        'Authorization': AUTHORIZATION,
        "apikey": APIKEY
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
    <main>
      <Container>
        <Row>
          <Col md={12}>
            <h1 className="d-flex justify-content-center mt-5">DIO - Blog</h1>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-5">
          <Col md={8}>
            <ListGroup as="ul" variant="flush">
              {posts.map((value, key) => (
                <ListGroup.Item as="li" className="mb-3 bg-body-secondary p-5" key={key}>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="primary"
                      onClick={() => router.push(`/post/${value.id}`, { scroll: false })}
                    >
                      Ver mais
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </main>
  );
}
