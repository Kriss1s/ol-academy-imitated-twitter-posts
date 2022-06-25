import { BsTwitter, BsBell, BsBookmark, BsPerson } from 'react-icons/bs';
import { RiHome7Fill } from 'react-icons/ri';
import { BiEnvelope } from 'react-icons/bi';
import { FaHashtag } from 'react-icons/fa';
import { CgList, CgMoreO } from 'react-icons/cg';

export default function Navigation() {
  return (
    <>
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

        <div className='user-block'>
          <div className='user-avatar'></div>
          <div className='user-info'>
            <p>First User</p>
            <p className='grey'>@firstUser</p>
          </div>
        </div>
      </div>
    </>
  );
}
