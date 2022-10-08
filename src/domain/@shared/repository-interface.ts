export interface RepositoryInterface<T> {
    
  create(entity: T): Promise<void>;
  update(entiy: T): Promise<void>;
  find(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
