import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../../../core/services/courses.service';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../components/models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-course-detail',
  standalone: false,

  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.scss'
})
export class CourseDetailComponent implements OnInit {

  isLoading = false;
  course: Course | null = null;

  errorMessage: string | null = null;

  constructor(private coursesService: CourseService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.coursesService.getCourseDetail(this.activatedRoute.snapshot.params['id'])
      .subscribe({
        next: (course) => {
          this.course = course;
          this.errorMessage = null;
        },
        complete: () => {
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err)
          this.isLoading = false

          if (err instanceof HttpErrorResponse && err.status === 404) {
            this.errorMessage = 'El curso no existe';
          }
        }
      });
  }
}
