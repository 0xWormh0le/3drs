import { Component, OnInit, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Store } from '@ngxs/store';
import { RenterState } from '../../state/renter/renter.state';
import { UpdatePriceRange } from '../../state/renter/renter.actions';

@Component({
  selector: 'app-price-popover',
  templateUrl: './price-popover.component.html',
  styleUrls: ['./price-popover.component.scss'],
})
export class PricePopoverComponent implements OnInit, OnChanges {
  min;
  max;
  minMaxForm: FormGroup;
  constructor(private fb: FormBuilder, private store: Store) { }

  ngOnInit() {
    this.minMaxForm = this.fb.group({
      minMax: ['']
    });

    const welcomeForm = this.store.selectSnapshot(RenterState.welcomeForm);
    const { lower, upper } = welcomeForm.model?.desiredPrice;

    console.log(welcomeForm, lower, upper);

    this.min = lower || 0;
    this.max = upper || 1000;
    this.minMaxForm.patchValue({ minMax: { lower, upper } });

    this.minMaxForm.valueChanges.subscribe(data => {
      this.min = data.minMax.lower;
      this.max = data.minMax.upper;
      console.log(this.minMaxForm, data);
      this.store.dispatch(new UpdatePriceRange({ lower: this.min, upper: this.max }))
        .subscribe(data => {
          console.log(data);
        });

      console.log('data = ');
      console.log(data);
    });
  }

  ngOnChanges(changes) {
    console.log('changes = ');
    console.log(changes);
  }
}
