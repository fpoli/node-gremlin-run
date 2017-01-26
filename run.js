#!/usr/bin/env node
var program = require('commander')
var gremlin = require('gremlin')

program
    .version('0.1.0')
    .arguments('<query>')
    .option('-h, --host <host>', 'The gremlin server host')
    .option('-p, --port <port>', 'The gremlin server port')
    .parse(process.argv);

const client = gremlin(
    program.port || process.env.gremlin_port || 8182,
    program.host || process.env.gremlin_server || 'localhost',
    options={ path: '/gremlin' }
)

client.execute('program.query', function(err, result) {
    if (err) {
        console.err(err)
        process.exit(1)
    } else {
        result.forEach(console.log)
    }
})
