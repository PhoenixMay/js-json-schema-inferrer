import { JSONSchema7 } from 'json-schema'

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
