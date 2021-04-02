
import { Icon } from '@material-ui/core';
import { SearchOutlined } from '@material-ui/icons';
import React from 'react';

export const SearchBar = ({keyword,setKeyword}) => {
  const BarStyling = {width:"30rem", height: '2.5rem', fontSize: 'medium', background:"white", border:"none", padding:"0.5rem", paddingLeft: '2.1rem', borderRadius: '5px'};
  return (
    <>
    <Icon style={{position: 'absolute', color: 'black', height: 'auto', fontSize: 'x-large', paddingLeft: '5px', fontWeight: 'bold'}}>
      <SearchOutlined />
    </Icon>
    <input 
     style={BarStyling}
     key="random1"
     value={keyword}
     placeholder={"Type to Search"}
    >
    </input>
    </>
  );
}