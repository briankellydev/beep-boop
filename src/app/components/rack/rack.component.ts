import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, OnDestroy } from '@angular/core';
import { BeepBlasterComponent } from 'src/app/instruments/beep-blaster/beep-blaster.component';
import { BoomBoomComponent } from 'src/app/instruments/boom-boom/boom-boom.component';
import { SynthService } from 'src/app/shared/synth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TimelineTrack } from 'src/app/interfaces';

@Component({
  selector: 'app-rack',
  templateUrl: './rack.component.html',
  styleUrls: ['./rack.component.scss']
})
export class RackComponent implements OnInit, OnDestroy {

  @ViewChild('instrumentList', { read: ViewContainerRef }) entry: ViewContainerRef;

  INSTRUMENTS = {
    BEEPBLASTER: 'BEEPBLASTER',
    BOOMBOOM: 'BOOMBOOM',
  };
  currentInstanceNumber = 0;
  
  private destroy$ = new Subject<any>();
  private components: ComponentRef<any>[] = [];
  private timelineTracks: TimelineTrack[] = [];

  constructor(
    private resolver: ComponentFactoryResolver,
    private synthService: SynthService,
    ) { }

  ngOnInit() {
    this.synthService.instanceToDelete.pipe(takeUntil(this.destroy$)).subscribe((numToDel: number) => {
      if (numToDel !== null) {
        const idxToDelete = this.timelineTracks.findIndex((track) => {
          return track.instanceNumber === numToDel;
        });
        this.timelineTracks.splice(idxToDelete, 1);

        this.components.forEach((component) => {
          if (numToDel === component.instance.instanceNumber) {
            component.destroy();
          }
        });
      }
    });
    this.synthService.tracks.pipe(takeUntil(this.destroy$)).subscribe((tracks: TimelineTrack[]) => {
      this.timelineTracks = tracks;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  createComponent(component: string) {
    let factory;
    const track: TimelineTrack = {
      instrument: component,
      instanceNumber: null,
      volume: 0,
      patternPerMeasure: []
    };
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
    track.instanceNumber = this.currentInstanceNumber;
    for (let i = 0; i < this.synthService.numberOfMeasures; i++) {
      track.patternPerMeasure.push(null);
    }
    this.timelineTracks.push(track);
    this.synthService.tracks.next(this.timelineTracks);
    this.components.push(componentRef);
    this.currentInstanceNumber++;
  }

}
