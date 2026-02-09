import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, linkedSignal, model } from '@angular/core';
import {
  FieldTree,
  FormField,
  applyEach,
  createMetadataKey,
  form,
  metadata,
} from '@angular/forms/signals';
import {
  createDynamicSectionItem,
  createDynamicSectionValue,
  toDynamicSection,
  toDynamicSectionItemModel,
  toDynamicSectionModel,
  toDynamicSectionValueModel,
} from '../../helpers';
import { DynamicSection, DynamicSectionModel } from '../../types';

@Component({
  selector: 'app-dynamic-section-form',
  imports: [FormField, DecimalPipe],
  templateUrl: './dynamic-section-form.html',
  styleUrl: './dynamic-section-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicSectionForm {
  readonly data = model.required<DynamicSection>();

  private syncedSource: DynamicSection | null = null;

  protected readonly model = linkedSignal({
    source: this.data,
    computation: (source, previous): DynamicSectionModel => {
      if (typeof previous === 'undefined' || this.syncedSource !== source) {
        return toDynamicSectionModel(source);
      } else {
        return previous.value;
      }
    },
  });

  protected readonly totalKey = createMetadataKey<number>();

  protected readonly form = form(this.model, (path) => {
    applyEach(path, (item) => {
      metadata(item, this.totalKey, ({ valueOf }) =>
        valueOf(item).reduce((result, value) => result + value.value, 0),
      );
    });
  });

  constructor() {
    effect(() => {
      this.syncedSource = toDynamicSection(this.model());
      this.data.set(this.syncedSource);
    });
  }

  protected addItem(): void {
    this.form().value.update((items) => [
      ...items,
      toDynamicSectionItemModel(createDynamicSectionItem()),
    ]);
  }

  protected removeItem(index: number): void {
    this.form().value.update((items) => items.filter((_item, i) => i !== index));
  }

  protected addValue(fieldTree: FieldTree<DynamicSectionModel[number]>): void {
    fieldTree().value.update((items) => [
      ...items,
      toDynamicSectionValueModel(createDynamicSectionValue()),
    ]);
  }

  protected removeValue(fieldTree: FieldTree<DynamicSectionModel[number]>, index: number): void {
    fieldTree().value.update((items) => items.filter((_item, i) => i !== index));
  }
}
