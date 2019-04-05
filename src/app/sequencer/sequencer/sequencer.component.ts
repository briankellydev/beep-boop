import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FalseRows, NoteSequence, NullSequence } from 'src/app/constants';
import { NoteRow } from 'src/app/interfaces';

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent implements OnInit {

  @Output() sequenceChanged = new EventEmitter<string[]>();

  notes = Object.assign([], NoteSequence).reverse();
  selectedNote: string;
  selectedOctave: number;
  
  noteRows: NoteRow[] = [
    {note: 'C', octave: '5', sequence: Object.assign([], FalseRows)},
    {note: 'B', octave: '4', sequence: Object.assign([], FalseRows)},
    {note: 'A#', octave: '4', sequence: Object.assign([], FalseRows)},
    {note: 'A', octave: '4', sequence: Object.assign([], FalseRows)},
    {note: 'G#', octave: '4', sequence: Object.assign([], FalseRows)},
    {note: 'G', octave: '4', sequence: Object.assign([], FalseRows)},
    {note: 'F#', octave: '4', sequence: Object.assign([], FalseRows)},
    {note: 'F', octave: '4', sequence: Object.assign([], FalseRows)},
    {note: 'E', octave: '4', sequence: Object.assign([], FalseRows)},
    {note: 'D#', octave: '4', sequence: Object.assign([], FalseRows)},
    {note: 'D', octave: '4', sequence: Object.assign([], FalseRows)},
    {note: 'C#', octave: '4', sequence: Object.assign([], FalseRows)},
    {note: 'C', octave: '4', sequence: Object.assign([], FalseRows)},
    {note: 'B', octave: '3', sequence: Object.assign([], FalseRows)},
    {note: 'A#', octave: '3', sequence: Object.assign([], FalseRows)},
    {note: 'A', octave: '3', sequence: Object.assign([], FalseRows)},
    {note: 'G#', octave: '3', sequence: Object.assign([], FalseRows)},
    {note: 'G', octave: '3', sequence: Object.assign([], FalseRows)},
    {note: 'F#', octave: '3', sequence: Object.assign([], FalseRows)},
    {note: 'F', octave: '3', sequence: Object.assign([], FalseRows)},
    {note: 'E', octave: '3', sequence: Object.assign([], FalseRows)},
    {note: 'D#', octave: '3', sequence: Object.assign([], FalseRows)},
    {note: 'D', octave: '3', sequence: Object.assign([], FalseRows)},
    {note: 'C#', octave: '3', sequence: Object.assign([], FalseRows)},
    {note: 'C', octave: '3', sequence: Object.assign([], FalseRows)},
  ];

  sequence = Object.assign([], NullSequence);

  constructor() { }

  ngOnInit() {
    this.setNotes('C', '3');
  }

  // Bottom note/octave
  setNotes(startingNote: string, octave: string) {
    let noteIndex = NoteSequence.indexOf(startingNote);
    let topOctave = parseInt(octave) + 2;
    this.noteRows.forEach((row: NoteRow) => {
      row.note = NoteSequence[noteIndex];
      if (NoteSequence[noteIndex + 1]) {
        noteIndex++;
        row.octave = topOctave.toString();
      } else {
        noteIndex = 0;
        row.octave = topOctave.toString();
        topOctave--;
      }
      
    });
    this.compile();
  }

  toggleStep(rowIdx: number, noteIdx: number) {
    this.noteRows[rowIdx].sequence[noteIdx] = !this.noteRows[rowIdx].sequence[noteIdx];
    if (this.noteRows[rowIdx].sequence[noteIdx]) {
      this.noteRows.forEach((row: NoteRow, index: number) => {
        if (index !== rowIdx && row.sequence[noteIdx] === true) {
          row.sequence[noteIdx] = false;
        }
      });
      this.sequence[noteIdx] = this.noteRows[rowIdx].note + this.noteRows[rowIdx].octave;
    } else {
      this.sequence[noteIdx] = null;
    }
    this.sequenceChanged.emit(this.sequence);
  }

  compile() {
    // Dis gonna suck
  }

  checkForBlueBorder(idx: number) {
    return [0, 4, 8, 12].indexOf(idx) !== -1;
  }

}
