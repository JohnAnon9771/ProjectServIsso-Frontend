import React, { useState, useEffect } from "react";

import api from "../../../services/api";

import {
  Card,
  Container,
  CardContent,
  CardMedia,
  Typography,
  Grid
} from "@material-ui/core";

import { useStyles } from "./styles.js";

function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    async function getPosts() {
      const response = await api.get("/posts/index");
      setPosts(response.data);
    }
    getPosts();
  }, []);
  const classes = useStyles();
  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {posts.map(post => (
          <Grid item key={post._id} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={post.thumbnail_url}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {post.company}
                  <p className={classes.subContent}>{post.city}</p>
                </Typography>
                <Typography>{post.description}</Typography>
                <Typography className={classes.subContent}>
                  {post.category}
                </Typography>
              </CardContent>
              <CardContent>{post.createdAt}</CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Posts;
