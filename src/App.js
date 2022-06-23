import { useState, useEffect } from 'react';
import './App.css';
import Twitt from './components/Twitt';

const URL = 'https://jsonplaceholder.typicode.com/';
const numberOfPosts = 10;
function App() {
  const [posts, setPosts] = useState([]);

  const getData = async dataType => {
    const users = await fetch(`${URL}${dataType}`);
    const data = await users.json();
    return data;
  };

  const getSingleData = async (dataType, currentId) => {
    const data = await getData(`${dataType}${currentId}`);
    // console.log(`${dataType}${currentId}`);
    // console.log(data);
    return data;
  };

  const createPostList = async num => {
    let data = await getData('posts');
    let users = await getData('users');
    let photos = await getData('photos');

    let postsList = data.filter(e => e.id <= num);
    postsList.forEach(e => {
      e.photo = photos[e.id].url;
      e.photoText = photos[e.id].title;
      e.userName = users[e.userId].username;
      e.liked = false;
    });

    console.log(postsList);
    setPosts([...postsList]);
  };

  const handleUpdateList = newData => {
    setPosts([...posts, newData]);
  };

  useEffect(() => {
    createPostList(numberOfPosts);
  }, []);

  return (
    <div className='main-container'>
      {posts.map(post => {
        return (
          <Twitt
            key={post.id}
            getData={getData}
            handleUpdateList={handleUpdateList}
            {...post}
          ></Twitt>
        );
      })}
    </div>
  );
}

export default App;
