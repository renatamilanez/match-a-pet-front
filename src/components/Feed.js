import styled from 'styled-components';
import Filter from './Filter';
import Head from './Head';
import Cards from './Cards';

export default function Feed() {
  return(
    <>
      <Head />
      <Filter />
      <Cards />
    </>
  );
}
