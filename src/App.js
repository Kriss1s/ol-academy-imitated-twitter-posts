import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import RightPanel from './components/RightPanel';
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

  // const getSingleData = async (dataType, currentId) => {
  //   const data = await getData(`${dataType}${currentId}`);
  //   // console.log(`${dataType}${currentId}`);
  //   // console.log(data);
  //   return data;
  // };

  const createPostList = async num => {
    let data = await getData('posts');

    let postsList = data.filter(e => e.id <= num * 8 && Number(e.id) % 8 === 0);
    let users = await getData('users');
    let photos = await getData('photos');
    let comments = await getData('comments');
    // console.log(postsList);
    postsList.forEach(e => {
      e.photo = photos[e.id].url;
      e.photoText = photos[e.id].title;
      e.userName = users[e.userId].username;
      e.liked = false;
      e.comments = [...comments.filter(com => com.postId === e.id)];
      e.likesNumber = getRandomInt(10000);
      e.sharedNumber = getRandomInt(1000);
    });

    // console.log(postsList);
    setPosts([...postsList]);
  };

  const handleUpdateList = id => {
    // console.log('eee');
    const newData = posts.filter(e => e.id === id);
    setPosts([...newData]);
  };

  useEffect(() => {
    createPostList(numberOfPosts);
  }, []);

  return (
    <div className='container'>
      <Navigation />
      <div className='main-container'>
        {posts.map(post => {
          return (
            <Twitt
              key={post.id}
              getData={getData}
              handleUpdateList={handleUpdateList}
              props={post}
              posts={posts}
            ></Twitt>
          );
        })}
      </div>
      <RightPanel />
    </div>
  );
}

export default App;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
