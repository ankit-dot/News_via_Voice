import React from 'react';
import moment from 'moment';

export default function NewsDisplay({ newsData }) {
  return (
    <div>
      {newsData.map((news) => {
        return (
          <div className='news-container news-data' key={news.title}>
            {news.urlToImage && <img className='news-image' src={news.urlToImage} alt='article' />}
            <div className='news-col'>
              <p className='text-capitalize'>{news.source.name}</p>
              <p>{moment(news.publishedAt).format('LL')}</p>
            </div>
            <h3>{news.title}</h3>
            <p>{news.description}</p>
            <a className='link-url' href={news.url} target='_blank' rel='noreferrer'>
              Read the full article...
            </a>
          </div>
        );
      })}
    </div>
  );
}
 