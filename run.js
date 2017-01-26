#!/usr/bin/env node
var program = require('commander')
var gremlin = require('gremlin')

var query = ""

program
    .option('-h, --host <host>', 'The gremlin server host', process.env.gremlin_server || 'localhost')
    .option('-p, --port <port>', 'The gremlin server port', process.env.gremlin_port || 8182)
    .option('-o, --output <output>', 'Use "raw", "toString" or "json"', "toString")
    .option('-v, --verbose', 'Verbose')
    .arguments('<query>').action(function(q) {
        query = q
    })
    .parse(process.argv);

if (program.verbose) {
    console.log("Connecting to gremlin server " + program.host + ":" + program.port + "...")
}
const client = gremlin.createClient(program.port, program.host, options={ path: '/gremlin' })

if (program.output === "toString") {
    query += ".map{it.get().toString()}"
}

if (program.verbose) {
    console.log("Running query \"" + query + "\"...")
}
client.execute(query, function(err, result) {
    if (err) {
        if (program.verbose) {
            console.error(err)
        }
        process.exit(1)
    } else {
        result.forEach(function(line){
            if (program.output === "json") {
                process.stdout.write(JSON.stringify(line) + "\n")
            } else {
                process.stdout.write(line + "\n")
            }
        })
        process.exit(0)
    }
})
