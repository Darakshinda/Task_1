import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.css']
})
export class ThirdComponent {
  selectedTone: string = 'formal';
  blogContent: string = '';
  images: { dataUrl: string, name: string, selected: boolean }[] = []; // Add 'selected' property to track image selection
  history: string[] = [];
  showModal: boolean = false;

  @Output() close = new EventEmitter<void>();

  generateContent() {
    const generatedText = `This is some ${this.selectedTone} content generated for your blog.`;
    this.history.push(this.blogContent);
    this.blogContent += '\n' + generatedText;
  }

  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      Array.from(input.files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (typeof result === 'string') {
            this.images.push({ dataUrl: result, name: file.name, selected: false }); // Initialize 'selected' as false
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
    // Update file input if all images are deleted
    if (this.images.length === 0) {
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = ''; // Clear the file input value
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

  closeEditor() {
    this.close.emit();
  }
}
