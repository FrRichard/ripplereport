var keyMirror = require('keymirror');

module.exports = {

  ActionTypes: keyMirror({
    ASK_RIPPLEID: null,
    ASK_RIPPLELINES: null,
    ASK_RIPPLEINFOS: null,
    ASK_RIPPLEEXCHANGERATES:null,
    ASK_RIPPLEEXCHANGERATES_CAPITALIZATION:null,
    ASK_RIPPLEACCOUNTOVERVIEW:null,
    ASK_RIPPLECAPITALIZATION:null,
    ASK_RIPPLEOFFERSEXERCISED:null,
    ASK_RIPPLEOFFERSEXERCISED_SUM:null,
    ASK_RIPPLEACCOUNTTRANSACTIONS:null,
    ASK_RIPPLEACCOUNTTRANSACTIONSTATS:null,
    ASK_RIPPLEACCOUNTOFFERS:null,
    ASK_RIPPLEMARKETTRADERS:null,
    ASK_PAYMENTTRANSACTIONS:null,
    ASK_TRANSACTION:null,
    ASK_PYMNTLASTFETCH:null,
    ADD_WIDGET: null,
    REMOVE_WIDGET: null,
    ADDRESSCHANGE_PYMNTSTORE:null,
    ISLOADING: null,
    ISLOADING_ACCOUNTTRANSACTIONS: null,
    ISLOADING_PYMNTSTORE:null,
    LOADINGSTATUS_ACCOUNTTRANSACTIONS:null,
    TX_ISLOADING: null,
    WRONGADDRESS_ID:null,
    RIGHTADDRESS_ID:null,
    WRONGADDRESS_INFOS:null,
    RIGHTADDRESS_INFOS:null,
    // REAL TIME
    ASK_TRADE:null,
    // GRID
    REGISTER_CURRENTREFGRID: null,
    REGISTER_CURRENTGRID: null,
    REGISTER_CONF: null,
    GRID_LOADED: null,
    SET_GRID_TYPE: null,
    //DATAROOMS
    REGISTER_DATAROOMS:null,
    REGISTER_RIPPLEPAIRS:null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  })

};