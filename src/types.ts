import { JSONSchema7Type, JSONSchema7TypeName } from 'json-schema'
import { ValidateTypeFunc } from './typing'
export const types: Record<JSONSchema7TypeName, ValidateTypeFunc> = {
  integer: function isInteger(instance: JSONSchema7Type) {
    return typeof instance === 'number' && instance % 1 === 0
  },
  number: function isNumber(instance: JSONSchema7Type) {
    return typeof instance === 'number' && isFinite(instance)
  },
  string: function isString(instance: JSONSchema7Type) {
    return typeof instance === 'string'
  },
  array: function isArray(instance: JSONSchema7Type) {
    return Array.isArray(instance)
  },
  object: function isObject(instance: JSONSchema7Type) {
    return (
      !!instance && typeof instance === 'object' && !Array.isArray(instance)
    )
  },
  boolean: function isBoolean(instance: JSONSchema7Type) {
    return typeof instance === 'boolean'
  },
  null: function isNull(instance: JSONSchema7Type) {
    return instance === null
  }
}
