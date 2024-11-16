import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskActions } from '../../+state/task.actions';
import { Task, TaskPriority, TaskStatus } from '../../+state/task.model';
import { selectAllTasks, selectTaskLoading } from '../../+state/task.selectors';
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

declare var bootstrap: any; // For accessing Bootstrap's Modal API

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  imports: [
    AsyncPipe,
    FormsModule,
    NgIf,
    NgForOf
  ],
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]> | undefined;
  loading$: Observable<boolean> | undefined;
  newTaskName: string = '';
  newTaskDescription: string = '';
  newTaskStatus: TaskStatus = TaskStatus.NotStarted;
  newTaskPriority: TaskPriority = TaskPriority.Medium;
  newTaskDueDate: string = '';

  constructor(private readonly store: Store) {
    this.tasks$ = this.store.select(selectAllTasks);
    this.loading$ = this.store.select(selectTaskLoading);
  }

  ngOnInit() {
    this.store.dispatch(TaskActions.loadTasks());
  }

  onReverseOrder() {
    this.store.dispatch(TaskActions.reverseOrder());
  }

  onAddTask() {
    if (this.newTaskName.trim() && this.newTaskDescription.trim() && this.newTaskDueDate) {
      this.store.dispatch(TaskActions.addTask({
        task: {
          name: this.newTaskName.trim(),
          description: this.newTaskDescription.trim(),
          status: this.newTaskStatus,
          priority: this.newTaskPriority,
          dueDate: this.newTaskDueDate
        }
      }));
      this.resetForm();
      this.closeModal();
    }
  }

  private resetForm() {
    this.newTaskName = '';
    this.newTaskDescription = '';
    this.newTaskStatus = TaskStatus.NotStarted;
    this.newTaskPriority = TaskPriority.Medium;
    this.newTaskDueDate = '';
  }

  private closeModal() {
    const modalElement = document.getElementById('addTaskModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal.hide();
    }
  }

  onSwipeLeft(task: Task) {
    // task.swipedLeft = true; // Mark the task as swiped
  }

  onSwipeRight(task: Task) {
    // task.swipedLeft = false; // Reset swipe action
  }

  onDelete(task: Task) {
    // this.store.dispatch(TaskActions.deleteTask({ taskId: task.id }));
  }

  onEdit(task: Task) {
    // Logic to open the modal and populate fields for editing the task
    // For instance, setting modal fields to task's current values
  }
}
