import { midiBody, midiHeader } from "./midiData";
import searchChord from "./searchChord";

const dataLen = 4;

export function writeFile(staves){
    
    var buffer = [];
    //header chunk
    var i = 0, j = 0, k = 0, l = 0;
    for(i = 0; i<dataLen; i++){
        buffer.push(midiHeader.headerChunk.headerType.charCodeAt(i));
    }
    for(i = 0; i<dataLen; i++){
        buffer.push(midiHeader.headerChunk.headerLength[i]);
    }
    for(i = 0; i<dataLen/2; i++){
        buffer.push(midiHeader.headerChunk.data.format[i]);
    }
    for(i = 0; i<dataLen/2; i++){
        buffer.push(midiHeader.headerChunk.data.ntrks[i]);
    }
    for(i = 0; i<dataLen/2; i++){
        buffer.push(midiHeader.headerChunk.data.division[i]);
    }

    //track chunk
    for(i = 0; i<dataLen; i++){
        buffer.push(midiHeader.trackChunk.trackType.charCodeAt(i));
    }
    for(i = 0; i<dataLen; i++){
        buffer.push(midiHeader.trackChunk.trackLength[i]);
    }
    //set tempo
    for(i = 0; i<dataLen; i++){
        buffer.push(midiHeader.trackChunk.event.metaEvent.setTempo[i]);
    }
    for(i = 0; i<dataLen-1; i++){
        buffer.push(midiHeader.trackChunk.event.metaEvent.tempo[i]);
    }
    //pc
    for(i = 0; i<dataLen/2; i++){
        buffer.push(midiHeader.trackChunk.event.midiEvent.pc[i]);
    }
    buffer.push(midiHeader.trackChunk.event.midiEvent.pcnum);
    //time signature
    for(i = 0; i<dataLen; i++){
        buffer.push(midiHeader.trackChunk.event.metaEvent.timeSignature[i]);
    }
    buffer.push(midiHeader.trackChunk.event.metaEvent.ts_nn);
    buffer.push(midiHeader.trackChunk.event.metaEvent.ts_dd);
    buffer.push(midiHeader.trackChunk.event.metaEvent.ts_cc);
    buffer.push(midiHeader.trackChunk.event.metaEvent.ts_bb);

    //track body
    for(i=0; i < staves.length; i++){
        for(l = 0; l < dataLen; l++){
            var keyNum = searchChord(staves[i]);
            for(k=0; k<keyNum.length; k++){
                //note on
                for(j = 0; j < dataLen/2; j++){
                    buffer.push(midiBody.midiEvent.noteOn[j]);
                }
                buffer.push(keyNum[k]);
                buffer.push(midiBody.midiEvent.on_velocity);
            }
            buffer.push(midiBody.midiEvent.deltaTime);
            for(k=0; k<keyNum.length; k++){
                //note off
                for(j = 0; j < dataLen/2; j++){
                    buffer.push(midiBody.midiEvent.noteOff[j]);
                }
                buffer.push(keyNum[k]);
                buffer.push(midiBody.midiEvent.off_velocity);
            }
        }
    }
    
    //end of track
    for(i = 0; i < dataLen; i++){
        buffer.push(midiHeader.trackChunk.event.metaEvent.endOfTrack[i]);
    }
    

    if(buffer.length - 22 <= 255){
        buffer[21] = buffer.length-22;
    }else if ((buffer.length - 22 - 255) <= 255){
        buffer[21] = 255;
        buffer[20] = buffer.length - 255 - 22;
    }else if ((buffer.length - 255*2 - 22) <= 255){
        buffer[21] = 255;
        buffer[20] = 255;
        buffer[19] = buffer.length - 255 - 22;
    }

    console.log(keyNum);
    console.log(buffer);

    // export midi file
    let binary = new Uint8Array(buffer);

    var link = document.createElement('a');
    const blob = new Blob( [binary], {type: 'application/octet-stream'})
    link.href = URL.createObjectURL(blob);
    link.download = 'test.mid';
    link.click();
    
    return(binary);

}
