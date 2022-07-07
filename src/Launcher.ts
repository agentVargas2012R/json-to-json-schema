import fs from 'fs';
import path from 'path';

const toJsonSchema = require('to-json-schema');

class Launcher {

    public static start() {
        Launcher.prompt();
    }

    static async prompt() {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        await readLine.question('Enter json file that is inside the input directory:\n', async (name: any) => {
            readLine.close();
            Launcher.run(name);
        })
    }

    static async run(input: string) {
        const content = await fs.readFile(path.join(__dirname, `../input/${input}`), 'utf8', function(err, data) {
            if(err) {
                console.log(err);
            }

            //TODO: convert to json schema file.
            const obj = JSON.parse(data);
            let schema: any = toJsonSchema(obj);
            const limit = input.indexOf(".");
            let name = input.substring(0, input.indexOf("."));
            schema.definitions = '' || {};
            schema.title = "Root";

            let nestedProperty = schema.properties[name];

            for(let prop in nestedProperty.properties) {
                nestedProperty.properties[prop].$id = `#root/${name}/${prop}`
                nestedProperty.properties[prop].title = '' || prop;
                nestedProperty.properties[prop].examples = [];
                nestedProperty.properties[prop].examples.push(obj[name][prop]);
                //console.log(nestedProperty.properties[prop]);
            }

            //console.log(JSON.stringify(schema));

            fs.writeFile(path.join(__dirname, `../dist/${input.substring(0, limit)}-schema.json`), `${JSON.stringify(schema)}`, function(err: any) {
                if(err) {
                    console.log(err);
                } else {
                    console.log("write file succeeded");
                }
            });
        });
    }
}

Launcher.start();
