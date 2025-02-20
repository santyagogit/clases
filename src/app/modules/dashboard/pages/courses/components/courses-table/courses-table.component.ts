import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Course } from '../models';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../../../../../core/services/auth.service';

@Component({
  selector: 'app-courses-table',
  standalone: false,

  templateUrl: './courses-table.component.html',
  styleUrl: './courses-table.component.scss'
})
export class CoursesTableComponent {
  displayedColumns: string[] = ['id', 'name', 'actions'];

  @Input() dataSource: Course[] = [];

  @Output() delete = new EventEmitter<string>();

  @Output() edit = new EventEmitter<Course>();

  isAdmin$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.isAdmin$ = this.authService.isAdmin$
  }
}
