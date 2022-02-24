import {
  JSONSchema7,
  JSONSchema7Array,
  JSONSchema7Object,
  JSONSchema7Type,
  JSONSchema7TypeName
} from 'json-schema'
import { SchemaProperties } from './typing'
import { types } from './types'

const getType = (val: any) => {
  const typeNames: JSONSchema7TypeName[] = Object.keys(
    types
  ) as JSONSchema7TypeName[]
  return typeNames.find((typeName) => types[typeName](val))
}

// By default, the inferrer will not generate boolean type schema although it's possible in draft07 definition
export const genSchema = (source: JSONSchema7Type): JSONSchema7 => {
  // TODO1: basic : type, array: first
  const resObj: JSONSchema7 = {}

  const type = getType(source)
  if (!type) throw new Error(`Invalid input type`)
  resObj['type'] = type

  if (type === 'object') {
    // object
    const properties: SchemaProperties = {}
    for (let [key, val] of Object.entries(source as JSONSchema7Object)) {
      properties[key] = genSchema(val)
    }
    resObj['properties'] = properties
  } else if (type === 'array') {
    /*array 
      default array validation mode: first
    */
    const firstItem = (source as JSONSchema7Array)[0]
    resObj['items'] = genSchema(firstItem)
  }

  // TODO2: design config
  // TODO3: make the generating process configurable
  return resObj
}
