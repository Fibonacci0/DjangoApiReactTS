import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import DefaultLayout from '@/layouts/default';
import { fetchPostById } from '@/utils/api';

type Post = {
  id: number;
  title: string;
  content: string;
};

export default function PostPage() {
  const router = useRouter();
  const { id } = router.query; // Extract the `id` query parameter
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch the post data
  const loadPost = async (postId: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPostById(postId);
      setPost(data);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id || typeof id !== 'string') {
      setError('Invalid post ID.');
      return;
    }

    // Delay fetching data slightly to avoid unnecessary re-renders
    const timeout = setTimeout(() => {
      loadPost(id);
    }, 300);

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, [id]);

  if (!id || typeof id !== 'string') {
    return (
      <DefaultLayout>
        <div className="text-center py-12 text-red-500">
          Invalid or missing post ID.
        </div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      {loading ? (
        <div className="text-center py-12">Loading post...</div>
      ) : error ? (
        <div className="text-center text-red-500 py-12">{error}</div>
      ) : post ? (
        <article className="max-w-4xl mx-auto py-12">
          <h1 className="text-3xl font-bold mb-6">{post.title}</h1>
          <div className="prose">{post.content}</div>
        </article>
      ) : (
        <div className="text-center py-12">Post not found.</div>
      )}
    </DefaultLayout>
  );
}
