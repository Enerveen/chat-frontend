import React from 'react';
import s from './InfoBar.module.css';
import SVG from 'react-inlinesvg';

const ExitIco = () => <SVG src={require('../../../icons/exit.svg')} />;

const InfoBar = ({ room }) => (
  <div className={s.container}>
    <h3>{room}</h3>
    {/* Here I use link just to update the page and this way return to 'Join' page */}
    <a href='/'>
      <ExitIco />
    </a>
  </div>
);

export default InfoBar;
