var ipc = require('node-ipc');

const CONFIG_ID = 'adloader';
const QUERY = 'query';
const PING_FREQUENCY = 2000;


var pjson = require('./package.json');

class IPCClient {
    constructor() {
        ipc.config.id = CONFIG_ID;
        ipc.config.retry = 10000;
        ipc.config.silent = true;
        console.log(`Agent listening on ${ipc.config.id} and waiting a query request`)
        this.connect();
        setInterval(() => { this.sendPing() }, PING_FREQUENCY);
    }

    connect() {
        ipc.connectTo(CONFIG_ID, () => {
            ipc.of.adloader.on('connect', () => {
                console.log('connected');
                this.sendStatus();
            });
            ipc.of.adloader.on('disconnect', () => {
                console.log('disconnected from world');
            });
            ipc.of.adloader.on('query', (data) => {
                console.log("Get a message from adloader ", data)
            });
            ipc.of.adloader.on('error', (err) => {
                console.log("error : " + err);
            });
        });
    }

    sendStatus() {
        let msg = JSON.stringify({ type: 'status', data: { name: pjson.name, version: pjson.version } });
        ipc.of.adloader.emit(QUERY, msg)
    }

    sendPing() {
        let msg = JSON.stringify({ type: 'ping' });
        ipc.of.adloader.emit(QUERY, msg)
    }
}

var ev = new IPCClient();
module.exports = ev;



