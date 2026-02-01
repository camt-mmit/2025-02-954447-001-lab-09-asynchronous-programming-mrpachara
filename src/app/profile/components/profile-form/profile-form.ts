import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { createFriend } from '../../helpers';
import { Profile } from '../../types';

@Component({
  selector: 'app-profile-form',
  imports: [FormField],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileForm {
  readonly data = model.required<Profile>();

  protected readonly form = form(this.data);

  protected addFriend(): void {
    this.form.friends().value.update((items) => [...items, createFriend()]);
  }

  protected removeFriend(index: number): void {
    this.form.friends().value.update((items) => items.filter((_item, i) => i !== index));
  }

  protected moveFriend(index: number, offset: number): void {
    this.form
      .friends()
      .value.update((items) =>
        items.map((item, i) =>
          i === index ? items[index + offset] : i === index + offset ? items[index] : item,
        ),
      );
  }
}
