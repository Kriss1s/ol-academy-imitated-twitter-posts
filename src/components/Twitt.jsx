import { useState, useEffect, useRef } from 'react';
import { BsHeart } from 'react-icons/bs';
import { FiMessageCircle } from 'react-icons/fi';
import { BiRepost, BiShare } from 'react-icons/bi';
import './Twitt.css';

export default function Twitt({ props, getData, handleUpdateList, posts }) {
  const [post, setPost] = useState({
    userId: props.userId,
    id: props.id,
    title: props.title,
    body: props.body,
    userName: props.userName,
    liked: props.liked,
    photo: props.photo,
    photoText: props.photoText,
    comments: props.comments,
  });
  const ref = useRef();
  const menuRef = useRef();
  const [isMenuVisible, setIsMenuVisible] = useState();

  const getSingleData = async (currentId, userId) => {
    const getPhoto = await getData(`photos/${currentId}`);
    const getUserName = await getData(`users?id=${userId}`);
    const getComments = await getData(`comments?postId=${userId}`);
    console.log(getComments);
    const photo = getPhoto.url;
    const userName = getUserName[0].username;
    const comments = getComments;
    // console.log(`${dataType}${currentId}`);
    // console.log(data);
    const newPost = { ...post, photo, userName, comments };
    setPost(newPost);
  };

  const handleBullet = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuVisible(!isMenuVisible);
  };

  useEffect(() => {
    getSingleData(props.id, props.userId);
  }, []);

  useEffect(() => {
    const handleCheck = e => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener('click', handleCheck, true);
    return () => {
      document.removeEventListener('click', handleCheck, true);
    };
  });
  return (
    <>
      <div className='twitt-container'>
        <div className='avatar-container'>
          <div
            className='avatar'
            style={{ backgroundColor: randomLightColor() }}
          >
            {post.userName.length > 1 ? post.userName[0].toUpperCase() : ''}
          </div>
        </div>

        <div className='content-container'>
          <div
            onClick={() => handleUpdateList(post.id)}
            className='content-header'
          >
            <h3>{post.userName}</h3>
            <div className='more-btn' onClick={e => handleBullet(e)} ref={ref}>
              ...
            </div>
          </div>
          <div
            className='content-body'
            onClick={() => handleUpdateList(post.id)}
          >
            <div className='text'>{post.body}</div>
            <div className='img-div'>
              <img className='post-img' src={post.photo} alt={post.photoText} />
            </div>
          </div>
          <div className=' btn-container '>
            <div
              className='icon-box comments'
              onClick={() => handleUpdateList(post.id)}
            >
              <FiMessageCircle className='icon' />
              <span>{getRandomInt(500)}</span>
            </div>
            <div className=' icon-box reposts'>
              <BiRepost className='icon' />
              <span>{getRandomInt(3000)}</span>
            </div>
            <div
              onClick={() => setPost({ ...post, liked: !post.liked })}
              className={`like icon-box ${post.liked && 'active'}`}
            >
              <BsHeart className={`icon icon-like ${post.liked && 'active'}`} />
              <span>{getRandomInt(10000)}</span>
            </div>
            <div className='icon-box share'>
              <BiShare style={{ transform: 'scaleX(-1)' }} className='icon' />
            </div>
          </div>
        </div>
        {isMenuVisible && (
          <ul
            ref={menuRef}
            className='bullet'
            style={{
              top: ref.current.offsetTop + 25,
              left: ref.current.offsetLeft,
            }}
          >
            <li
              onClick={() => {
                setIsMenuVisible(!isMenuVisible);
                setPost({ ...post, liked: !post.liked });
              }}
            >
              {post.liked === true ? 'Unlike' : 'Like'}
            </li>
            <li
              onClick={() => {
                setIsMenuVisible(!isMenuVisible);
                handleUpdateList(post.id);
              }}
            >
              See Tweet
            </li>
          </ul>
        )}
      </div>
      {posts.length === 1 ? (
        <div className='comments-container'>
          {post.comments.map(singleComment => {
            return (
              <div className='comment'>
                <div className='avatar-container'>
                  <div
                    className='avatar'
                    style={{ backgroundColor: randomLightColor() }}
                  >
                    {getRandomInt}
                  </div>
                </div>
                <div className='comment-body'>
                  <h3 className=''>{singleComment.name}</h3>
                  <h4>{singleComment.email}</h4>
                  <p>{singleComment.body}</p>
                  <div className='btn-container'>
                    <div className='icon-box comments'>
                      <FiMessageCircle className='com-icon icon' />
                      <span>{getRandomInt(500)}</span>
                    </div>
                    <div className=' icon-box reposts'>
                      <BiRepost className='com-icon icon' />
                      <span>{getRandomInt(3000)}</span>
                    </div>
                    <div className={`like icon-box ${post.liked && 'active'}`}>
                      <BsHeart
                        className={`com-icon icon icon-like ${
                          post.liked && 'active'
                        }`}
                      />
                      <span>{getRandomInt(10000)}</span>
                    </div>
                    <div className='icon-box share'>
                      <BiShare
                        style={{ transform: 'scaleX(-1)' }}
                        className='com-icon icon'
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
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
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
