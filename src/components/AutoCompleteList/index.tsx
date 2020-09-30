import React from 'react';
import SearchResultModel from '../../models/search-result.model';
import Hightlight from './Hightligh';

interface IProps {
  searchResults: SearchResultModel[];
  keyword: string;
}

export default function AutoCompleteList({ searchResults, keyword } : IProps) {
  return (
    <ul>
      {
        searchResults.map(item => <Hightlight title={item.title} keyword={keyword} key={item.objectID} url={item.url} />)
      }
    </ul>
  )
}