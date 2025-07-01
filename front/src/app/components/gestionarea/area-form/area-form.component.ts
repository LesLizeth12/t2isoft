import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Area } from 'src/app/models/AreaModel';

@Component({
  selector: 'app-area-form',
  templateUrl: './area-form.component.html',
  styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent implements OnInit{
  areaForm!: FormGroup;
  submited = false;
  area: Area | undefined;
  isEditMode =false;

  ngOnInit(): void {
    this.areaForm = this.fb.group({
      id: [this.area?.id],
      areaNom: [this.area?.areaNom || '', Validators.required],
      areaSalario: [this.area?.areaSalario || '', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/), Validators.min(1)]],
      estado: '1'
    })
  }


  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.areaForm = this.fb.group({
      areaNom: [''],
      areaSalario: [''],
      estado: '1'
    })
  }


  onSubmit() {
    this.submited = true;
    if (this.areaForm.valid) {
      this.activeModal.close(this.areaForm.value);
      this.areaForm.reset();
      this.submited = false;
    }
  }

  onCancel() {
    this.areaForm.reset();
    this.submited = false;
    this.activeModal.dismiss();
  }
}
