import { getRandomInt } from '../functions/additionalFunctions';

export default function RightPanel() {
  const trends = ['Tesla', 'Movies', 'Harry Potter', 'Space', 'React'];

  return (
    <div className='right-container'>
      <div className='input-cont'>
        <input type='search' placeholder='Search Twitter' />
      </div>
      <div className='trands'>
        <h2>Trends for you</h2>
        {trends.map(trend => (
          <div className='trend-box'>
            <p className='grey'>Trending</p>
            <p>{trend}</p>
            <p className='grey'>{getRandomInt(5000)} Tweets</p>
          </div>
        ))}
      </div>
      <div className='toFollow'> </div>
    </div>
  );
}
