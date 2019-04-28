import { BeepBlaster, BoomBoom, Instrument } from './interfaces';

export const NoteSequence: string[] = [
    'B', 'A#', 'A', 'G#', 'G', 'F#', 'F', 'E', 'D#', 'D', 'C#', 'C'
];

export const MENU_SCREENS = {
RACK: 'rack',
TIMELINE: 'timeline'
};

export const DRUM_KITS = {
'707': '707',
'808': '808',
'909': '909',
};

export const INSTRUMENTS = {
    BEEPBLASTER: 'BEEPBLASTER',
    BOOMBOOM: 'BOOMBOOM',
};

export const BLANK_BEEPBLASTER: Instrument = {
    name: INSTRUMENTS.BEEPBLASTER,
    instrument: {
        envConfig: null,
        oscillators: [],
        lfoConfig: null,
        filterConfig: null,
        distortionConfig: null,
        reverbConfig: null,
        delayConfig: null,
        track: null,
        patterns: [],
    }
};

export const BLANK_BOOMBOOM: Instrument = {
    name: INSTRUMENTS.BOOMBOOM,
    instrument: {
        kit: '808',
        patterns: [],
        track: null,
    }
};
