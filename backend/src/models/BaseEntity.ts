export abstract class BaseEntity {
  constructor(public id?: number) {}
  abstract toObject(): object;
}