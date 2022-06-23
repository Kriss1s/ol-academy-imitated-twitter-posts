import './Twitt.css';

export default function Twitt({ userId, id, title, body }) {
  return (
    <div className='twitt-container'>
      <div className='avatar-container'>
        <div className='avatar' style={{ backgroundColor: randomLightColor() }}>
          K
        </div>
      </div>
      <div className='content-container'>
        <div className='content-header'>
          <h3>{title}</h3>
          <div className='more-btn'>...</div>
        </div>
        <div className='content-body'>{body}</div>
        <img src='' alt='' />
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
