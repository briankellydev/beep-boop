import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { NoteSequence } from 'src/app/constants';
import { NoteRow, Pattern, TimelineTrack } from 'src/app/interfaces';
import { SynthService } from 'src/app/shared/services/synth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-sequencer',
  templateUrl: './sequencer.component.html',
  styleUrls: ['./sequencer.component.scss']
})
export class SequencerComponent implements OnInit, OnDestroy {

  @Input() deviceNumberIndex: number;
  @Input() isTutorialMode = false;
  @Output() patternsChanged = new EventEmitter<Pattern[]>();
  @Output() togglePlay = new EventEmitter<boolean>();

  notes = Object.assign([], NoteSequence).reverse();
  selectedNote: string;
  selectedOctave: number;

  noteRows: NoteRow[] = [];

  activePattern: Pattern = null;
  patterns: Pattern[] = [];
  cellWidth: string;

  private destroy$ = new Subject<any>();
  private nullSequence: string[];
  private falseSequence: boolean[];
  private numberOfStepsPerMeasure: number;
  private tracks: TimelineTrack[];

  constructor(private synthService: SynthService) { }

  ngOnInit() {
    this.synthService.numberOfStepsPerMeasure.pipe(takeUntil(this.destroy$)).subscribe((num: number) => {
      this.numberOfStepsPerMeasure = num;
      this.patterns = [];
      this.nullSequence = this.synthService.createNullSequence(this.numberOfStepsPerMeasure, 1);
      this.falseSequence = this.synthService.createFalseSequence(this.numberOfStepsPerMeasure, 1);
      this.initNoteRows();
      for (let i = 0; i < 9; i++) {
        this.patterns.push({
          num: i,
          lowestNote: 'C',
          lowestOctave: '3',
          numberOfMeasures: 1,
          sequence: Object.assign([], this.nullSequence),
        });
      }
      this.activePattern = JSON.parse(JSON.stringify(this.patterns[0]));
      this.setPattern(0);
    });
    this.synthService.tracks.pipe(takeUntil(this.destroy$)).subscribe((tracks: TimelineTrack[]) => {
      this.tracks = tracks;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
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
    this.compile();
    this.patternsChanged.emit(this.patterns);
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
    this.compile();
    this.patternsChanged.emit(this.patterns);
  }

  checkForBlueBorder(idx: number) {
    return idx % 4 === 0;
  }

  checkForWhiteBorder(idx: number) {
    return idx % 16 === 0;
  }

  playTutorialPattern() {
    this.togglePlay.emit();
  }

  setPattern(pattern: number) {
    // Send active pattern into its corresponding this.patterns
    this.patterns[this.activePattern.num] = JSON.parse(JSON.stringify(this.activePattern));
    // Set the new active pattern
    this.activePattern = JSON.parse(JSON.stringify(this.patterns[pattern]));
    this.falseSequence = this.synthService.createFalseSequence(this.numberOfStepsPerMeasure, this.activePattern.numberOfMeasures);
    // Build the sequencer from the new pattern
    this.initNoteRows();
    this.convertPatternToSequencer();
    // Emit the new sequence to the instrument
    this.patternsChanged.emit(this.patterns);
  }

  changeNumberOfMeasures() {
    const diffInMeasures = this.activePattern.numberOfMeasures - (this.activePattern.sequence.length / 16);
    if (diffInMeasures < 0) {
      for (let i = 0; i < diffInMeasures * -1 * this.numberOfStepsPerMeasure; i++) {
        this.activePattern.sequence.pop();
      }
    } else if (diffInMeasures > 0) {
      for (let i = 0; i < diffInMeasures * this.numberOfStepsPerMeasure; i++) {
        this.activePattern.sequence.push(null);
      }
    }
    this.patterns[this.activePattern.num] = JSON.parse(JSON.stringify(this.activePattern));
    this.nullSequence = this.synthService.createNullSequence(this.numberOfStepsPerMeasure, this.activePattern.numberOfMeasures);
    this.falseSequence = this.synthService.createFalseSequence(this.numberOfStepsPerMeasure, this.activePattern.numberOfMeasures);
    this.convertPatternToSequencer();
    this.tracks[this.deviceNumberIndex].patternLengths[this.activePattern.num] = this.activePattern.numberOfMeasures;
    this.synthService.tracks.next(this.tracks);
    this.patternsChanged.emit(this.patterns);
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
    this.initNoteRows();
    this.setNotes(this.activePattern.lowestNote, this.activePattern.lowestOctave);
    this.noteRows.forEach((row: NoteRow) => {
      row.sequence = Object.assign([], this.falseSequence);
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

  private initNoteRows() {
    this.noteRows = [
      {note: 'C', octave: '5', sequence: Object.assign([], this.falseSequence)},
      {note: 'B', octave: '4', sequence: Object.assign([], this.falseSequence)},
      {note: 'A#', octave: '4', sequence: Object.assign([], this.falseSequence)},
      {note: 'A', octave: '4', sequence: Object.assign([], this.falseSequence)},
      {note: 'G#', octave: '4', sequence: Object.assign([], this.falseSequence)},
      {note: 'G', octave: '4', sequence: Object.assign([], this.falseSequence)},
      {note: 'F#', octave: '4', sequence: Object.assign([], this.falseSequence)},
      {note: 'F', octave: '4', sequence: Object.assign([], this.falseSequence)},
      {note: 'E', octave: '4', sequence: Object.assign([], this.falseSequence)},
      {note: 'D#', octave: '4', sequence: Object.assign([], this.falseSequence)},
      {note: 'D', octave: '4', sequence: Object.assign([], this.falseSequence)},
      {note: 'C#', octave: '4', sequence: Object.assign([], this.falseSequence)},
      {note: 'C', octave: '4', sequence: Object.assign([], this.falseSequence)},
      {note: 'B', octave: '3', sequence: Object.assign([], this.falseSequence)},
      {note: 'A#', octave: '3', sequence: Object.assign([], this.falseSequence)},
      {note: 'A', octave: '3', sequence: Object.assign([], this.falseSequence)},
      {note: 'G#', octave: '3', sequence: Object.assign([], this.falseSequence)},
      {note: 'G', octave: '3', sequence: Object.assign([], this.falseSequence)},
      {note: 'F#', octave: '3', sequence: Object.assign([], this.falseSequence)},
      {note: 'F', octave: '3', sequence: Object.assign([], this.falseSequence)},
      {note: 'E', octave: '3', sequence: Object.assign([], this.falseSequence)},
      {note: 'D#', octave: '3', sequence: Object.assign([], this.falseSequence)},
      {note: 'D', octave: '3', sequence: Object.assign([], this.falseSequence)},
      {note: 'C#', octave: '3', sequence: Object.assign([], this.falseSequence)},
      {note: 'C', octave: '3', sequence: Object.assign([], this.falseSequence)},
    ];
    this.cellWidth = this.calculateRowWidth(this.falseSequence.length);
  }

  private calculateRowWidth(length: number) {
    return `${42.5 * (length)}px`;
  }

}
