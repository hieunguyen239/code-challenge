import React, { useRef, useState } from "react";
import _ from 'lodash';

interface IProps {
  type: 'email' | 'text' | 'search';
  onValueChanged(val: string): void;
  handleOnBlur(): void;
  handleOnFocus(): void;
}

export function Input({type, onValueChanged, handleOnBlur, handleOnFocus} : IProps) {
  const [userQuery, setUserQuery] = useState('');
  const delayedQuery = useRef(_.debounce((q: string) => onValueChanged(q), 500)).current;
  const handleOnChanged = e => {
    setUserQuery(e.target.value);
    delayedQuery(e.target.value);
  };

  return (
    <input type={type}
          autoComplete="off"
          name="search-box"
          value={userQuery}
          onBlur={handleOnBlur}
          onChange={handleOnChanged}
          onFocus={handleOnFocus}
          placeholder="Type something..."
    />
  )
}