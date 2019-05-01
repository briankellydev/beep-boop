import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MENU_SCREENS } from '../../constants';
import { SynthService } from '../../shared/services/synth.service';
import { ModalService } from '../../shared/services/modal.service';
import { RenderingModalComponent } from '../rendering-modal/rendering-modal.component';

@Component({
  selector: 'app-app-wrapper',
  templateUrl: './app-wrapper.component.html',
  styleUrls: ['./app-wrapper.component.scss']
})
export class AppWrapperComponent implements OnInit {

  title = 'beep-boop';
  itemToShow: string;
  menuScreens = MENU_SCREENS;
  loading = true;

  @ViewChild('audio') audio: ElementRef;

  constructor(
    private synthService: SynthService,
    private modalService: ModalService,
  ) {}

  ngOnInit() {
      this.itemToShow = this.menuScreens.RACK;
      navigator.requestMIDIAccess()
      .then((midiAccess) => {
        const inputs = midiAccess.inputs.values();
          for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
              input.value.onmidimessage = (event) => {
                this.synthService.midiMessage.next(event);
              };
          }
      });
      this.loading = false;
  }

  showItem(item: string) {
    this.itemToShow = item;
  }

  exportAudio() {
    this.synthService.recorder = new WebAudioRecorder(Tone.Master, {
      workerDir: '../assets/war/',
      encoding: 'wav',
    });
    this.synthService.recorder.onComplete = (recorder, blob) => {
      const url = window.URL.createObjectURL(blob);
      this.audio.nativeElement.href = url;
      this.audio.nativeElement.download = 'beepboop-project.wav';
      this.audio.nativeElement.click();
      this.modalService.modalContent.next(null);
    }
    this.synthService.recorder.setOptions({
      timeLimit: 120,
      encodeAfterRecord: true,
      ogg: {
          quality: 0.5
      },
      mp3: {
          bitRate: 160
      }
    });
    // start the recording process 
    this.modalService.modalContent.next({component: RenderingModalComponent, data: null});
    this.synthService.recorder.startRecording();
    this.synthService.playing.next(true);
  }

}
