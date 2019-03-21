
export enum Identifier {
  'something' = 1234
}
Object.freeze(Identifier)

export interface ContainerInterface extends Readonly<{
  id: Identifier
}>{}

export abstract class Container implements ContainerInterface {
  id!: Identifier
}
