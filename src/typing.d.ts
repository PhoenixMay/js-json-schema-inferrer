import { JSONSchema7, JSONSchema7Type } from 'json-schema'
export type ValidateTypeFunc = (interface: JSONSchema7Type) => boolean

export interface SchemaProperties {
  [key: string]: JSONSchema7
}
// TODO: define configs

interface stringOptions {
  detectFormat?: boolean
}

interface numberOptions {}
interface InferrerConfig {
  type: boolean
  string: any
  number: any
  object: any
  array: any
  common: any
}
