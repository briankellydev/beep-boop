import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DrumMachineSample, DrumRow, PolyPattern, TimelineTrack, BoomBoom, Instrument } from 'src/app/interfaces';
import { SynthService } from 'src/app/shared/services/synth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { DRUM_KITS } from 'src/app/constants';

@Component({
  selector: 'app-drum-machine',
  templateUrl: './drum-machine.component.html',
  styleUrls: ['./drum-machine.component.scss']
})
export class DrumMachineComponent implements OnInit, OnDestroy {

  @Input() instanceNumber: number;
  @Input() deviceNumberIndex: number;
  @Input() config: BoomBoom;
  @Input() isTutorialMode = false;

  noteRows: DrumRow[];
  activePattern: PolyPattern = null;
  patterns: PolyPattern[] = [];
  globalPlaying = null;
  collapsed = false;
  drumMachine: any[] = [];
  DRUM_KITS = DRUM_KITS;
  selectedKit: string;
  parts: any[] = [];
  cellWidth: string;

  private destroy$ = new Subject<any>();
  private tracksIndex: number;
  private volume: any;
  private nullSequence: string[];
  private falseSequence: boolean[];
  private numberOfStepsPerMeasure: number;
  private meter: any;
  private thisNodeGain = new BehaviorSubject<number>(0);
  private instruments: Instrument<BoomBoom>[] = [];

  constructor(private synthService: SynthService) { }

