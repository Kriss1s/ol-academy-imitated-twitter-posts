import { useState, useEffect } from 'react';
import './Twitt.css';

export default function Twitt({ props, getData, handleUpdateList }) {
  const [post, setPost] = useState({
    userId: props.userId,
    id: props.id,
    title: props.title,
    body: props.body,
    userName: props.userName,
    liked: props.liked,
    photo: props.photo,
    photoText: props.photoText,
  });
  const getSingleData = async (currentId, userId) => {
    const getPhoto = await getData(`photos/${currentId}`);
    const getUserName = await getData(`users?id=${userId}`);
    const getComments = await getData(`comments?postId=${userId}`);
    // console.log(getComments);
    const photo = getPhoto.url;
    const userName = getUserName[0].username;
    const comments = getComments;
    // console.log(`${dataType}${currentId}`);
    // console.log(data);
    const newPost = { ...post, photo, userName };
    setPost(newPost);
  };

  useEffect(() => {
    getSingleData(props.id, props.userId);
  }, []);
  return (
    <div onClick={() => handleUpdateList(post.id)} className='twitt-container'>
      <div className='avatar-container'>
        <div className='avatar' style={{ backgroundColor: randomLightColor() }}>
          {/* {post.userName[0].toUpperCase()} */}
        </div>
      </div>

      <div className='content-container'>
        <div className='content-header'>
          <h3>{post.userName}</h3>
          <div className='more-btn'>...</div>
        </div>
        <div className='content-body'>
          <div className='text'>{post.body}</div>
          <div className='img-div'>
            <img className='post-img' src={post.photo} alt={post.photoText} />
          </div>
        </div>
      </div>
    </div>
  );
}

const randomLightColor = () => {
  let color = '#';
  for (let i = 0; i < 3; i++)
    color += (
      '0' + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)
    ).slice(-2);
  return color;
};
