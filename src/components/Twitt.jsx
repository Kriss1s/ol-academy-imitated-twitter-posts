import './Twitt.css';

export default function Twitt({
  userId,
  id,
  title,
  body,
  userName,
  liked,
  photo,
  photoText,
  getData,
  handleUpdateList,
}) {
  //   const getSingleData = async (dataType, currentId) => {
  //     const data = await getData(`${dataType}${currentId}`);
  //     // console.log(`${dataType}${currentId}`);
  //     // console.log(data);
  //     return data;
  //   };
  //   console.log(id, liked, userName, photo, photoText);
  return (
    <div className='twitt-container'>
      <div className='avatar-container'>
        <div className='avatar' style={{ backgroundColor: randomLightColor() }}>
          {userName[0].toUpperCase()}
        </div>
      </div>

      <div className='content-container'>
        <div className='content-header'>
          <h3>{userName}</h3>
          <div className='more-btn'>...</div>
        </div>
        <div className='content-body'>
          <div className='text'>{body}</div>
          <div className='img-div'>
            <img className='post-img' src={photo} alt={photoText} />
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
