import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/common.service';
import { Employee } from "../../main.model";



@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  formValue!: FormGroup;
  empobj: Employee = new Employee();
  collections: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private service: CommonService, private build: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.build.group({
      firstname: [''],
      lastname: [''],
      email: [''],
      pincode: [''],
      contact: [''],
      address: [''],
    })
    this.getData();
  }

  closeAdd() {
    this.showAdd = true;
    this.showUpdate = false;
  }


  //adding data
  postData() {

    this.empobj.firstname = this.formValue.value.firstname;
    this.empobj.lastname = this.formValue.value.lastname;
    this.empobj.email = this.formValue.value.email;
    this.empobj.pincode = this.formValue.value.pincode;
    this.empobj.contact = this.formValue.value.contact;
    this.empobj.address = this.formValue.value.address;

    this.service.addRecords(this.empobj).subscribe((res) => {
      console.log(res);
      alert("Added");
      
      let ref = document.getElementById("Cancel");
      ref?.click();
      this.formValue.reset({});
      this.getData();
    }, err => {
      alert(err);
    })

  }


  //getting data
  getData() {

    this.service.getRecords().subscribe((res) => {
      console.log(res);
      this.collections = res;
    })

  }


  //on click display old data

  onEdit(item: any) {
    
    this.showAdd = false;
    this.showUpdate = true;

    this.empobj.id = item.id;
    this.formValue.controls['firstname'].setValue(item.firstname);
    this.formValue.controls['lastname'].setValue(item.lastname);
    this.formValue.controls['email'].setValue(item.email);
    this.formValue.controls['pincode'].setValue(item.pincode);
    this.formValue.controls['contact'].setValue(item.contact);
    this.formValue.controls['address'].setValue(item.address);

  }

  //on click display old data and edit/add new data
  putData() {

    this.empobj.firstname = this.formValue.value.firstname;
    this.empobj.lastname = this.formValue.value.lastname;
    this.empobj.email = this.formValue.value.email;
    this.empobj.pincode = this.formValue.value.pincode;
    this.empobj.contact = this.formValue.value.contact;
    this.empobj.address = this.formValue.value.address;

    this.service.updateRecords(this.empobj, this.empobj.id).subscribe((res) => {
      console.log(res);
      alert("Updated");

      let ref = document.getElementById("Cancel");
      ref?.click();
      this.formValue.reset({});
      this.getData();
    }, err => {
      alert(err);
    })

  }


  //deleting data
  OnDelete(item: any) {

    this.service.deleteRecords(item.id).subscribe((res) => {
      console.log(res);
      alert("Deleted");
      this.getData();
    })

  }


}



