var Backbone = require('backbone');
var AbstractStore = require('AbstractStore');
var localstorage = require('localstorage');

class UserStore extends AbstractStore.Model {

    constructor() {
        super();
    }

    handleDispatch(payload) {
        switch (payload.actionType) {
            break;
        }
    }
}

module.exports = new UserStore();