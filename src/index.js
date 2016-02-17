'use strict';
import request from 'request';

/**
 * Template of the jsonrpc request
 * @param config - object of configuration for the reqest
 * @param config.host - host of the receiver
 * @param config.gateway - gateway for the request
 * @param method - json rpc method
 * @param params - object of params for the request
 * @returns {Promise}
 */
const  jsonRPCrequest =  (config, method, params) => {
    return new Promise((resolve, reject)=> {
        request({
            url: 'http://' + config.gateway,
            method: 'POST',
            json: true,
            body: {
                "jsonrpc" : "2.0",
                "id" : "1",
                "method" : method,
                "params" : params
            },
            headers: {
                'Host':         config.host,
                'Content-Type': 'application/json-rpc'
            }
        }, (err, httpResponse, body)=> {
            if (err) {
                reject(err);
            } else {
                resolve(body)
            }
        });
    })
};

/**
 * Basic json rpc request where host is same as gateway
 * @param host - http adress of the interface host
 * @param method - json rpc method
 * @param params - object of params for the request
 */
const requestRpc = (host, method, params)=>{
    return jsonRPCrequest({
        gateway: host,
        host: host
    }, method, params)
};

/**
 * Extends classic request, make available to reuqest by gateway
 * @param host - http adress of the interface host
 * @param gateway - gateway of the receiver
 * @param method - json rpc method
 * @param params - object of params for the request
 */
const routedRequestRpc = (host, gateway, method, params)=>{
    return jsonRPCrequest({
        gateway: gateway,
        host: host
    }, method, params)
};

export default {
    requestRpc : requestRpc,
    routedRequestRpc : routedRequestRpc
};




