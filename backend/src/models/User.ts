import { BaseEntity } from './BaseEntity';

export class User extends BaseEntity {
  public name: string;
  public email: string;
  public passwordHash: string;

  /**
   * @param name     
   * @param email        
   * @param passwordHash 
   * @param id          
   */
  constructor(
    name: string,
    email: string,
    passwordHash: string,
    id?: number
  ) {
    super(id);
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
  }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.passwordHash
    };
  }
}