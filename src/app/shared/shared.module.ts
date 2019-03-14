import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpaceImageDirective } from './space-image.directive';
import { TickizePipe } from './tickize.pipe';

@NgModule({
  declarations: [SpaceImageDirective, TickizePipe],
  imports: [CommonModule, FormsModule],
  exports: [SpaceImageDirective, FormsModule, TickizePipe]
})
export class SharedModule {}
