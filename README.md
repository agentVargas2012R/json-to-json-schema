#JSON-TO-JSONSCHEMA

### Convert json to json-schema quickly. Use this tool to generate your models quickly so that you can focus on the bigger stuff.

## Quick Setup

```aidl
npm install
```

## Drop Sample JSON File into the input directory

```aidl
npm start
```

### The generated Json Schema will exist in the dist folder

```javascript
{
    "type": "object",
    "properties": {
        "employee": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "$id": "#root/employee/name",
                    "title": "name",
                    "examples": ["sonoo"]
                },
                "salary": {
                    "type": "integer",
                    "$id": "#root/employee/salary",
                    "title": "salary",
                    "examples": [56000]
                },
                "married": {
                    "type": "boolean",
                    "$id": "#root/employee/married",
                    "title": "married",
                    "examples": [true]
                }
            }
        }
    },
    "definitions": {},
    "title": "Root"
}
```