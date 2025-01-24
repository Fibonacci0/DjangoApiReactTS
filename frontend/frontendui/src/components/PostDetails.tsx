// src/components/PostDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Text, Container } from '@nextui-org/react';
import { fetchPostById } from '../utils/api';

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const getPost = async () => {
      const data = await fetchPostById(id!);
      setPost(data);
    };

    getPost();
  }, [id]);

  return (
    <Container>
      {post ? (
        <>
          <Text h1>{post.title}</Text>
          <Text>{post.content}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </Container>
  );
};

export default PostDetails;
