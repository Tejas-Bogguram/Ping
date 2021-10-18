var ping = require ("net-ping");
const os = require('os');

const interfaces = os.networkInterfaces();

sourceIP = interfaces["lo"][0]["address"];

var options = {
    networkProtocol: ping.NetworkProtocol.IPv4,
    packetSize: 64,
    retries: 0,
    sessionId: (process.pid % 65535),
    timeout: 2000,
    ttl: 128
};

var session = ping.createSession (options);

var targets = ["1.1.1.1", "2.2.2.2", "3.3.3.3"];

for (var i = 0; i < targets.length; i++) {
    session.pingHost (targets[i], function (error, target, sent, rcvd, ttl) {
   	
   	var ms = rcvd - sent;
    if (error) {
        if (error instanceof ping.TimeExceededError) {
            console.log ("source: "+sourceIP+" target: "+target + " error:" + error.toString () + " start time: "+sent+" duration: "+ms+"ms packet size: "+options["packetSize"]+"bytes pass/fail: 0");
        } else {
            console.log ("source: "+sourceIP+" target: "+target + " error:" + error.toString () + " start time: "+sent+" duration: "+ms+"ms packet size: "+options["packetSize"]+"bytes pass/fail: 0");
        }
    } else {
         console.log ("source: "+sourceIP+" target: "+target+ " start time: "+sent+" duration: "+ms+"ms packet size: "+options["packetSize"]+"bytes pass/fail: 0");
    }
});
}

