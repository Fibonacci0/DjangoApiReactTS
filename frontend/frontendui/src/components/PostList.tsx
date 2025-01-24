// src/components/PostList.tsx
import React, { useEffect, useState } from 'react';
import { Grid, Text } from '@nextui-org/react';
import { fetchPosts } from '../utils/api';
import PostCard from './PostCard';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts();
      setPosts(data);
    };

    getPosts();
  }, []);

  return (
    <Grid.Container gap={2}>
      {posts.length > 0 ? (
        posts.map((post: any) => (
          <Grid xs={12} sm={6} md={4} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))
      ) : (
        <Text>No posts available.</Text>
      )}
    </Grid.Container>
  );
};

export default PostList;
