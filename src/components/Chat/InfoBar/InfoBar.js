import React from 'react';
import s from './InfoBar.module.css';
import SVG from 'react-inlinesvg';
import exit from '../../../icons/exit.svg';

const InfoBar = ({ room }) => (
  <div className={s.container}>
    <h3>{room}</h3>
    {/* Here I use link just to update the page and this way return to 'Join' page */}
    <a href='/'>
      <SVG src={exit} />
    </a>
  </div>
);

export default InfoBar;
