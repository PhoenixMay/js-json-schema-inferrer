import {
  JSONSchema7,
  JSONSchema7Array,
  JSONSchema7Object,
  JSONSchema7Type,
  JSONSchema7TypeName
} from 'json-schema'
import { InferrerConfig, SchemaProperties } from './typing'
import { types } from './types'
import { FORMAT_REGEXPS, isFormat } from './stringFormats'
import { cloneDeep } from 'lodash'

const getType = (val: any) => {
  const typeNames: JSONSchema7TypeName[] = Object.keys(
    types
  ) as JSONSchema7TypeName[]
  return typeNames.find((typeName) => types[typeName](val))
}

const getFormat = (val: string) => {
  return Object.keys(FORMAT_REGEXPS).find((formatName) =>
    isFormat(val, formatName)
  )
}

const DefaultDict = {
  string: '',
  number: 0,
  integer: 0.0,
  boolean: false,
  object: {},
  array: [],
  null: null
}

// By default, the inferrer will not generate boolean type schema although it's possible in draft07 definition
export const genSchema = (
  ifRoot: boolean,
  name: string,
  source: JSONSchema7Type,
  config: InferrerConfig
): JSONSchema7 => {
  const resObj: JSONSchema7 = {}
  // root special
  if (ifRoot) {
    resObj['$schema'] = 'http://json-schema.org/draft-07/schema'
  }
  // TODO: id

  // type
  const type = getType(source)
  if (!type) throw new Error(`Invalid input type`)
  if (!!config.type) resObj['type'] = type

  if (type === 'object') {
    const properties: SchemaProperties = {}
    const requiredProps: string[] = []
    for (const [key, val] of Object.entries(source as JSONSchema7Object)) {
      properties[key] = genSchema(false, key, val, config)
      if (!!config.object.required) requiredProps.push(key)
    }
    // must have: properties
    resObj['properties'] = properties
    if (!!config.object.required) resObj['required'] = requiredProps
    if (config.object.allowAdditionalProperties !== undefined)
      resObj['additionalProperties'] = config.object.allowAdditionalProperties
  } else if (type === 'array') {
    let mode = config.array.arrayInferMode
    /*array 
      default array validation mode: none 
      TODO: array anyOf mode
    */
    if (mode === 'first') {
      const firstItem = (source as JSONSchema7Array)[0]
      resObj['items'] = genSchema(false, 'items', firstItem, config)
    } else if (mode === 'tuple') {
      const tupleSchema = cloneDeep(source as JSONSchema7Array).map(
        (item, idx) => genSchema(false, String(idx), item, config)
      )
      resObj['items'] = tupleSchema
    }
  } else if (type === 'string' && !!config.string.detectFormat) {
    if (getFormat(source as string))
      resObj['format'] = getFormat(source as string)
  }

  // common config
  if (!!config.common.title) resObj['title'] = `The ${name} schema`
  if (!!config.common.description)
    resObj['description'] = 'An explanation about the purpose of this instance.'
  if (!!config.common.default) resObj['default'] = DefaultDict[type]
  if (!!config.common.examples) resObj['examples'] = [cloneDeep(source)]
  if (!!config.common.const) resObj['const'] = cloneDeep(source)
  if (!!config.common.enum) resObj['enum'] = [cloneDeep(source)]

  return resObj
}
