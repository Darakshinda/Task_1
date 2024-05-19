import { Component } from '@angular/core';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css']
})
export class FirstComponent {
  
  selectedCategory: string = 'All';
  showForm: boolean = false;
  editorVisible: boolean = false;
  customTopics: { topic: string, keywords: string[] }[] = []; // Array to store custom topics and keywords
  selectedTopic: string = ''; // Add selectedTopic property
  selectedKeywords: string[] = [];  // Array to store custom topics and keywords

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  addTopic(topic: string, keywords: string[]) {
    const lowerCaseTopic = topic.toLowerCase(); // Convert topic to lowercase
    const existingTopic = this.customTopics.find(t => t.topic.toLowerCase() === lowerCaseTopic);
  
    if (existingTopic) {
      // Append new keywords to the existing topic
      existingTopic.keywords = [...new Set([...existingTopic.keywords, ...keywords])];
    } else {
      // Create a new topic with lowercase topic name
      this.customTopics.push({ topic: lowerCaseTopic, keywords });
    }
  }
  deleteTopic(topicToDelete: { topic: string, keywords: string[] }) {
    this.customTopics = this.customTopics.filter(topic => topic !== topicToDelete);
  }
  openEditor(topic: string, keywords: string[]) {
  this.selectedTopic = topic;
  this.selectedKeywords = keywords;
  this.editorVisible = true;
}


  closeEditor() {
    this.editorVisible = false;
  }
}
