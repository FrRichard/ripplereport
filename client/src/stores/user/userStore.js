var Backbone = require('backbone');
var AbstractStore = require('AbstractStore');
var localstorage = require('localstorage');

class UserStore extends AbstractStore.Model {

    constructor() {
        super();
    }

    handleDispatch(payload) {
        switch (payload.actionType) {
            // case constants.USER_LOADED:
            // this.reset();
            // this.(payload.user);
            break;
        }
    }
}

module.exports = new UserStore();