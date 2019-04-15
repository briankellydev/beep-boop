import { Component, OnInit, OnDestroy, Input, } from '@angular/core';
import { DrumMachineSample, DrumRow, PolyPattern, TimelineTrack } from 'src/app/interfaces';
import { SynthService } from 'src/app/shared/synth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-drum-machine',
  templateUrl: './drum-machine.component.html',
  styleUrls: ['./drum-machine.component.scss']
})
export class DrumMachineComponent implements OnInit, OnDestroy {

  @Input() instanceNumber: number;

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
  noteRows: DrumRow[];
  activePattern: PolyPattern = null;
  patterns: PolyPattern[] = [];
  globalPlaying = null;
  collapsed = false;
  drumMachine: any[];
  DRUM_KITS = {
    '707': '707',
    '808': '808',
    '909': '909',
  };
  selectedKit: string;
  parts: any[] = [];
  tracks: TimelineTrack[] = [];
  cellWidth: string;

  private destroy$ = new Subject<any>();
  private tracksIndex: number;
  private volume: any;
  private volVal = 0;
  private nullSequence: string[];
  private falseSequence: boolean[];

  constructor(private synthService: SynthService) { }

  ngOnInit() {
    this.volume = new Tone.Volume(this.volVal).toMaster();
    this.selectKit(this.DRUM_KITS['808']);
    this.drumMachine.forEach((drum) => {
      drum.connect(this.volume);
    });
    this.synthService.numberOfStepsPerMeasure.pipe(takeUntil(this.destroy$)).subscribe((num: number) => {
      this.nullSequence = this.synthService.createNullSequence(num);
      this.falseSequence = this.synthService.createFalseSequence(num);
      this.noteRows = [
        {
          drum: 'PERC',
          note: 'A',
          octave: '0',
          sequence: Object.assign([], this.falseSequence)
        },
        {
          drum: 'CYM',
          note: 'G',
          octave: '0',
          sequence: Object.assign([], this.falseSequence)
        },
        {
          drum: 'OH',
          note: 'F',
          octave: '0',
          sequence: Object.assign([], this.falseSequence)
        },
        {
          drum: 'CH',
          note: 'E',
          octave: '0',
          sequence: Object.assign([], this.falseSequence)
        },
        {
          drum: 'SD',
          note: 'D',
          octave: '0',
          sequence: Object.assign([], this.falseSequence)
        },
        {
          drum: 'BD',
          note: 'C',
          octave: '0',
          sequence: Object.assign([], this.falseSequence)
        },
      ];
      for (let i = 0; i < 9; i++) {
        this.patterns.push({
          num: i,
          sequence: [
            Object.assign([], this.nullSequence),
            Object.assign([], this.nullSequence),
            Object.assign([], this.nullSequence),
            Object.assign([], this.nullSequence),
            Object.assign([], this.nullSequence),
            Object.assign([], this.nullSequence)
          ],
        });
      }
      this.activePattern = JSON.parse(JSON.stringify(this.patterns[0]));
      this.setPattern(0);
      this.cellWidth = this.calculateRowWidth(this.falseSequence.length);
    });

    this.synthService.tracks.pipe(takeUntil(this.destroy$)).subscribe((tracks: TimelineTrack[]) => {
      this.tracks = tracks;
      this.tracksIndex = tracks.findIndex((track) => {
        return track.instanceNumber === this.instanceNumber;
      });
      this.volume.volume.value = this.tracks[this.tracksIndex].volume;
      if (this.globalPlaying === null) {
        this.synthService.playing.pipe(takeUntil(this.destroy$)).subscribe((isPlaying: boolean) => {
          this.globalPlaying = isPlaying;
          this.toggle();
        });
      }
    });
  }

  ngOnDestroy() {
    this.drumMachine.forEach((synth: any) => {
      synth.dispose();
    });
    this.parts.forEach((part: any) => {
      part.dispose();
    });
    this.destroy$.next();
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
        }),
        new Tone.Sampler({
          'G0': '/707/CYM.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'F0': '/707/OH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'E0': '/707/CH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'D0': '/707/SD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'C0': '/707/BD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
      ];
      break;
      case this.DRUM_KITS['808']:
      this.drumMachine = [
        new Tone.Sampler({
          'A0': '/808/CL.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'G0': '/808/CYM.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'F0': '/808/OH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'E0': '/808/CH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'D0': '/808/SD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'C0': '/808/BD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
      ];
      break;
      case this.DRUM_KITS['909']:
      this.drumMachine = [
        new Tone.Sampler({
          'A0': '/909/CLP.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'G0': '/909/CYM.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'F0': '/909/OH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'E0': '/909/CH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'D0': '/909/SD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'C0': '/909/BD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
      ];
      break;
    }
  }

  toggleStep(rowIdx: number, noteIdx: number) {
    this.noteRows[rowIdx].sequence[noteIdx] = !this.noteRows[rowIdx].sequence[noteIdx];
    this.activePattern.sequence[rowIdx][noteIdx] = this.noteRows[rowIdx].sequence[noteIdx] ?
      this.noteRows[rowIdx].note + this.noteRows[rowIdx].octave : null;
    this.compile();
  }

  toggle() {
    this.parts = [];
    this.tracks[this.tracksIndex].patternPerMeasure.forEach((pattern: number, index: number) => {
      if (pattern) {
        for (let i = 0; i < 6; i++) {
          this.parts.push(new Tone.Sequence((time, note) => {
            // the events will be given to the callback with the time they occur
            this.drumMachine[i].triggerAttackRelease(note, '16n', time);
          }, this.patterns[pattern - 1].sequence[i], '16n'));
        }
        this.parts.forEach((part) => {
          part.loop = false;
          if (this.globalPlaying) {
            part.start(`${index}m`);
          } else {
            part.stop(`${index + 1}m`);
          }
        });
      }
    });
  }

  checkForBlueBorder(idx: number) {
    return [0, 4, 8, 12].indexOf(idx) !== -1;
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
    return idx % 4 === 0;
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
      row.sequence = Object.assign([], this.falseSequence);
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

  private calculateRowWidth(length: number) {
    return `${42.5 * (length)}px`;
  }

}
