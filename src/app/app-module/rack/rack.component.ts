import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, OnDestroy } from '@angular/core';
import { BeepBlasterComponent } from 'src/app/instruments/beep-blaster/beep-blaster.component';
import { BoomBoomComponent } from 'src/app/instruments/boom-boom/boom-boom.component';
import { SynthService } from 'src/app/shared/services/synth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimelineTrack, Instrument, BoomBoom, BeepBlaster } from 'src/app/interfaces';
import { INSTRUMENTS, BLANK_BEEPBLASTER, BLANK_BOOMBOOM } from 'src/app/constants';

@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.scss']
})
export class RackComponent implements OnInit, OnDestroy {

  @ViewChild('instrumentList', { read: ViewContainerRef }) entry: ViewContainerRef;

  INSTRUMENTS = INSTRUMENTS;
  currentInstanceNumber = 0;

  private destroy$ = new Subject<any>();
  private components: ComponentRef<any>[] = [];
  private instruments: Instrument<any>[] = [];
  private BLANK_TRACK: TimelineTrack = {
    instrument: '',
    instanceNumber: null,
    volume: 0,
    pan: 0,
    mute: false,
    solo: false,
    collapsed: true,
    patternLengths: [1, 1, 1, 1, 1, 1, 1, 1, 1],
    patternPerMeasure: []
  };

  constructor(
    private resolver: ComponentFactoryResolver,
    private synthService: SynthService,
    ) { }

  ngOnInit() {
    
      this.synthService.instanceToDelete.pipe(takeUntil(this.destroy$)).subscribe((numToDel: number) => {
        if (numToDel !== null) {
          const idxToDelete = this.instruments.findIndex((instrument) => {
            return instrument.instrument.track.instanceNumber === numToDel;
          });
          this.instruments.splice(idxToDelete, 1);
  
          this.components.forEach((component) => {
            if (numToDel === component.instance.instanceNumber) {
              component.destroy();
            }
          });
          this.synthService.instruments.next(this.instruments);
        }
      });
  
      this.synthService.instruments.pipe(takeUntil(this.destroy$)).subscribe((instruments: Instrument<any>[]) => {
        const newInstrumentCount = instruments.length - this.instruments.length;
        this.instruments = JSON.parse(JSON.stringify(instruments));
        if (newInstrumentCount > 0) {
          for (let i = (this.instruments.length - newInstrumentCount); i < this.instruments.length; i++) {
            this.createComponent(this.instruments[i].name, this.instruments[i].instrument.track, this.instruments[i].instrument);
          }
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
  
  /*consoleLog() {
    console.log(JSON.stringify(this.instruments));
  }*/

  createInstrument(component: string) {
    const inst = component === INSTRUMENTS.BEEPBLASTER ? BLANK_BEEPBLASTER : BLANK_BOOMBOOM;
    this.instruments.push(inst);
    this.createComponent(component);
    this.synthService.instruments.next(this.instruments);
  }

  private createComponent(component: string, track?: TimelineTrack, config?: BoomBoom | BeepBlaster) {
    let factory;
    const thisTrack: TimelineTrack = track ? track : JSON.parse(JSON.stringify(this.BLANK_TRACK));

    thisTrack.instrument = component;
    switch(component) {
      case this.INSTRUMENTS.BEEPBLASTER:
      factory = this.resolver.resolveComponentFactory(BeepBlasterComponent);
      break;
      case this.INSTRUMENTS.BOOMBOOM:
      factory = this.resolver.resolveComponentFactory(BoomBoomComponent);
      break;
    }
    const componentRef: any = this.entry.createComponent(factory);
    componentRef.instance.instanceNumber = this.currentInstanceNumber;
    thisTrack.instanceNumber = this.currentInstanceNumber;
    for (let i = 0; i < this.synthService.numberOfMeasures; i++) {
      thisTrack.patternPerMeasure.push(null);
    }

    if (!config) {
      componentRef.instance.config = component === this.INSTRUMENTS.BEEPBLASTER ?
        JSON.parse(JSON.stringify(BLANK_BEEPBLASTER)) : JSON.parse(JSON.stringify(BLANK_BOOMBOOM));
    } else {
      componentRef.instance.config = config;
    }
    this.instruments[this.instruments.length - 1].instrument.track = JSON.parse(JSON.stringify(thisTrack));
    this.components.push(componentRef);
    this.currentInstanceNumber++;
  }

}
