import React, { Fragment, useEffect, useState } from 'react'
import { getCharactersFailed, getCharactersStarted, getCharactersSuccess, setLocationId, setPage } from '../../actions';
import { getAllCharacters, BASE_URL } from '../../api';
import { API_STATUS } from '../../constants';
import { useContextDispatch, useContextState } from '../../context';
import Header from '../header';
import Loading from '../loading';
import Pagination from '../pagination';
import NoData from '../noData';
import './characters.scss';
import { Link } from 'react-router-dom';

const Characters = () => {
  const [url, setUrl] = useState(BASE_URL);

  useEffect(() => {
    window.scrollTo(0,0);
    fetchData(url);
    // eslint-disable-next-line
  }, [url]);

  const dispatch = useContextDispatch();
  const {characters, isLoadingCharacters, term} = useContextState();

  const fetchData = async (url) => {
    dispatch(getCharactersStarted());
    try {
      const {data} = await getAllCharacters(url);
      dispatch(getCharactersSuccess(data))
    } catch (error) {
      dispatch(getCharactersFailed(error))
    }
  };

  const onHandlePagination = (pageUrl) => {
    setUrl(pageUrl);
    dispatch(setPage(pageUrl));
  };

  if([API_STATUS.PENDING, API_STATUS.IDLE].includes(isLoadingCharacters)) {
    return <div className='loading-container'>
      <Loading />
    </div>
  }
  if(API_STATUS.REJECTED === isLoadingCharacters) {
    return <div>FAAAAAILURE...</div>
  }
  const filterTerm = () => {
    return characters.filter(c => {
      const rx = new RegExp(term,'gi')
      return c?.name.match(rx) || c?.species.match(rx) || c?.location?.name.match(rx)
    })
  }
  return (
    <Fragment>
      <Header withSearch />
      <section className='container'>
        {
          filterTerm().length === 0  &&
          <NoData />
        }
        {
          filterTerm().map((c) => (
            <Fragment key={c.id}>
              <div className='card'>
                <div className='card-image' style={{background: `url(${c.image})`}}/>
                <div className="card-text">
                  <h2>{c.name}</h2>
                  <p>{c.species}</p>
                </div>
                <div className="card-stats">
                  <div className="stat">
                    <div>{c.status}</div>
                  </div>
                  <div className="stat">
                    <div className="link">
                      <Link 
                        onClick={() => dispatch(setLocationId(c.location.url))} 
                        to='/location'
                      >
                        {c.location.name}
                      </Link>
                    </div>
                  </div>
                  <div className="stat">
                    <div className='link'>
                      <Link to={`/${c.id}/episodes`}>
                        Episodes
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          ))
        }
      </section>
      <Pagination 
        onHandlePagination={(url) => onHandlePagination(url)}
      />
    </Fragment>
  );
}

export default Characters
