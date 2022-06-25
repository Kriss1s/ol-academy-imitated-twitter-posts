import { useState, useEffect } from 'react';
import { BsTwitter, BsBell, BsBookmark, BsPerson } from 'react-icons/bs';
import { RiHome7Fill } from 'react-icons/ri';
import { BiEnvelope } from 'react-icons/bi';
import { FaHashtag } from 'react-icons/fa';
import { CgList, CgMoreO } from 'react-icons/cg';
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

    let postsList = data.filter(e => e.id <= num);
    let users = await getData('users');
    let photos = await getData('photos');
    let comments = await getData('comments');
    // console.log(comments);
    postsList.forEach(e => {
      e.photo = photos[e.id].url;
      e.photoText = photos[e.id].title;
      e.userName = users[e.userId].username;
      e.liked = false;
      e.comments = [...comments.filter(com => com.postId === e.id)];
    });

    console.log(postsList);
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
      <div className='left-container'>
        <ul className='menu-list'>
          <li className='let-panel-buttons twitt-icon-block'>
            <BsTwitter className='twitt-icon' />
          </li>
          <li className='let-panel-buttons'>
            <RiHome7Fill className='nav-icons' />
            <span>Home</span>
          </li>
          <li className='let-panel-buttons'>
            <FaHashtag className='nav-icons' />
            <span>Explore</span>
          </li>
          <li className='let-panel-buttons'>
            <BsBell className='nav-icons' />
            <span>Notifications</span>
          </li>
          <li className='let-panel-buttons'>
            <BiEnvelope className='nav-icons' />
            <span>Messages</span>
          </li>
          <li className='let-panel-buttons'>
            <BsBookmark className='nav-icons' />
            <span>Bookmarks</span>
          </li>
          <li className='let-panel-buttons'>
            <CgList className='nav-icons' />
            <span>Lists</span>
          </li>
          <li className='let-panel-buttons'>
            <BsPerson className='nav-icons' />
            <span>Profile</span>
          </li>
          <li className='let-panel-buttons'>
            <CgMoreO className='nav-icons' />
            <span>More</span>
          </li>
          <button className='twitt-btn'>Tweet</button>
        </ul>
      </div>
      <div className='main-container'>
        {posts.map(post => {
          return (
            <Twitt
              // onClick={() => handleUpdateList(post.id)}
              key={post.id}
              getData={getData}
              handleUpdateList={handleUpdateList}
              props={post}
              posts={posts}
            ></Twitt>
          );
        })}
      </div>
      <div className='right-container'>ggg</div>
    </div>
  );
}

export default App;
