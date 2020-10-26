import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useContextState } from '../../context'
import Header from '../header';

export default function Episodes() {
  const {characterId} = useParams();
  const [episodes, setEpisodes] = useState([]);
  const {characters} = useContextState();

  useEffect(() => {
    const foundChar = characters.find(c => c.id === +characterId)
    setEpisodes(foundChar?.episode)
  }, [])
  
  return (
    <div>
      <Header withLinks />
      <h2>List of Episodes</h2>
      <ul>
        {
          episodes.map(e => (
            <li key={e}> {e} </li>
          ))
        }
      </ul>
    </div>
  )
}
