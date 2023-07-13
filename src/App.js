
import './App.css';
import { useEffect, useState } from 'react';
import NewsDisplay from './components/NewsDisplay';
import axios from 'axios';
import alanBtn from '@alan-ai/alan-sdk-web';

function App() {
  const API_KEY = '07572e3ecc494db89bcc83acafa5c66b';
  const API_Endpoint = 'https://newsapi.org/v2/top-headlines';
  const ALAN_SDK_Key =
    'a2c4c64055d618759dcc617595ed9ab92e956eca572e1d8b807a3e2338fdd0dc/stage';
  const [category, setCategory] = useState('general');
  const [country, setCountry] = useState('in');
  const [newsData, setNewsData] = useState([]);
  const getNewsData = async () => {
    axios
      .get(`${API_Endpoint}?country=${country}&category=${category}&apiKey=${API_KEY}`)
      .then((response) => {
        setNewsData(response.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const categorySelect = (e) => {
    setCategory(e.target.value);
  };

  const countrySelect = (e) => {
    setCountry(e.target.value);
  };

  useEffect(() => {
    alanBtn({
      key: ALAN_SDK_Key,
      onCommand: (commandData) => {
        setCategory(commandData.data.toLowerCase());
      },
    });
  }, []);

  useEffect(() => {
    getNewsData();
  }, [category, country]);

  return (
    <>
      <h1>HearMe News</h1>
      <p className='app-description'>Press the Mic and Say Get the news from any category</p>
      <div className='category-filter'>
        <label htmlFor='category'>Choose a Category</label>
        <select
          name='category'
          id='category'
          className='category-select'
          onChange={categorySelect}
        >
          <option value='general'>General</option>
          <option value='business'>Business</option>
          <option value='entertainment'>Entertainment</option>
          <option value='health'>Health</option>
          <option value='science'>Science</option>
          <option value='sports'>Sports</option>
          <option value='technology'>Technology</option>
        </select>
      </div>
      <div className='category-filter'>
        <label htmlFor='country'>Choose a Country</label>
        <select
          name='country'
          id='country'
          className='category-select'
          onChange={countrySelect}
        >
          <option value='in'>India</option>
          <option value='us'>United States</option>
          <option value='gb'>United Kingdom</option>
          <option value='cn'>China</option>
          <option value='hk'>Hong-Kong</option>
          <option value='jp'>Japan</option>
          <option value='tr'>Turkey</option>
          <option value='ua'>Ukraine</option>
        </select>
      </div>
      <NewsDisplay newsData={newsData} />

      {newsData.length === 0 ? <h2 className='noNews'>No News Found</h2> : <></>}
    </>
  );
}

export default App;
