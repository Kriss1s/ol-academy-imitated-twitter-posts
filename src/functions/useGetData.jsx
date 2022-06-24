import { useState, useEffect } from 'react';
const URL = 'https://jsonplaceholder.typicode.com/';
const numberOfPosts = 10;

export default function useGetData(url, dataType) {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${url}${dataType}`)
      .then(res => res.json())
      .then(fetchdata => setData(fetchdata.slice(0, numberOfPosts)));
  }, []);
  return data;
}
