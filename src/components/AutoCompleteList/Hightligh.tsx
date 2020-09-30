import React from 'react';
import _ from 'lodash';

interface IProps {
  title: string;
  keyword: string;
  url: string;
}
export default function({ title, keyword, url } : IProps) {
  if (!keyword.trim()) {
    return <li>{title}</li>
  }

  if (!title) {
    return <></>
  }

  const regex = new RegExp(`(${_.escapeRegExp(keyword)})`, 'gi');
  const parts = title.split(regex);

  return (
      <li>
        <a href={url} target="_blank" title={title}>
          {parts.filter(part => part).map((part, i) => (
                regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
            ))}
        </a>
      </li>
  )
}