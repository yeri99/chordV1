import './menuStyle.css';
import React, { useRef, useState } from 'react';
import { useDetectOutsideClick  } from './useDetectOutsideClick';

const chordList = ['C', 'Cm', 'C7', 'D', 'Dm', 'D7', 'E', 'Em', 'E7', 'F', 'Fm', 'F7', 'G', 'Gm', 'G7', 'A', 'Am', 'A7', 'B', 'Bm', 'B7'];
var dropdownRef = null;

export const ChordMenu = () => {
  dropdownRef = useRef([]);
  const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
  const onClick = () => setIsActive(!isActive);

  const renderBtn = chordList.map((chord, i)=>{
    return (
      <button className="menu-drop-button" onClick={()=>{onChordBtn(chordList[i])}} chord={chord} key={i}>{chordList[i]}</button>
    );
  });

  function onChordBtn(text, event) {
    var j;
    for(j=0; j<chordList.length; j++){
      if(text === chordList[j]){
        dropdownRef.current[1].innerText = chordList[j];
        //console.log(chordList[j]+' is clicked');
        //console.log(document.getElementsByClassName('menu-trigger')[1].innerText);
      }
    }
    setIsActive(!isActive);
  };

  return (
    <div className="menu-container">
      <button onClick={onClick} ref={(elem) => (dropdownRef.current[1] = elem)} className="menu-trigger">
        <span>Select Chord</span>
      </button>
      <nav ref={(elem) => (dropdownRef.current[0] = elem)} className={`menu ${isActive ? 'active' : 'inactive'}`}>
        <ul>
          <li>{renderBtn}</li>
        </ul>
      </nav>
    </div>
  );
};


