import React, { useState, useEffect } from "react";

import "./style.css";

import { Card } from "react-bootstrap";

import api from "../../../services/api";

function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const response = await api.get("/posts/index");
      setPosts(response.data);
    }
    getPosts();
  }, []);
  return (
    <>
      {posts.map(post => (
        <Card className="bg-dark text-white mt-2 post-list" key={post._id}>
          <Card.Img src={post.thumbnail_url} alt="Card image" />
          <Card.ImgOverlay>
            <Card.Title>{post.company}</Card.Title>
            <Card.Text>{post.description}</Card.Text>
            <Card.Text>{post.category}</Card.Text>
          </Card.ImgOverlay>
        </Card>
      ))}
    </>
  );
}

export default Posts;

/**
 *
 */
