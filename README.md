# JS Object to JSON Schema Inferrer

A ts based, fully typed inferrer which can convert js object to JSON schema. The schema is based on draft-07 and supports customize configs.

## Install

```
 npm install js-json-schema-inferrer
```

## Basic Usage

```
import { JsonSchemaInferrer } from 'js-json-schema-inferrer'

const sourceObject = {
  name: "cest jun",
  age: 21,
  favoriteFoods: ["toast", "dumplings"]
}

const schema = JsonSchemaInferrer(sourceObject)

```

## Configs

Inferrer supports customizing configs to control the format and elements of the inferred result.

### `JsonSchemaInferrer(input: any, config?: InferrerConfig)`

```
interface InferrerConfig {
  type: boolean
  string: StringOptions
  object: ObjectOptions
  array: ArrayOptions
  common: CommonOptions
}
```

Default config:

```
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
```

### ` StringOptions`

- `detectFormat: boolean` : if true, the inferrer can detect each string's format regexp.

### `ObjectOptions`

- `required: boolean`: if true, make every property in the object required.
- `allowAdditionalProperties: boolean | undefined`: control if this object allows additional properties besides listed ones.

### `ArrayOptions`

- `arrayInferMode: 'first' | 'tuple'`:
  - `'first'` means a kind of list validation, it uses the first item of the array to validate all the items.
  - `tuple` means tuple validation. All the items in the array have their own validation schema.
- `allowAdditionalItems: boolean | undefined`: control if this array allows additional properties.
- `uniqueItems: boolean | undefined`: control if this array's items are unique.

### `CommonConfig`

- `title: boolean`: if true, display the title of each instance. Default `'The ${name} schema`
- `description: boolean`: if true, display the description of each instance. Default `An explanation about the purpose of this instance.`
- `default: boolean`: if true, make the source object's values be each instance's default value.
- `examples: boolean`: if true, make origin values be example value.
- `const: boolean`: if true, make origin values be const.
- `enum: boolean`: if true, make origin values be the first element of enums.

## TODOs

1. Configure id inferring.
2. Add more arrayInferMode, eg: `'anyOf'`
3. Update the string formats Regexps to suit draft-07
4. Add tests.
5. Add badges ;)
