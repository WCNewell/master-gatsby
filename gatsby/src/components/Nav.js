import React from 'react';
import { Link, navigate } from 'gatsby';

// function goToSliceMmsters() {
//   setTimeout(() => {
//     console.log('Go to slicers!!!');
//     navigate('/slicemasters', { replace: true });
//   }, 20000);
// }

export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Hot Now</Link>
        </li>
        <li>
          <Link to="/pizzas/">Pizza Menu</Link>
        </li>
        <li>
          <Link to="/beers">Beers</Link>
        </li>
        <li>
          <Link to="/">Logo</Link>
        </li>
        <li>
          <Link to="/slicemasters">SliceMasters</Link>
        </li>
        <li>
          <Link to="/order">Order Ahead!</Link>
        </li>
        {/* <li>
          <button type="button" onClick={goToSliceMmsters}>
            Click me to see slicemasters after 2 seconds
          </button>
        </li> */}
      </ul>
    </nav>
  );
}
