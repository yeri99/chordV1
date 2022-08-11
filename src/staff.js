import React from 'react';
import './staff.css';
import { useDrop } from 'react-dnd';
import { insertButton } from './reharmMenu';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const HorizonLine = () => {
  return (
    <div
      style={{
        position:'relative',
        width: "160px",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "12.5px 0 12.5px 0",
      }}
    ></div>
  );
};

const HorizonLineSec = () => {
  const ItemTypes = {
    REHARM : 'reharm'
  }
  const [{ isOver }, drop] = useDrop(()=>({
    accept: ItemTypes.REHARM,
    drop: () => insertButton(),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      style={{
        position:'relative',
        width: "160px",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "12.5px 0 12.5px 0",
      }}
      className='HrizonLine'
    >
      {isOver && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '27px',
            width: '100%',
            opacity: 0.5,
            zIndex: 5,
            backgroundColor: 'gray',}}
        >
        </div>
      )}
    </div>
  );
};


const VerticalLine = () => {
  return (
    <div
      style = {{
        height: "78px",
        borderRight: "1px solid #aaa",
        position: "absolute",
        marginTop: "13px",
        marginLeft: "160px",
      }}
      className='VerticalLine'
    ></div>
  );
};


export const Staves = ({ staff }) => {
  return(
    <div className="oneStaff">
      <VerticalLine/>
      <DndProvider backend={HTML5Backend}><HorizonLineSec/></DndProvider>
      <DndProvider backend={HTML5Backend}><HorizonLineSec/></DndProvider>
      <DndProvider backend={HTML5Backend}><HorizonLineSec/></DndProvider>
      <HorizonLine/>
    </div>
  );
};