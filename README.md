# JS Object to JSON Schema Inferrer

A ts based, fully typed inferrer which can convert js object to JSON schema. The schema is based on draft-07 and supports customize configs.

## Install

` npm install js-json-schema-inferrer`

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

### ` StringOptions`

- `detectFormat: boolean` : if true, the inferrer can detect each string's format regexp

### `ObjectOptions`

- `required: boolean`: if true, make every property in the object required
- `allowAdditionalProperties: boolean`: ...
