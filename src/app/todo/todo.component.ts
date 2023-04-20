import { Component, OnInit } from '@angular/core';
import{ FormControl, FormBuilder, FormGroup } from '@angular/forms'
import { TodoModel } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
  export class TodoComponent implements OnInit {

    formValue !:FormGroup;
    todoModelObj : TodoModel = new TodoModel();
    todoData !: any;
    showAdd !: boolean;
    showUpdate !: boolean;
    submitted = false;

    constructor(private formbuilder: FormBuilder,
      private api: TodoService) { }

      todoForm = this.formbuilder.group({
        title: new FormControl(null)
      })

    ngOnInit(): void {
      this.formValue = this.formbuilder.group({
        title: ['']
      })

      this.getAllTodo();
    }

    clickAddTodo() {
      this.formValue.reset()
      this.showAdd = true;
      this.showUpdate = false;
      this.submitted = true;
    }

    postTodoDetails(){
      this.todoModelObj.title = this.formValue.value.title;
      this.todoModelObj.status = this.formValue.value.status;

      this.api.postTodo(this.todoModelObj)
      .subscribe(res => {
        console.log(res);
        alert("Todo Added Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllTodo();
      }, 
      )
    }

    getAllTodo(){
      this.api.getTodo(this.api)
      .subscribe(res=> {
        this.todoData = res;
      })
    }

    deleteTodo(row: any){
      this.api.deleteTodo(row.id)
      .subscribe(res => {
        alert("Todo Deleted")
        this.getAllTodo()
      })
    }
  
    onEdit(row:any){
      this.showAdd = false;
      this.showUpdate = true;
      this.todoModelObj.id = row.id;
      this.formValue.controls['title'].setValue(row.title)
  }

  updateTodoetails(){
    this.todoModelObj.title = this.formValue.value.title;
    this.todoModelObj.status = this.formValue.value.status;
    this.api.updateTodo( this.todoModelObj)
    .subscribe(res => {
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllTodo();
    })
  }

}
