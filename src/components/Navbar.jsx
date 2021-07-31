import React from 'react';
import { Link } from 'react-router-dom';
import { Link as LinkUrl } from '@material-ui/core';

export default function Navbar() {
  return (
    <div>
      <Link to='/'>
        <LinkUrl
          component='button'
          variant='body2'
          onClick={() => {
            console.log('Im a button');
          }}
        >
        Home
        </LinkUrl>
      </Link>
    </div>
  )
}
