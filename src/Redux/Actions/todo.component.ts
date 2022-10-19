import { StorageService } from './../localStorage/localStorage.service';
import { ITask } from './../model/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const todoListStorageKey = 'Todo_List';

const defaultTodoList = [
  { tasks: undefined, inprogress: undefined, done: undefined }
]

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})

export class TodoComponent implements OnInit {

  todoForm!: FormGroup;
  tasks: ITask[] = [];
  inprogress: ITask[] = [];
  done: ITask[] = [];
  updateIndex!: any;
  isEditEnabled: boolean = false;

  constructor(private fb: FormBuilder, private storageService: StorageService) {
    if (this.tasks.length > 0) {
      this.tasks = storageService.getData(todoListStorageKey);
    } else {
      return;
    }
  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      item: ['', Validators.required]
    });
  };

  saveList(): void {
    this.storageService.setData(todoListStorageKey, this.tasks);
  }

  addTask() {
    this.tasks.push({
      description: this.todoForm.value.item,
      done: false,
    });
    this.saveList();
    this.todoForm.reset();
  };

  onEdit(item: ITask, idx: number) {
    this.todoForm.controls['item'].setValue(item.description);
    this.updateIndex = idx;
    this.isEditEnabled = true;
    this.saveList();
  };

  updateTask() {
    this.tasks[this.updateIndex].description = this.todoForm.value.item;
    this.tasks[this.updateIndex].done = false;
    this.todoForm.reset();
    this.updateIndex = undefined;
    this.isEditEnabled = false;
    this.saveList();
  }

  deleteTask(idx: number) {
    this.tasks.splice(idx, 1);
    this.saveList();
  };

  deleteInProgressTask(idx: number) {
    this.inprogress.splice(idx, 1);
    this.saveList();
  };

  deleteDoneTask(idx: number) {
    this.done.splice(idx, 1);
    this.saveList();
  };

  drop(event: CdkDragDrop<ITask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  };
}
