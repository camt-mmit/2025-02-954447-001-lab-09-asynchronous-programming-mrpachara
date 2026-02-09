import { ValueObject } from '../types';

export type DynamicSection = readonly (readonly number[])[];

export type DynamicSectionModel = readonly (readonly ValueObject<
  DynamicSection[number][number]
>[])[];
