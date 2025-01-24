import { useState, useEffect } from 'react';
import api from '../api';
import { Post } from '../types/Post';

const PostList = () => {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        api.get<Post[]>('posts/')
            .then((response) => setPosts(response.data))
            .catch((error) => console.error(error));
    }, []);

    return (
        <div>
            <h1>Blog Posts</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <small>{new Date(post.created_at).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
