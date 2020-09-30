import React, { useState } from 'react';
import AngoliaServices from '../../services/angolia.service';
import SearchResultModel from '../../models/search-result.model';
import { Input } from '../Forms';
import { Loading } from '../Loading';
import AutoCompleteList from '../AutoCompleteList';
import './search-box.scss';
import _ from 'lodash';

interface IState {
  userQuery: string;
  searchResults: SearchResultModel[];
  loading: boolean;
  showResult: boolean;
}

export function SearchBox() {
  const initState : IState = {
    userQuery: '',
    searchResults: [],
    loading: false,
    showResult: false,
  }
  const [state, setState] = useState<IState>(initState);

  const fetchData = async (keyword: string) => {
    setState({...state, loading: true});
    if (keyword) {
      const wp = new AngoliaServices();
      const result = await wp.search(keyword);
      const searchResults : SearchResultModel[] = result.data.hits;
      searchResults.sort((a, b) => {
        if (!a.title || !b.title) return 0;
        const textA = a.title.toLowerCase();
        const textB = b.title.toLowerCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
      setState({
        userQuery: keyword,
        searchResults,
        loading: false,
        showResult: true,
      });
    } else {
      setState(initState);
    }
  }

  const handleOnChanged = (val: string) => {
    const keyword = val.trim();
    fetchData(keyword);
  };


  const handleOnBlur = () => {
    setState({...state, showResult : false});
  };

  const handleOnFocus = () => {
    if (userQuery.trim()) {
      setState({...state, showResult : true});
    }
  };

  const handleOnClick = (evt) => {
    evt.preventDefault();
  };

  const { userQuery, searchResults, loading, showResult } = state;

  return (
    <div className="search-wrapper">
        <Input type="search" handleOnBlur={handleOnBlur} handleOnFocus={handleOnFocus} onValueChanged={handleOnChanged} />
        {loading && <Loading />}
        {
          (searchResults?.length &&  showResult) ? (
            <div className="search-result-wrapper" onMouseDown={handleOnClick}>
              <AutoCompleteList searchResults={searchResults} keyword={userQuery} />
            </div>
          ) : showResult ? <div>No Result</div> : ''
        }
    </div>
  )
}