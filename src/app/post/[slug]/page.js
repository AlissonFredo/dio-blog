"use client"

import { Button, Col, Container, Row } from "react-bootstrap";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from "react";
import { APIKEY, AUTHORIZATION, BASEURL } from "@/services/variables";

export default function Post({ params }) {
    const router = useRouter()

    const [post, setPost] = useState({})

    const getPost = async (id) => {
        const res = await fetch(`${BASEURL}/posts?select=*`, {
            headers: {
                'Authorization': AUTHORIZATION,
                "apikey": APIKEY
            }
        })

        if (!res.ok) {
            throw new Error('Failed to fetch data')
        }

        let result = await res.json()

        result = result.find(value => value.id === id)

        setPost(result)
    }

    useEffect(() => {
        getPost(params.slug)
    }, [])

    return (
        <main>
            <Container>
                <Row>
                    <Col md={12}>
                        <h1 className="d-flex justify-content-center mt-5">
                            <span className="me-3">DIO - Blog</span>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => router.push('/', { scroll: false })}
                            >
                                Voltar
                            </Button>
                        </h1>
                    </Col>
                </Row>
                <Row className="d-flex justify-content-center mt-5">
                    <Col md={8}>
                        <div className="mb-3 bg-body-secondary p-5" >
                            <h3 className="mb-3">{post.title || ''}</h3>
                            <p className="mb-3">{post.description || ''}</p>
                            <p className="mb-3">{post.body || ''}</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}
