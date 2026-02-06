import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, model } from '@angular/core';
import {
  FieldTree,
  FormField,
  applyEach,
  createMetadataKey,
  form,
  metadata,
} from '@angular/forms/signals';
import { createDynamicSectionItem, createDynamicSectionValue } from '../../helpers';
import { DynamicSection } from '../../types';

@Component({
  selector: 'app-dynamic-section-form',
  imports: [FormField, DecimalPipe],
  templateUrl: './dynamic-section-form.html',
  styleUrl: './dynamic-section-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSectionForm {
  readonly data = model.required<DynamicSection>();

  protected readonly totalKey = createMetadataKey<number>();

  protected readonly form = form(this.data, (path) => {
    applyEach(path, (item) => {
      metadata(item, this.totalKey, ({ valueOf }) =>
        valueOf(item).reduce((result, value) => result + value, 0),
      );
    });
  });

  protected addItem(): void {
    this.form().value.update((items) => [...items, createDynamicSectionItem()]);
  }

  protected removeItem(index: number): void {
    this.form().value.update((items) => items.filter((_item, i) => i !== index));
  }

  protected addValue(fieldTree: FieldTree<DynamicSection[number]>): void {
    fieldTree().value.update((items) => [...items, createDynamicSectionValue()]);
  }

  protected removeValue(fieldTree: FieldTree<DynamicSection[number]>, index: number): void {
    fieldTree().value.update((items) => items.filter((_item, i) => i !== index));
  }
}
