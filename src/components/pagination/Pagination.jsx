import React from 'react'
import { useContextState } from '../../context';
import './pagination.scss'

export default function Pagination({onHandlePagination}) {
  const {page, pages, next, prev} = useContextState();
  return (
      <section className='pagination'>
        <button 
          onClick={() => onHandlePagination(prev)}
          className={`btn ${!prev ? 'disabled' : ''}`}
          disabled={!prev}
        >
          prev
        </button>
        <div>
          {page} / {pages}
        </div>
        <button 
          onClick={() => onHandlePagination(next)}
          className={`btn ${!next ? 'disabled' : ''}`}
          disabled={!next}
        >
          next
        </button>
      </section>
  )
}
