import React, {useState, useEffect} from 'react';
import './App.css';

function SongIndex() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/songs")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setSongs(result);
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul>
        {songs.map(song => (
          <li key={song.id}>
            {song.title} {song.composer}
          </li>
        ))}
      </ul>
    );
  }
}

export default SongIndex;