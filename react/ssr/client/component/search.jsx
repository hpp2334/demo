import loadable from '@loadable/component';
import React from 'react';
import { useEffect, useState, Suspense } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getSearchData } from '../store/actions';
import style from './search.module.css';
import Loading from './loading';

const Ad = loadable(() => import('./ad'));

/**
 * @typedef {Object} SearchItem
 * @property {string} id
 * @property {string} name
 */

export async function loadSearchData(dispatch, ctx) {
  const { query } = ctx;
  if (!query) {
    return;
  }
  if (typeof window !== 'undefined') {
    window.history.pushState({ query }, '', `?query=${query}`);
  }
  await Promise.all([
    dispatch(getSearchData({ query })),
  ]);
}

/**
 * @param {Object} props
 * @param {SearchItem} props.item
 */
function ListItem(props) {
  const { item } = props;
  return (
    <div>
      {item}
    </div>
  )
}

/**
 * @param {Object} props
 * @param {SearchItem[]} props.list
 */
function List(props) {
  const { list } = props;
  return (
    <div className={style.list}>
    {
      list && list.length > 0 ? list.map((item, index) => (
        <ListItem key={index} item={item} />
      )) : 'No data'
    }
    </div>
  );
}

/**
 * 
 * @param {Object} props
 * @param {string} props.query
 * @param {(query: string) => void} props.loadSearchData
 */
function SearchComp(props) {
  const { loadSearchData } = props;
  const [curVal, setCurVal] = useState(props.query);

  const onChange = (event) => {
    setCurVal(event.target.value);
  };
  const onSearch = () => {
    loadSearchData({
      query: curVal,
    });
  };

  return (
    <div>
      <input type='text' placeholder='Search something here' value={curVal} onChange={onChange} />
      <button onClick={onSearch}>Search</button>
    </div>
  );
}

/**
 * @param {object} props
 * @param {{ query: string; data: SearchItem[] }} props.search
 * @param {(query: string) => void} props.loadSearchData
 * @param {string | undefined} props.query
 */
function Main(props) {
  const { search, loadSearchData } = props;
  const { data: list } = search || { data: null };
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';

  return (
    <div>
      <SearchComp loadSearchData={loadSearchData} query={query} />
      <List list={list} />
      <Ad />
    </div>
  )
}

Main = connect(
  state => ({
    search: state.search,
  }),
  dispatch => ({
    loadSearchData: (ctx) => loadSearchData(dispatch, ctx),
  }),
)(Main);

export default Main;
