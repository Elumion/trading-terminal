// JavaScript CORS Proxy
// Save this in a file like cors.js and run with `node cors [port]`
// It will listen for your requests on the port you pass in command line or port 8080 by default
export let port = process.argv.length > 2 ? parseInt(process.argv[2]) : 4289; // default
export function createCors() {
    require('cors-anywhere')
        .createServer()
        .listen(port, 'localhost', function () {
            console.log('Running CORS Anywhere on ' + 'localhost' + ':' + port);
        });
}
