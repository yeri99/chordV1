import React, {useState} from 'react';
import './App.css';
import { Staves } from './staff';
import { CompoMenu } from './autoCompositionMenu';
import { writeFile } from './midi/midiFileWrite';
import { ChordMenu } from './chordMenu';
import {_tone_0000_JCLive_sf2_file} from './midi/0000_JCLive_sf2_file';
import { start } from './midi/audioPlayer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Reharm } from './reharmMenu';

function App() {
  const [staves, setStaves] = useState([
    {   
      num: 0,
      chord : 'none',
      otave : 'c3'
    },
    {
      num: 1,
      chord : 'none',
      otave : 'c3'
    },
    {
      num: 2,
      chord : 'none',
      otave : 'c3' 
    },
    {
      num: 3,
      chord : 'none',
      otave : 'c3'
    },
  ]);
  var staffNum = 0;

  const renderStaff = staves.map(staff=>{
    staffNum++;
    
    return (
      <div>
        <Staves staff={staff} num={staff.num}/>
        <DndProvider backend={HTML5Backend}>
          <div className="staffButton"><ChordMenu menuNum={staffNum}/></div>
        </DndProvider>
      </div>
    );
  });
  const addstaff = (event) => {
    event.preventDefault();
    setStaves([
      ...staves,
      {
        num: staffNum,
        chord: 'none',
        octave: 'c3',
      }
    ]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className="App-name">
          PLAY CHORD
        </p>
        <div className="App-info">
          <div className="info-fst">
            <div>
              <p>tempo :</p>
              <input type="text" name="tempo" placeholder="100"/>
            </div>
            <div>
              <p>meter :</p>
              <input type="text" name="nume" placeholder="4"/>
              <p>/</p>
              <input type="text" name="deno" placeholder="4"/>
            </div>
            <div>
              <p>octave :</p>
              <input type="text" name="octave" placeholder="C3"/>
            </div>
          </div>
          <div className="info-sec">
            < CompoMenu />
          </div>
        </div>
      </header>

      <div className="App-body">
        <DndProvider backend={HTML5Backend}>
          <div className="App-reharMenu">
            <p className="Menu-name">Reharmonization</p>
            <Reharm text="Sec Dom"/>
            <Reharm text="Sub Dom"/>
            <Reharm text="Ext Dom"/>
            <Reharm text="Sub V7 Ext Dom"/>
            <Reharm text="II-V-I"/>
            <Reharm text="II-subV-I"/>
          </div>
        </DndProvider>
      
        <div className = "App-middle">
          <div className="App-staff">
            {renderStaff}
          </div>
          <div className="App-addStaff">
            <button onClick={addstaff}>+</button>
          </div>
          <div className="App-playMid">
            <button onClick={start}>play</button>
          </div>
          <div>
            <button onClick={()=>writeFile(staves)}>export</button>
          </div>
        </div>
      </div>
     
    </div>
  );
}


export default App;
