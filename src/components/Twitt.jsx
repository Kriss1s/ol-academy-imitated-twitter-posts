import { useState, useEffect, useRef } from 'react';
import { BsHeart } from 'react-icons/bs';
import { FiMessageCircle } from 'react-icons/fi';
import { BiRepost, BiShare } from 'react-icons/bi';
import {
  getRandomInt,
  randomLightColor,
} from '../functions/additionalFunctions';
import './Twitt.css';

export default function Twitt({ props, handleUpdateList, posts }) {
  const [post, setPost] = useState({
    ...props,
  });
  const ref = useRef();
  const menuRef = useRef();
  const btnRef = useRef();
  const [isMenuVisible, setIsMenuVisible] = useState();

  const handleBullet = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuVisible(!isMenuVisible);
  };
  const likeFunction = () => {
    setPost({
      ...post,
      liked: !post.liked,
      likesNumber: post.liked ? post.likesNumber - 1 : post.likesNumber + 1,
    });
  };
  useEffect(() => {
    const handleCheck = e => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        !ref.current.contains(e.target)
      ) {
        setIsMenuVisible(!isMenuVisible);
      }
    };

    document.addEventListener('click', handleCheck, true);
    return () => {
      document.removeEventListener('click', handleCheck, true);
    };
  });

  return (
    <>
      <div
        className='twitt-container'
        onClick={e => {
          if (posts.length > 1 && !btnRef.current.contains(e.target)) {
            handleUpdateList(post.id);
          }
        }}
      >
        <div className='avatar-container'>
          <div
            className='avatar'
            style={{ backgroundColor: randomLightColor() }}
          >
            {post.userName.length > 1 ? post.userName[0].toUpperCase() : ''}
          </div>
        </div>

        <div className='content-container'>
          <div className='content-header'>
            <h3>{post.userName}</h3>
            <div className='more-btn' onClick={e => handleBullet(e)} ref={ref}>
              ...
            </div>
          </div>
          <div className='content-body'>
            <div className='text'>{post.body}</div>
            <div className='img-div'>
              <img className='post-img' src={post.photo} alt={post.photoText} />
            </div>
          </div>
          <div className=' btn-container ' ref={btnRef}>
            <div
              className='icon-box comments'
              onClick={() => {
                posts.length > 1 && handleUpdateList(post.id);
              }}
            >
              <FiMessageCircle className='icon' />
              <span>{post.comments.length}</span>
            </div>
            <div className=' icon-box reposts'>
              <BiRepost className='icon' />
              <span>{post.sharedNumber}</span>
            </div>
            <div
              onClick={likeFunction}
              className={`like icon-box ${post.liked && 'active'}`}
            >
              <BsHeart className={`icon icon-like ${post.liked && 'active'}`} />
              <span>{post.likesNumber}</span>
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
              onClick={e => {
                e.stopPropagation();
                setIsMenuVisible(!isMenuVisible);
                likeFunction();
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
                    {getRandomInt(10)}
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
