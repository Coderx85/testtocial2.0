import PostCard from '@/components/PostCard';
import { getAllPost } from '@/action/action';

const DashboardPage = async () => {

  const posts = await getAllPost()

  return (
    <section className='container'>
      <div className='grid grid-cols-3 gap-5 my-5 w-full'>
        {posts && posts.map((post, index) =>
          <PostCard 
            key={index}
            post={post}
          />   
        )}
      </div>
    </section>
  )
}

export default DashboardPage