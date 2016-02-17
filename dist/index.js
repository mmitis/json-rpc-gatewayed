'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jsonRPCrequest = function jsonRPCrequest(config, method, params) {
    return new Promise(function (resolve, reject) {
        (0, _request2.default)({
            url: 'http://' + config.gateway,
            method: 'POST',
            json: true,
            body: {
                "jsonrpc": "2.0",
                "id": "1",
                "method": method,
                "params": params
            },
            headers: {
                'Host': config.host,
                'Content-Type': 'application/json-rpc'
            }
        }, function (err, httpResponse, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        });
    });
};

var requestRpc = function requestRpc(host, method, params) {
    return jsonRPCrequest({
        gateway: host,
        host: host
    }, method, params);
};
var routedRequestRpc = function routedRequestRpc(host, gateway, method, params) {
    return jsonRPCrequest({
        gateway: gateway,
        host: host
    }, method, params);
};
exports.default = {
    requestRpc: requestRpc,
    routedRequestRpc: routedRequestRpc
};