// src/components/PostCard.tsx
import React from 'react';
import { Card, Text } from '@nextui-org/react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }: { post: { id: string; title: string; excerpt: string } }) => (
  <Card isHoverable isPressable>
    <Link to={`/posts/${post.id}`}>
      <Card.Body>
        <Text h4>{post.title}</Text>
        <Text>{post.excerpt}</Text>
      </Card.Body>
    </Link>
  </Card>
);

export default PostCard;
