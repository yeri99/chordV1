import React from 'react';
import { useDrag } from 'react-dnd';
import './reharmMenu.css';

export function Reharm(text){
    const ItemTypes = {
        REHARM : 'reharm'
    }
    const [{isDragging}, drag] = useDrag(() => ({
        type: ItemTypes.REHARM,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        })
    }));
    
    return(
            <button className='reharmButton' ref={drag}
                style={{
                    opacity: isDragging ? 0.5 : 1,}}
            >{text.text}</button>
    );
}

export function insertButton(){
    console.log("!!!!");
    return(
        <div
            style={{
                position: 'absolute',
                margin: '10px',
            }}
        >test</div>
        /*<Reharm 
        style={{
            position: 'relative',
        }}
        text="test"/>*/
        );
}
