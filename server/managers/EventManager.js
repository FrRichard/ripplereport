var util = require('util');
var events = require("events");

var EventManager = function EventManager() {
    events.EventEmitter.call(this);
    if (EventManager.caller != EventManager.getInstance) {
        throw new Error("This object cannot be instanciated");
    }
};

EventManager.instance = null;

util.inherits(EventManager, events.EventEmitter);

EventManager.getInstance = function() {
    if (this.instance === null) {
        this.instance = new EventManager();
    }
    return this.instance;
};

module.exports = EventManager.getInstance();