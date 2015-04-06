var fs = require('fs');

function OfflineApiProxy(params) {
    this.app = params.app;
    this.dataPath = params.dataPath;
};

OfflineApiProxy.prototype.init = function(callback) {
    var self = this;

    this.app.post('/api/trade/volume', function(req, res) {
        self.tradesService(req, res);
    });

    this.app.all('/api/*', function(req, res) {
        res.send(418, '{"status":"I am a teapot"}');
    });

};

OfflineApiProxy.prototype.tradesService = function(req, res) {
    var params = req.body;
    fs.readFile(this.dataPath + 'trades.json', 'utf8', function(err, trades) {
        res.send(200, trades);
    });
};

module.exports = OfflineApiProxy;