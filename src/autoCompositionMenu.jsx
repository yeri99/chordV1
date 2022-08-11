import './menuStyle.css';
import React, { useRef } from 'react';
import { useDetectOutsideClick  } from './useDetectOutsideClick';

export const CompoMenu = () => {
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useDetectOutsideClick(dropdownRef, false);
    const onClick = () => setIsActive(!isActive);
  
   
    return (
      <div className="menu-container">
        <button onClick={onClick} className="menu-trigger">
          <span>Composition</span>
        </button>
        <nav ref={dropdownRef} className={`menu ${isActive ? 'active' : 'inactive'}`}>
          <ul>
            <li><button>즐거운</button></li>
            <li><button>슬픈</button></li>
            <li><button>잔잔한</button></li>
            <li><button>웅장한</button></li>
            <li><button>긴박한</button></li>
          </ul>
        </nav>
      </div>
    );
  };

  