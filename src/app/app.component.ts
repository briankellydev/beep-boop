import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MENU_SCREENS } from './constants';
import { SynthService } from './shared/synth.service';
import { ModalService } from './shared/modal/modal.service';
import { RenderingModalComponent } from './rendering-modal/rendering-modal.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'beep-boop';
  itemToShow: string;
  menuScreens = MENU_SCREENS;

  @ViewChild('audio') audio: ElementRef;

  constructor(
    private synthService: SynthService,
    private modalService: ModalService,
  ) {}

  ngOnInit() {
    this.itemToShow = this.menuScreens.RACK;
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
    //start the recording process 
    this.modalService.modalContent.next({component: RenderingModalComponent, data: null});
    this.synthService.recorder.startRecording();
    this.synthService.playing.next(true);
  }
}
