import { JSONSchema7, JSONSchema7Type } from 'json-schema'

export type ValidateTypeFunc = (interface: JSONSchema7Type) => boolean

export interface SchemaProperties {
  [key: string]: JSONSchema7
}

export interface StringOptions {
  detectFormat?: boolean
}

export interface ObjectOptions {
  required?: boolean
  /* by draft07 we should be able to specify the type of the allowed additional 
    properties, but in inferring scenario, it's better to only configure allow or not 
  */
  allowAdditionalProperties?: boolean | undefined
}

export interface ArrayOptions {
  // TODO: anyOf merge
  arrayInferMode?: 'first' | 'tuple'
  /*
  by definition, when the array validation is single schema, additional items prop 
  has no effect, thus not recommended to configure.
  */
  allowAdditionalItems?: boolean | undefined
  uniqueItems?: boolean | undefined
}

export interface CommonConfig {
  title?: boolean
  description?: boolean
  default?: boolean
  examples?: boolean
  const?: boolean
  enum?: boolean
}

export interface InferrerConfig {
  type: boolean
  // TODO: configure id infer type
  // idBase: string
  string: StringOptions
  // number: any - type number's available props are not proper for inferring.
  object: ObjectOptions
  array: ArrayOptions
  common: CommonConfig
}
