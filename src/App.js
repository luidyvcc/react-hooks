import React, { useState, useEffect } from 'react';

function App() {
  const [repositories, setRespositories] = useState([]);
  const [location, setLocation] = useState({});

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/luidyvcc/repos');
      const data = await response.json();
      setRespositories(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);
    document.title = `Você tem ${filtered.length}`;
  }, [repositories]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(fandlePositionReceived);
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  const handleFavorite = id => {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo
    })
    setRespositories(newRepositories);
  }

  const fandlePositionReceived = ({ coords }) => {
    const { latitude, longitude } = coords;
    setLocation({ latitude, longitude });
  }

  return (
    <>
      Latitude: {location.latitude}<br />
      Longitude: {location.longitude}<br />
      <hr />
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
            {repo.favorite && <strong> * </strong>}
            {repo.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
