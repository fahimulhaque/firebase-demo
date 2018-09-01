import {
  Component, OnDestroy
} from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList
} from 'angularfire2/database';
import {
  Subscription, Observable
} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  courses$: Observable<any[]>; // $ indicate it is Observable type

  // Async pipe is used to subscribe and unsubscribe in template.
  courseRef: AngularFireList<any>;
  author$;
  constructor(private db: AngularFireDatabase) {
    this.courseRef = db.list('courses');
    this.courses$ = this.courseRef.snapshotChanges();
    this.author$ = db.object('authors/1').valueChanges();
  }
  add(course: HTMLInputElement) {
      this.courseRef.push(course.value);
      course.value = '';
      }

  update(key: string , value: string) {
    this.courseRef.set(key , 'Updated '  + value);
    // this.db.object('courses/' + course.key).set('Updated');
  }

  delete(key: string) {
    this.courseRef.remove(key);
  }
}
