import React from 'react';
import style from './home.module.css';

function Home() {
  return (
    <div className={style.container}>
      <div>
        Welcome!
      </div>
      <button>To search</button>
    </div>
  )
}

export default Home;