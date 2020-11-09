import React from 'react';

import { connect } from 'react-redux';

import SVG from 'react-inlinesvg';
import exit from '../../../icons/exit.svg';

import s from './InfoBar.module.css';

const InfoBar = ({ room }) => (
  <div className={s.container}>
    <h3>{room}</h3>
    {/* Here I use link just to update the page and this way return to 'Join' page */}
    <a href='/'>
      <SVG src={exit} />
    </a>
  </div>
);

const mapStateToProps = (state) => {
  return {
    room: state.data.room,
  };
};

export default connect(mapStateToProps, null)(InfoBar);