  ngOnInit() {
    this.meter = new Tone.Meter().toMaster();
    // this.synthService.trackMeterLevels.push(this.thisNodeGain);
    this.synthService.tick.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.thisNodeGain.next(this.meter.getLevel());
    });
    this.volume = new Tone.Channel(0, 0).connect(this.meter);
    this.selectKit(this.config.kit || this.DRUM_KITS['808']);
    this.drumMachine.forEach((drum) => {
      drum.connect(this.volume);
    });
    this.synthService.numberOfStepsPerMeasure.pipe(takeUntil(this.destroy$)).subscribe((num: number) => {
      this.nullSequence = this.synthService.createNullSequence(num, 1);
      this.falseSequence = this.synthService.createFalseSequence(num, 1);
      if (this.instruments[this.deviceNumberIndex]) {
        const difference = num - this.numberOfStepsPerMeasure;
        this.numberOfStepsPerMeasure = num;
        if (difference > 0) {
          this.patterns.forEach((pattern: PolyPattern) => {
            for (let i = 0; i < difference; i++) {
              pattern.sequence.forEach((sequence: string[]) => {
                sequence.push(null);
              });
            }
          });
        } else if (difference < 0) {
          this.patterns.forEach((pattern: PolyPattern) => {
            for (let i = 0; i < Math.abs(difference); i++) {
              pattern.sequence.forEach((sequence: string[]) => {
                sequence.pop();
              });
            }
          });
        }
        this.instruments[this.deviceNumberIndex].instrument.patterns = this.patterns;
        this.synthService.instruments.next(this.instruments);
      } else {
        this.numberOfStepsPerMeasure = num;
      }
      this.cellWidth = this.calculateRowWidth(this.falseSequence.length);
    });
    if (!this.isTutorialMode) {
      this.synthService.instruments.pipe(takeUntil(this.destroy$)).subscribe((instruments: Instrument<BoomBoom>[]) => {
        this.instruments = JSON.parse(JSON.stringify(instruments));
        this.tracksIndex = instruments.findIndex((instrument) => {
          return instrument.instrument.track.instanceNumber === this.instanceNumber;
        });
        this.volume.volume.value = this.instruments[this.tracksIndex].instrument.track.volume;
        this.volume.pan.value = this.instruments[this.tracksIndex].instrument.track.pan / 100;
        this.volume.mute = this.instruments[this.tracksIndex].instrument.track.mute;
        this.volume.solo = this.instruments[this.tracksIndex].instrument.track.solo;
        if (this.patterns.length === 0) {
          if (!this.config.patterns || this.config.patterns.length === 0) {
            for (let i = 0; i < 9; i++) {
              this.patterns.push({
                num: i,
                numberOfMeasures: 1,
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
          } else {
            this.patterns = this.config.patterns;
          }
        }
        this.initNoteRows();
        if (!this.activePattern) {
          this.activePattern = JSON.parse(JSON.stringify(this.patterns[0]));
          this.setPattern(0);
        } else {
          this.activePattern = JSON.parse(JSON.stringify(this.patterns[this.activePattern.num]));
          this.convertPatternToSequencer();
        }
        if (this.globalPlaying === null) {
          this.synthService.playing.pipe(takeUntil(this.destroy$)).subscribe((isPlaying: boolean) => {
            this.globalPlaying = isPlaying;
            this.toggle();
          });
        }
      });
    }

    this.synthService.midiMessage.pipe(takeUntil(this.destroy$)).subscribe((midiMessage: any) => {
      if (midiMessage && this.instanceNumber === this.synthService.instanceMidiActivated) {
        // If it's not a note off message
        // Eventually velocity and duration will be implemented
        if (midiMessage.data[2] !== 127) {
          // TODO is there some math I can use to automate this? Doubtful since the 1-2 semitone difference between certain notes
          switch(midiMessage.data[1]) {
            case(48):
              this.drumMachine[5].triggerAttackRelease(Tone.Midi(48).toFrequency(), '16n');
            break;
            case(50):
              this.drumMachine[4].triggerAttackRelease(Tone.Midi(50).toFrequency(), '16n');
            break;
            case(52):
              this.drumMachine[3].triggerAttackRelease(Tone.Midi(52).toFrequency(), '16n');
            break;
            case(53):
              this.drumMachine[2].triggerAttackRelease(Tone.Midi(53).toFrequency(), '16n');
            break;
            case(55):
              this.drumMachine[1].triggerAttackRelease(Tone.Midi(55).toFrequency(), '16n');
            break;
            case(57):
              this.drumMachine[0].triggerAttackRelease(Tone.Midi(57).toFrequency(), '16n');
            break;
          }
        }
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

  playTutorialPattern() {
    this.parts.forEach((part: any) => {
      part.dispose();
    });
    this.parts = [];
    for (let i = 0; i < 6; i++) {
      this.parts.push(new Tone.Sequence((time, note) => {
        // the events will be given to the callback with the time they occur
        this.drumMachine[i].triggerAttackRelease(note, '16n', time);
      }, this.patterns[0].sequence[i], '16n'));
      this.parts[this.parts.length - 1].loop = false;
      this.parts[this.parts.length - 1].start(0);
    }
    Tone.Transport.scheduleOnce(() => {
      Tone.Transport.stop();
      this.parts.forEach((part: any) => {
        part.dispose();
      });
    }, '1m', '1m');
    Tone.Transport.start();
  }

  changeNumberOfMeasures() {
    const diffInMeasures = this.activePattern.numberOfMeasures - (this.activePattern.sequence.length / this.numberOfStepsPerMeasure);
    this.activePattern.sequence.forEach((sequence) => {
      if (diffInMeasures < 0) {
        for (let i = 0; i < diffInMeasures * -1 * this.numberOfStepsPerMeasure; i++) {
          sequence.pop();
        }
      } else if (diffInMeasures > 0) {
        for (let i = 0; i < diffInMeasures * this.numberOfStepsPerMeasure; i++) {
          sequence.push(null);
        }
      }
      this.patterns[this.activePattern.num] = JSON.parse(JSON.stringify(this.activePattern));
    });

    this.nullSequence = this.synthService.createNullSequence(this.numberOfStepsPerMeasure, this.activePattern.numberOfMeasures);
    this.falseSequence = this.synthService.createFalseSequence(this.numberOfStepsPerMeasure, this.activePattern.numberOfMeasures);
    this.initNoteRows();
    this.convertPatternToSequencer();
    this.instruments[this.deviceNumberIndex].instrument.track.patternLengths[this.activePattern.num] = this.activePattern.numberOfMeasures;
    this.synthService.instruments.next(this.instruments);
    this.cellWidth = this.calculateRowWidth(this.falseSequence.length);
  }

  selectKit(kit: string) {
    this.selectedKit = kit;
    if (this.instruments[this.deviceNumberIndex]) {
      this.instruments[this.deviceNumberIndex].instrument.kit = kit;
      this.synthService.instruments.next(this.instruments);
    }
    this.drumMachine.forEach((drumMachine: any) => {
      drumMachine.dispose();
    });
    switch(kit) {
      case this.DRUM_KITS['707']:
      this.drumMachine = [
        new Tone.Sampler({
          'A3': '/707/CLP.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'G3': '/707/CYM.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'F3': '/707/OH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'E3': '/707/CH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'D3': '/707/SD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'C3': '/707/BD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
      ];
      break;
      case this.DRUM_KITS['808']:
      this.drumMachine = [
        new Tone.Sampler({
          'A3': '/808/CL.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'G3': '/808/CYM.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'F3': '/808/OH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'E3': '/808/CH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'D3': '/808/SD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'C3': '/808/BD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
      ];
      break;
      case this.DRUM_KITS['909']:
      this.drumMachine = [
        new Tone.Sampler({
          'A3': '/909/CLP.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'G3': '/909/CYM.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'F3': '/909/OH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'E3': '/909/CH.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'D3': '/909/SD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
        new Tone.Sampler({
          'C3': '/909/BD.mp3',
        }, {
          'release' : 1,
          'baseUrl' : '../../assets/samples'
        }),
      ];
      break;
    }
    this.drumMachine.forEach((drum) => {
      drum.connect(this.volume);
    });
  }

  toggleStep(rowIdx: number, noteIdx: number) {
    this.noteRows[rowIdx].sequence[noteIdx] = !this.noteRows[rowIdx].sequence[noteIdx];
    this.activePattern.sequence[rowIdx][noteIdx] = this.noteRows[rowIdx].sequence[noteIdx] ?
      this.noteRows[rowIdx].note + this.noteRows[rowIdx].octave : null;
    this.compile();
    this.instruments[this.deviceNumberIndex].instrument.patterns = this.patterns;
    this.synthService.instruments.next(this.instruments);
  }

  toggle() {
    this.parts.forEach((part: any) => {
      part.dispose();
    });
    this.parts = [];
    this.instruments[this.tracksIndex].instrument.track.patternPerMeasure.forEach((pattern: number, index: number) => {
      if (pattern && pattern > 0) {
        for (let i = 0; i < 6; i++) {
          this.parts.push(new Tone.Sequence((time, note) => {
            // the events will be given to the callback with the time they occur
            this.drumMachine[i].triggerAttackRelease(note, '16n', time);
          }, this.patterns[pattern - 1].sequence[i], '16n'));
          this.parts[this.parts.length - 1].loop = false;
          if (this.globalPlaying) {
            this.parts[this.parts.length - 1].start(`${index}m`);
          } else {
            this.parts[this.parts.length - 1].stop(`${index + 1}m`);
          }
        }
      }
    });
  }

  checkForBlueBorder(idx: number) {
    return idx % 4 === 0;
  }

  checkForWhiteBorder(idx: number) {
    return idx % 16 === 0;
  }

  setPattern(pattern: number) {
    this.falseSequence = this.synthService.createFalseSequence(this.numberOfStepsPerMeasure, this.activePattern.numberOfMeasures);
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

  private initNoteRows() {
    this.noteRows = [
      {
        drum: 'PERC',
        note: 'A',
        octave: '3',
        sequence: Object.assign([], this.falseSequence)
      },
      {
        drum: 'CYM',
        note: 'G',
        octave: '3',
        sequence: Object.assign([], this.falseSequence)
      },
      {
        drum: 'OH',
        note: 'F',
        octave: '3',
        sequence: Object.assign([], this.falseSequence)
      },
      {
        drum: 'CH',
        note: 'E',
        octave: '3',
        sequence: Object.assign([], this.falseSequence)
      },
      {
        drum: 'SD',
        note: 'D',
        octave: '3',
        sequence: Object.assign([], this.falseSequence)
      },
      {
        drum: 'BD',
        note: 'C',
        octave: '3',
        sequence: Object.assign([], this.falseSequence)
      },
    ];
  }

}
