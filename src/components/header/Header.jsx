import React from 'react'
import { Link } from 'react-router-dom';
import { setTerm } from '../../actions';
import { useContextState, useContextDispatch } from '../../context';
import './header.scss';

export default function Header({
  withSearch,
  withLinks,
  onClick = () => {}
}) {
  const { term } = useContextState();
  const dispatch = useContextDispatch();
  const onHandleChange = (term) => dispatch(setTerm(term));
  return (
    <header className='header'>
        <div className='title'>
          <h2>Rick and Armorty</h2>
        </div>
         {
           withSearch && (
            <div className='search'>
              <label>
                Search your Character: &nbsp;
                <input 
                  name='search' 
                  type='text' 
                  value={term}
                  onChange={(e) => onHandleChange(e.target.value)}
                />
              </label>
            </div>
           )
         }
         {
           withLinks && (
             <div className='navigation'>
              <Link to='/' onClick={onClick}>
                ← Go Back
              </Link>
             </div>
           )
         }
        
      </header>
  )
}
