import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-reply-button',
  templateUrl: './reply-button.component.html',
  styleUrls: ['./reply-button.component.css']
})
export class ReplyButtonComponent {
  @Input() texto: string = "";
  @Input() classe: string = "";
  @Input() isDisabled: boolean = false;
}
