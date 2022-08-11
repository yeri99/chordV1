import WebAudioFontPlayer from 'webaudiofont';
import {_tone_0000_JCLive_sf2_file} from './0000_JCLive_sf2_file';
import { searchChord } from './searchChord';

var started = false;
var startTime = 0;
var bpm = 100;
var N = 4*60 / bpm;
var beatLen = 1/4*N;
var pieceLen = 4 * N;

var selectedPreset=_tone_0000_JCLive_sf2_file;
var AudioContextFunc = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContextFunc();
var player=new WebAudioFontPlayer();
player.loader.decodeAfterLoading(audioContext, '_tone_0000_JCLive_sf2_file');

var gainPiano1 = audioContext.createGain();gainPiano1.connect(audioContext.destination);gainPiano1.gain.value=0.3;
var gainPiano2 = audioContext.createGain();gainPiano2.connect(audioContext.destination);gainPiano2.gain.value=0.5;
function piano1(pitch, duration){return {gain:gainPiano1,preset:_tone_0000_JCLive_sf2_file,pitch:pitch,duration:duration*N};}
function piano2(pitch, duration){return {gain:gainPiano2,preset:_tone_0000_JCLive_sf2_file,pitch:pitch,duration:duration*N};}
function nextPiece() {
    for(var n = 0; n < buttonNotes.length; n++){
        var beat = buttonNotes[n];
        for(var i = 0; i < beat.length; i++){
            if(beat[i]){
                player.queueWaveTable(audioContext, beat[i].gain, selectedPreset, startTime + n * beatLen, beat[i].pitch, beat[i].duration);
                console.log(beat[i].gain)
            }
        }
    }
}

export function start() {
    var idx = 0;
    var btnCnt = document.getElementsByClassName('menu-trigger').length;
    buttonNotes = [];
    for(var i = 1; i < btnCnt; i++){
        var buf = document.getElementsByClassName('menu-trigger')[i].innerText;
        if(buf === 'Select Chord'){
            for(var j = 0; j < 4; j++)
                buttonNotes[idx++] = [];
        }
        else{
            var noteBuf = searchChord(buf);
            var notesBuf1 = [];
            var notesBuf2 = [];
            for(j = 0; j < noteBuf.length; j++){
                notesBuf1[j] = piano1(noteBuf[j], 1/4);
                notesBuf2[j] = piano2(noteBuf[j], 1/4);
            }
            for(j = 0; j < 4; j++){
                if(j%2==0)
                    buttonNotes[idx++] = notesBuf1;
                else
                    buttonNotes[idx++] = notesBuf2;
            }
                
        }
    }
    var time = btnCnt*4;
    
    started = true;
    startTime = audioContext.currentTime + 0.1;
    nextPiece();
    startTime = startTime;
    document.getElementsByClassName('menu-trigger')
    var interval = setInterval(function () {
        if (audioContext.currentTime > startTime - 1 / 4 * N) {
            nextPiece();
            startTime = startTime + pieceLen;
        }
        clearInterval(interval);
    }, time);
}

var buttonNotes = [];