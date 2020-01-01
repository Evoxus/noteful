import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <header>
      <Link to='/'>Noteful</Link>
    </header>
  )
}