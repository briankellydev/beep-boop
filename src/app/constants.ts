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

export const BLANK_BEEPBLASTER: Instrument<BeepBlaster> = {
    name: INSTRUMENTS.BEEPBLASTER,
    instrument: {
        envConfig: {
            attack: 0.001,
            decay: 0.001,
            sustain: 0.3,
            release: 0.001
        },
        oscillators: [
            {
                oscillator: {
                    frequency: 440,
                    type: 'sine',
                },
                envelope: {
                    attack: 0.001,
                    decay: 0.001,
                    sustain: 0.3,
                    release: 0.001
                },
                enabled: true,
            },
            {
                oscillator: {
                    frequency: 440,
                    type: 'sine',
                },
                envelope: {
                    attack: 0.001,
                    decay: 0.001,
                    sustain: 0.3,
                    release: 0.001
                },
                enabled: false,
            },
            {
                oscillator: {
                    frequency: 440,
                    type: 'sine',
                },
                envelope: {
                    attack: 0.001,
                    decay: 0.001,
                    sustain: 0.3,
                    release: 0.001
                },
                enabled: false,
            },
        ],
        lfoConfig: {
            frequency: 1,
            min: 0,
            max: 10,
            type: 'sine',
            phase: null,
            amplitude: null,
            enabled: false,
        },
        filterConfig: {
            frequency: 800,
            Q: 0,
            type: 'lowpass'
        },
        distortionConfig: {
            distortion: 0,
            enabled: false
        },
        reverbConfig: {
            roomSize: 10,
            enabled: false
        },
        delayConfig: {
            delayTime: 0.5,
            feedback: 1,
            enabled: false,
        },
        track: null,
        patterns: [],
    }
};

export const BLANK_BOOMBOOM: Instrument<BoomBoom> = {
    name: INSTRUMENTS.BOOMBOOM,
    instrument: {
        kit: '808',
        patterns: [],
        track: null,
    }
};
