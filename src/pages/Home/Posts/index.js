import React, { useState, useEffect } from "react";

import "./style.css";

import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBRow
} from "mdbreact";

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
      <MDBRow>
        {posts.map(post => (
          <MDBCol  key={post._id}>
            <MDBCard style={{ width: "22rem" }}>
              <MDBCardImage
                className="img-fluid"
                src={post.thumbnail_url}
                waves
              />
              <MDBCardBody>
                <MDBCardTitle>{post.company}</MDBCardTitle>
                <MDBCardText>{post.description}</MDBCardText>
                <MDBBtn href="#">MDBBtn</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>
    </>
  );
}

export default Posts;

/**
 *
  <ul className="spot-list">
        {posts.map(post => (
          <li key={post._id}>
            <header style={{ backgroundImage: `url(${post.thumbnail_url})` }} />
            <strong>{post.company}</strong>
            <p>{post.description}</p>
            <span>{post.category.map(cat => cat.split(','))}</span>
          </li>
        ))}
      </ul>
 */
