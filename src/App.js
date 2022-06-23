import { useState, useEffect } from 'react';
import './App.css';
import Twitt from './components/Twitt';
const URL = 'https://jsonplaceholder.typicode.com/posts';
const numberOfPosts = 10;
function App() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const users = await fetch(`${URL}`);
    const data = await users.json();
    return data;
  };

  const createPostList = async num => {
    let data = await getPosts();
    // console.log(data);
    const postsList = data.filter(e => e.id <= num);
    // console.log(postsList);
    setLoading(false);
    setPosts([...postsList]);
  };

  useEffect(() => {
    createPostList(numberOfPosts);
  }, []);

  if (!loading) {
    console.log('ok');
    console.log(posts);
    return (
      <div className='main-container'>
        {posts.map(post => {
          return <Twitt key={post.id} {...post}></Twitt>;
        })}
      </div>
    );
  }
}

export default App;
