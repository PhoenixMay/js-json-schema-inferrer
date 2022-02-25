import { JSONSchema7, JSONSchema7Type } from 'json-schema'
import { genSchema } from './helpers'
import { InferrerConfig } from './typing'
export const JsonSchemaInferrer = (
  input: any,
  config?: InferrerConfig
): JSONSchema7 => {
  let source: JSONSchema7Type
  const defaultConfig: InferrerConfig = {
    type: true,
    string: {
      detectFormat: false
    },
    object: {},
    array: {
      arrayInferMode: 'first'
    },
    common: {}
  }
  const inferConfig = !!config ? config : defaultConfig
  // Format JSON, if invalid JSON, throw an error
  try {
    source = JSON.parse(JSON.stringify(input))
  } catch (e) {
    throw new Error(`Invalid JSON`)
  }
  /* root must have: $schema, which is draft version url. for now, default is draft-07,
and url is http://json-schema.org/draft-07/schema */
  const root = genSchema(true, 'root', source, inferConfig)
  return root
}
