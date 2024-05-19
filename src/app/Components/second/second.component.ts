import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent {
  @Output() topicAdded = new EventEmitter<{ topic: string, keywords: string[] }>();

  addTopicForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.addTopicForm = this.fb.group({
      topicName: ['', Validators.required],
      keywords: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.addTopicForm.valid) {
      const { topicName, keywords } = this.addTopicForm.value;
      this.topicAdded.emit({ topic: topicName, keywords: keywords.split(',') });
      this.addTopicForm.reset();
    }
  }
}
