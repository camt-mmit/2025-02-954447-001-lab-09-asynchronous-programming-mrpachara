import { createValueObject, extractValueObject } from '../helpers';
import { DynamicSection, DynamicSectionModel } from './types';

export function createDynamicSectionValue(): DynamicSection[number][number] {
  return 0;
}

export function createDynamicSectionItem(): DynamicSection[number] {
  return [createDynamicSectionValue()];
}

export function createDynamicSection(): DynamicSection {
  return [createDynamicSectionItem()];
}

// -------------- To Model -----------------
export function toDynamicSectionValueModel(
  value: DynamicSection[number][number],
): DynamicSectionModel[number][number] {
  return createValueObject(value);
}

export function toDynamicSectionItemModel(
  value: DynamicSection[number],
): DynamicSectionModel[number] {
  return value.map(toDynamicSectionValueModel);
}

export function toDynamicSectionModel(value: DynamicSection): DynamicSectionModel {
  return value.map(toDynamicSectionItemModel);
}

// -------------- To Value -----------------
export function toDynamicSectionValue(
  model: DynamicSectionModel[number][number],
): DynamicSection[number][number] {
  return extractValueObject(model);
}

export function toDynamicSectionItem(model: DynamicSectionModel[number]): DynamicSection[number] {
  return model.map(toDynamicSectionValue);
}

export function toDynamicSection(model: DynamicSectionModel): DynamicSection {
  return model.map(toDynamicSectionItem);
}
