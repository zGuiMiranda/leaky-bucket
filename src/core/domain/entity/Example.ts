import { BUSINESS_ERRORS } from "../../error/error";
import { BusinessError } from "../../error/BusinessError";
import ID from "../vo/ID";

export class Example {
  private id: number;
  private name: string;
  private description: string;
  private isActive: boolean;

  constructor(
    id: number,
    name: string,
    description: string,
    isActive: boolean = true
  ) {
    if (name.length < 2 || name.length > 100)
      throw new BusinessError(BUSINESS_ERRORS.EXAMPLE_ERROR);
   

    this.id = id;
    this.name = name;
    this.description = description;
    this.isActive = isActive;
  }

  static create(name: string, description: string): Example {
    const Id = ID.create().id;

    return new Example(Id, name, description, true);
  }

  get Id(): number {
    return this.id;
  }

  get Name(): string {
    return this.name;
  }

  get Description(): string {
    return this.description;
  }

  get IsActive(): boolean {
    return this.isActive;
  }

  activate(): void {
    this.isActive = true;
  }
  deactivate(): void {
    this.isActive = false;
  }
}
