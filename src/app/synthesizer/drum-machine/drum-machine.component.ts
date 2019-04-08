import { Component, OnInit, } from '@angular/core';
import { DrumMachineSample, DrumRow, PolyPattern } from 'src/app/interfaces';
import { FalseRows, NullSequence } from 'src/app/constants';

@Component({
  selector: 'app-drum-machine',
  templateUrl: './drum-machine.component.html',
  styleUrls: ['./drum-machine.component.scss']
})
export class DrumMachineComponent implements OnInit {

  drumMachineSamples: DrumMachineSample[] = [
    {
      trackName: 'BD',
      sampleName: 'abc',
      possibleSamples: ['abc', 'def']
    },
    {
      trackName: 'SD',
      sampleName: 'abc',
      possibleSamples: ['abc', 'def']
    },
    {
      trackName: 'CH',
      sampleName: 'abc',
      possibleSamples: ['abc', 'def']
    },
    {
      trackName: 'OH',
      sampleName: 'abc',
      possibleSamples: ['abc', 'def']
    },
    {
      trackName: 'CYM',
      sampleName: 'abc',
      possibleSamples: ['abc', 'def']
    },
    {
      trackName: 'PERC',
      sampleName: 'abc',
      possibleSamples: ['abc', 'def']
    },
  ];

  // TODO const
  noteRows: DrumRow[] = [
    {
      drum: 'PERC',
      note: 'A',
      octave: '0',
      sequence: Object.assign([], FalseRows)
    },
    {
      drum: 'CYM',
      note: 'G',
      octave: '0',
      sequence: Object.assign([], FalseRows)
    },
    {
      drum: 'OH',
      note: 'F',
      octave: '0',
      sequence: Object.assign([], FalseRows)
    },
    {
      drum: 'CH',
      note: 'E',
      octave: '0',
      sequence: Object.assign([], FalseRows)
    },
    {
      drum: 'SD',
      note: 'D',
      octave: '0',
      sequence: Object.assign([], FalseRows)
    },
    {
      drum: 'BD',
      note: 'C',
      octave: '0',
      sequence: Object.assign([], FalseRows)
    },
  ];


  activePattern: PolyPattern = null;
  patterns: PolyPattern[] = [];
  playing = false;
  collapsed = false;

  drumMachine: any[];

  DRUM_KITS = {
    '707': '707',
    '808': '808',
    '909': '909',
  };

  selectedKit: string;

  constructor() { }

  ngOnInit() {
    this.selectKit(this.DRUM_KITS['808']);
    for (let i = 0; i < 9; i++) {
      this.patterns.push({
        num: i,
        sequence: [
          Object.assign([], NullSequence),
          Object.assign([], NullSequence),
          Object.assign([], NullSequence),
          Object.assign([], NullSequence),
          Object.assign([], NullSequence),
          Object.assign([], NullSequence)
        ],
      });
    }
    this.activePattern = JSON.parse(JSON.stringify(this.patterns[0]));
    this.setPattern(0);
    Tone.Transport.bpm.value = 120;
  }

  selectKit(kit: string) {
    this.selectedKit = kit;
    switch(kit) {
      case this.DRUM_KITS['707']:
      this.drumMachine = [
        new Tone.Sampler({
          'A0': '/707/CLP.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
        new Tone.Sampler({
          'G0': '/707/CYM.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
        new Tone.Sampler({
          'F0': '/707/OH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
        new Tone.Sampler({
          'E0': '/707/CH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
        new Tone.Sampler({
          'D0': '/707/SD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
        new Tone.Sampler({
          'C0': '/707/BD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
      ];
      break;
      case this.DRUM_KITS['808']:
      this.drumMachine = [
        new Tone.Sampler({
          'A0': '/808/CL.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
        new Tone.Sampler({
          'G0': '/808/CYM.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
        new Tone.Sampler({
          'F0': '/808/OH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
        new Tone.Sampler({
          'E0': '/808/CH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
        new Tone.Sampler({
          'D0': '/808/SD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
        new Tone.Sampler({
          'C0': '/808/BD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
      ];
      break;
      case this.DRUM_KITS['909']:
      this.drumMachine = [
        new Tone.Sampler({
          'A0': '/909/CLP.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
        new Tone.Sampler({
          'G0': '/909/CYM.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
        new Tone.Sampler({
          'F0': '/909/OH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
        new Tone.Sampler({
          'E0': '/909/CH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
        new Tone.Sampler({
          'D0': '/909/SD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
        new Tone.Sampler({
          'C0': '/909/BD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }).toMaster(),
      ];
      break;
    }
    
  }
  
  toggleStep(rowIdx: number, noteIdx: number) {
    this.noteRows[rowIdx].sequence[noteIdx] = !this.noteRows[rowIdx].sequence[noteIdx];
    this.activePattern.sequence[rowIdx][noteIdx] = this.noteRows[rowIdx].sequence[noteIdx] ?
      this.noteRows[rowIdx].note + this.noteRows[rowIdx].octave : null;
  }

  toggle() {
    const parts = [];
    for (let i = 0; i < 6; i++) {
      parts.push(new Tone.Sequence((time, note) => {
        // the events will be given to the callback with the time they occur
        this.drumMachine[i].triggerAttackRelease(note, '16n', time);
      }, this.activePattern.sequence[i], '16n'));
      parts[i].loop = 100;
      parts[i].loopStart = 0;
    }
    
    // part.loopEnd = '1m';
    // start the part at the beginning of the Transport's timeline
    parts.forEach((part) => {
      if (this.playing) {
        part.start(0);
      } else {
        part.stop();
      }
    });
    
    Tone.Transport.loop = true;
    Tone.Transport.loopEnd = '1m';
    Tone.Transport.toggle();
  }

  checkForBlueBorder(idx: number) {
    return [0, 4, 8, 12].indexOf(idx) !== -1;
  }

  play() {
    this.playing = !this.playing;
    this.toggle();
  }

  setPattern(pattern: number) {
    // Compile active pattern into its corresponding this.patterns
    this.compile();
    // Set the new active pattern
    this.activePattern = JSON.parse(JSON.stringify(this.patterns[pattern]));
    // Build the sequencer from the new pattern
    this.convertPatternToSequencer();
  }

  checkForBorder(idx: number) {
    return [0, 4, 8, 12].indexOf(idx) !== -1;
  }

  private compile() {
    this.noteRows.forEach((row: DrumRow, index: number) => {
      row.sequence.forEach((enabled: boolean, noteIdx: number) => {
        if (enabled) {
          this.activePattern.sequence[index][noteIdx] = row.note + row.octave;
        }
      });
    });
    this.patterns[this.activePattern.num] = JSON.parse(JSON.stringify(this.activePattern));
  }

  private convertPatternToSequencer() {
    this.noteRows.forEach((row: DrumRow) => {
      row.sequence = Object.assign([], FalseRows);
    });
    for (let i = 0; i < 6; i++) {
      this.activePattern.sequence[i].forEach((note: string, index: number) => {
        const noteRowIndex = this.noteRows.findIndex((noteRow: DrumRow) => {
          return noteRow.note + noteRow.octave === note;
        });
        if (noteRowIndex !== -1) {
          this.noteRows[noteRowIndex].sequence[index] = true;
        }
      });
    }
  }

}
