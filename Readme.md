Gremlin-run
===========

Execute a single Gemlin query from the command line, without truncating the output.


Install
-------

	npm install -g gremlin-run


Examples
--------

Basic usage

	gremlin-run "g.V().label().dedup()"
	gremlin-run "g.V().label().dedup()" --output json
	gremlin-run "g.V().label().dedup()" --output raw --verbose

Specify gremlin server using command line arguments

	gremlin-run --port 8182 --host 127.0.0.1 "g.V().label().dedup()"

Specify gremlin server using environment variables

	export gremlin_port=8182
	export gremlin_host=127.0.0.1
	gremlin-run "g.V().label().dedup()"


Usage
-----

	gremlin-run [--host <host>] [--port <port>] <gremlin-query>
