export function searchChord(staff){
    var chordKeyAry = [];
    var noteNum = 48;
    //var chordRoot = staff.chord[0];
    var chordRoot = staff[0];
    switch(chordRoot){
        case 'C':
            break;
        case 'D':
            noteNum += 2;
            break;
        case 'E':
            noteNum += 4;
            break;
        case 'F':
            noteNum += 5;
            break;
        case 'G':
            noteNum += 7;
            break;
        case 'A':
            noteNum += 9;
            break;
        case 'B':
            noteNum += 11;
            break;

    }
    
    chordKeyAry.push(noteNum-12);
    chordKeyAry.push(noteNum);
    if(staff.includes("m")){
        //if(staff.chord.includes("m")){
        chordKeyAry.push(noteNum+3);
    }else{
        chordKeyAry.push(noteNum+4);
    }
    chordKeyAry.push(noteNum+7);
    if(staff.includes("7")){
        chordKeyAry.push(noteNum+10);
    }
    
    return (chordKeyAry);
}

export default searchChord;