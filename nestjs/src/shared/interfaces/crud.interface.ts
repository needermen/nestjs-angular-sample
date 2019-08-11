export interface CrudInterface<T> {
  all();

  get(id: number);

  create(t: T);

  update(id: number, t: T);

  remove(id: number);
}
