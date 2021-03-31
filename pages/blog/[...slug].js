import { getMdxNode, getMdxPaths } from 'next-mdx/server'
import { useHydrate } from 'next-mdx/client'
import { mdxComponents } from '../../components/mdx-components'
import { useAuth0 } from '@auth0/auth0-react'

export default function PostPage({ post }) {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0()

  const content = useHydrate(post, {
    components: mdxComponents
  })

  return (
    <div className="site-container">
      <article>
        <h1 className="text-4xl font-bold">{post.frontMatter.title}</h1>
        <p>{post.frontMatter.excerpt}</p>
        <hr className="my-4" />

        <div className="prose">{content}</div>
      </article>

      <form className="mt-10">
        <textarea
          rows="2"
          className="border border-gray-300 rounded w-full block px-2 py-1"
        />

        <div className="mt-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-2">
              <button className="bg-blue-600 text-white px-2 py-1 rounded">
                Send
              </button>
              <img src={user.picture} width={30} className="rounded-full" />
              <span>{user.name}</span>
              <button
                typeof="button"
                onClick={() =>
                  logout({ returnTo: process.env.NEXT_PUBLIC_URL + '/blog' })
                }
              >
                x
              </button>
            </div>
          ) : (
            <button
              className="bg-blue-600 text-white px-2 py-1 rounded"
              typeof="button"
              onClick={() => loginWithRedirect()}
            >
              Login
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: await getMdxPaths('post'),
    fallback: false
  }
}

export async function getStaticProps(context) {
  const post = await getMdxNode('post', context)

  if (!post) {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post
    }
  }
}
