import { JsonSchemaInferrer } from '../src/index'
import { isEqual } from 'lodash/'
test('Basic Inferrer', () => {
  const input = {
    checked: false,
    dimensions: {
      width: 5,
      height: 10
    },
    id: 1,
    name: 'A green door',
    price: 12.5,
    tags: ['home', 'green']
  }
  const output = {
    $schema: 'http://json-schema.org/draft-07/schema',
    type: 'object',
    properties: {
      checked: {
        type: 'boolean'
      },
      dimensions: {
        type: 'object',
        properties: {
          width: {
            type: 'integer'
          },
          height: {
            type: 'integer'
          }
        }
      },
      id: {
        type: 'integer'
      },
      name: {
        type: 'string'
      },
      price: {
        type: 'number'
      },
      tags: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    }
  }
  const res = JsonSchemaInferrer(input)
  expect(isEqual(res, output)).toBe(true)
})
