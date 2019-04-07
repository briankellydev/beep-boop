import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FalseRows, NoteSequence, NullSequence } from 'src/app/constants';
import { NoteRow, Pattern } from 'src/app/interfaces';

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent implements OnInit {

  @Input() playing: boolean;

  @Output() sequenceChanged = new EventEmitter<string[]>();
  @Output() togglePlay = new EventEmitter<boolean>();

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

  activePattern: Pattern = null;
  patterns: Pattern[] = [];

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 9; i++) {
      this.patterns.push({
        num: i,
        lowestNote: 'C',
        lowestOctave: '3',
        sequence: Object.assign([], NullSequence),
      });
    }
    this.activePattern = JSON.parse(JSON.stringify(this.patterns[0]));
    this.setPattern(0);
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
    this.activePattern.lowestNote = startingNote;
    this.activePattern.lowestOctave = octave;
  }

  toggleStep(rowIdx: number, noteIdx: number) {
    this.noteRows[rowIdx].sequence[noteIdx] = !this.noteRows[rowIdx].sequence[noteIdx];
    if (this.noteRows[rowIdx].sequence[noteIdx]) {
      this.noteRows.forEach((row: NoteRow, index: number) => {
        if (index !== rowIdx && row.sequence[noteIdx] === true) {
          row.sequence[noteIdx] = false;
        }
      });
      this.activePattern.sequence[noteIdx] = this.noteRows[rowIdx].note + this.noteRows[rowIdx].octave;
    } else {
      this.activePattern.sequence[noteIdx] = null;
    }
    this.sequenceChanged.emit(this.activePattern.sequence);
  }

  checkForBlueBorder(idx: number) {
    return [0, 4, 8, 12].indexOf(idx) !== -1;
  }

  play() {
    this.playing = !this.playing;
    this.togglePlay.emit(this.playing);
  }

  setPattern(pattern: number) {
    // Compile active pattern into its corresponding this.patterns
    this.compile();
    // Set the new active pattern
    this.activePattern = JSON.parse(JSON.stringify(this.patterns[pattern]));
    // Build the sequencer from the new pattern
    this.convertPatternToSequencer();
    // Emit the new sequence to the instrument
    this.sequenceChanged.emit(this.activePattern.sequence);
  }

  private compile() {
    this.noteRows.forEach((row: NoteRow, index: number) => {
      row.sequence.forEach((enabled: boolean, noteIdx: number) => {
        if (enabled) {
          this.activePattern.sequence[noteIdx] = row.note + row.octave;
        }
      });
    });
    this.patterns[this.activePattern.num] = JSON.parse(JSON.stringify(this.activePattern));
  }

  private convertPatternToSequencer() {
    this.setNotes(this.activePattern.lowestNote, this.activePattern.lowestOctave);
    this.noteRows.forEach((row: NoteRow) => {
      row.sequence = Object.assign([], FalseRows);
    });
    this.activePattern.sequence.forEach((note: string, index: number) => {
      const noteRowIndex = this.noteRows.findIndex((noteRow: NoteRow) => {
        return noteRow.note + noteRow.octave === note;
      });
      if (noteRowIndex !== -1) {
        this.noteRows[noteRowIndex].sequence[index] = true;
      }
    });
  }

}
