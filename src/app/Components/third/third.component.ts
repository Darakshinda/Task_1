import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.css']
})
export class ThirdComponent implements OnChanges {
  @Input() topic: string = '';
  @Input() keywords: string[] = [];
  @Output() close = new EventEmitter<void>();

  selectedTone: string = 'formal';
  blogContent: string = '';
  images: { dataUrl: string, name: string, selected: boolean }[] = [];
  history: string[] = [];
  showModal: boolean = false;

 
  generateContent() {
    if (this.topic && this.keywords.length) {
      const keywordsStr = this.keywords.join(', ');
      this.blogContent = `This is some ${this.selectedTone} content generated for the topic "${this.topic}" using keywords: ${keywordsStr}.`;
    } else {
      this.blogContent = '';
    }
  }
  

  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (typeof result === 'string') {
            this.images.push({ dataUrl: result, name: file.name, selected: false });
          }
        };
        reader.readAsDataURL(file);
      });
    }
  }

  deleteSelectedImages() {
    this.showModal = true;
  }

  toggleImageSelection(index: number) {
    this.images[index].selected = !this.images[index].selected;
  }

  deleteImageConfirmed() {
    this.images = this.images.filter(img => !img.selected);
    if (this.images.length === 0) {
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }
    }
    this.showModal = false;
  }

  cancelDelete() {
    this.showModal = false;
  }

  handleKeydown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'z') {
      this.undo();
    }
  }

  undo() {
    if (this.history.length > 0) {
      this.blogContent = this.history.pop() || '';
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['topic'] || changes['keywords']) {
      this.generateContent();
    }
  }
  

  closeEditor() {
    this.close.emit();
  }
}
