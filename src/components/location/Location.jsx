import React, { Fragment, useEffect } from 'react'
import { getLocationFailed, getLocationSuccess, resetLocation } from '../../actions';
import { getLocation } from '../../api';
import { API_STATUS } from '../../constants';
import { useContextDispatch, useContextState } from '../../context';
import Header from '../header';
import Loading from '../loading';
import './location.scss';

const Location = () => {
  const {isLoadingLocation, locationId, location} = useContextState();
  const dispatch = useContextDispatch();
  useEffect(() => {
    fetchLocation()
    // eslint-disable-next-line
  }, [locationId]);
    const fetchLocation = async () => {
    try {
      const {data} = await getLocation(locationId);
      dispatch(getLocationSuccess(data))
    } catch (error) {
      dispatch(getLocationFailed(error))
    }
  };
 
  if([API_STATUS.PENDING, API_STATUS.IDLE].includes(isLoadingLocation)) {
    return <div className='loading-container'>
      <Loading />
    </div>
  }
  if(API_STATUS.REJECTED === isLoadingLocation) {
    return <div>FAAAAAILURE...</div>
  }

  return (
    <Fragment>
      <Header withLinks onClick={() => dispatch(resetLocation())} />
      <section className='location-container'>
        <div className='location'>
          <h2>
            {location?.name}
          </h2>
          <p>
            {location?.type}
          </p>
          <p>
            {location?.dimension}
          </p>
        </div>
      </section>
    </Fragment>
  );
}

export default Location
