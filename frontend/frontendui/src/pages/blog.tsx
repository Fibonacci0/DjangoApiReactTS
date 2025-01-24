import { useEffect, useState } from "react";
import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";
import DefaultLayout from "@/layouts/default";
import { title, subtitle } from "@/components/primitives";
import { fetchPosts } from "@/utils/api"; // API logic to fetch posts
import { useTheme } from "@/hooks/use-theme"; // Import the useTheme hook
import {Tooltip, Button} from "@heroui/react";



type Post = {
  id: number;
  title: string;
  content: string;
  created_at: string;  // Added created_at for the post creation date
};

export default function IndexPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();  // Use the theme context

  // Fetch posts using the API function
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts(); // Fetch posts via the API
        setPosts(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load blog posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-6 py-12 md:py-16">
        {/* Hero Section */}
        <div className="inline-block max-w-3xl text-center">
          <h1 className={title()}>
            Welcome to{" "}
            <span className={title({ color: "violet" })}>My Blog</span>
          </h1>
          <p className={subtitle({ class: "mt-4" })}>
            Explore articles, stories, and tutorials on various topics.
          </p>
        </div>

        {/* Call-to-Action Buttons */}
        <div className="flex gap-4 mt-8">
          <Link
            className={buttonStyles({
              color: "primary",
              radius: "full",
              variant: "shadow",
              size: "lg",
            })}
            href="/blog"
          >
            View All Posts
          </Link>
          <Link
            className={buttonStyles({
              color: "secondary",
              radius: "full",
              variant: "bordered",
              size: "lg",
            })}
            href="http://127.0.0.1:8000/admin/blog/post/add/"
          >
            Create New Post
          </Link>
        </div>

        {/* Blog Post Highlights */}
        <div className="mt-12 w-full max-w-4xl">
          <h2 className="text-2xl font-semibold text-center mb-6">Latest Posts</h2>
          {loading && (
            <p className="text-center text-gray-600">Loading posts...</p>
          )}
          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}
          {!loading && !error && posts.length === 0 && (
            <p className="text-center text-gray-600">No posts found.</p>
          )}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {!loading &&
              !error &&
              posts.map((post) => (
                  <Link
                      key={post.id}
                      href={`/posts/${post.id}`}
                      className={`relative block p-6 rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 ${
                          theme === 'dark'
                              ? 'bg-purple-700 text-white'
                              : 'bg-blue-200 text-gray-900'
                      }`}
                  >
                    <h3 className="font-medium text-xl mb-2 hover:text-violet-600 transition-all duration-300">
                      {post.title}
                    </h3>
                    <p className="text-sm mb-2">{post.content}</p>

                    {/* Tooltip circle */}
                    <div className="absolute top-4 right-4 flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-900 dark:bg-gray-700 dark:text-white cursor-pointer">
                      <Tooltip
                          content={`Created on: ${new Date(post.created_at).toLocaleDateString()}`}
                          placement="top"
                          showArrow={true}
                      >
                        <span className="font-bold text-xs">i</span>
                      </Tooltip>
                    </div>
                  </Link>
              ))}
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
