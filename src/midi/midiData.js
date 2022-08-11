export var midiHeader = {
    headerChunk:{
        headerType: 'MThd',
        headerLength: [0x00, 0x00, 0x00, 0x06],
        data: {
            format: [0x00, 0x00],
            ntrks: [0x00, 0x01],
            division: [0x3C, 0x00]
        }
        
    },
   
    trackChunk: {
        trackType: 'MTrk',
        trackLength: [0x00, 0x00, 0x00, 0x7A],
        event: {
            metaEvent:{
                setTempo: [0x00, 0xFF, 0x51, 0x03],
                tempo: [0x09, 0x27, 0xC0],
                timeSignature: [0x00, 0xFF, 0x58, 0x04],
                ts_nn: 4,
                ts_dd: 2,
                ts_cc: 0x18,
                ts_bb: 0x08,
                endOfTrack: [0x00, 0xFF, 0x2F, 0x00]
            },
            midiEvent: {
                pc: [0x00, 0xC0],
                pcnum: 0x00,
            }
        }    
    }
}

export var midiBody = {
    midiEvent: {
        noteOn: [0x00, 0x90],
        on_velocity: 0x64,
        noteOff: [0x00, 0x80],
        deltaTime: 0xBC,
        off_velocity: 0x00,
    },
    body: {
        num: 0,
        node: [
            {
                nodeNum: 0,
                keyNum: [0x00],
            }
        ],
        
    }
}
