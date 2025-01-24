import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchPostById } from '@/utils/api';

const PostPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get post ID from the URL
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const loadPost = async () => {
        try {
          const postData = await fetchPostById(id as string);
          setPost(postData);
        } catch (err) {
          setError('Error fetching post.');
        } finally {
          setLoading(false);
        }
      };

      loadPost();
    }
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="post-page">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500">{new Date(post.created_at).toLocaleDateString()}</p>
      <div className="content mt-4">{post.content}</div>
    </div>
  );
};

export default PostPage;
