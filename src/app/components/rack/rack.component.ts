import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, OnDestroy } from '@angular/core';
import { BeepBlasterComponent } from 'src/app/instruments/beep-blaster/beep-blaster.component';
import { BoomBoomComponent } from 'src/app/instruments/boom-boom/boom-boom.component';
import { SynthService } from 'src/app/shared/synth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  constructor(
    private resolver: ComponentFactoryResolver,
    private synthService: SynthService,
    ) { }

  ngOnInit() {
    this.synthService.instanceToDelete.pipe(takeUntil(this.destroy$)).subscribe((numToDel: number) => {
      if (numToDel !== null) {
        this.components.forEach((component) => {
          if (numToDel === component.instance.instanceNumber) {
            component.destroy();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  createComponent(component: string) {
    let factory;
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
    this.components.push(componentRef);
    this.currentInstanceNumber++;
}

}
