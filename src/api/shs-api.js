import Zeroconf from 'react-native-zeroconf'



class SHS {
    constructor(host) {
        this.host = host;
        this.registryCache = {};
    }

    addRoom(title, devices = []) {
        return fetch(this.host + '/api/rooms', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                devices: devices
            })
        }).then(r => {
            if (r.headers.get('content-type').includes('application/json'))
                return r.json();
            else return { error: "PARSING_ERROR" };
        });
    }

    updateRoom(id, updatedRoom) {
        return fetch(this.host + '/api/rooms/' + id, {
            method: 'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedRoom)
        }).then(r => {
            if (r.headers.get('content-type').includes('application/json'))
                return r.json();
            else return { error: "PARSING_ERROR" };
        })
    }

    getRoom(id) {
        return fetch(this.host + '/api/rooms/' + id, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(r => {
            if (r.headers.get('content-type').includes('application/json'))
                return r.json();
            else return { error: "PARSING_ERROR" };
        })
    }

    getAllRooms() {
        return fetch(this.host + '/api/rooms', {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(r => {
            if (r.headers.get('content-type').includes('application/json'))
                return r.json();
            else return { error: "PARSING_ERROR" };
        });
    }

    getRoomDevices(roomId) {
        return fetch(`${this.host}/api/rooms/${roomId}/devices`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(r => {
            if (r.headers.get('content-type').includes('application/json'))
                return r.json();
            else return { error: "PARSING_ERROR" };
        });
    }

    getModelInfo(modelNumber) {
        if (this.registryCache[modelNumber]) return Promise.resolve(this.registryCache[modelNumber]);
        return fetch(this.host + '/api/registry/' + modelNumber, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(r => {
            if (r.headers.get('content-type').includes('application/json'))
                return r.json();
            else return { error: "PARSING_ERROR" };
        });
    }

    addDevice(roomId, modelNumber, deviceId, baseAddress, givenName) {
        const body = {
            id: deviceId, modelNumber: modelNumber, baseAddress: baseAddress, givenName: givenName
        }
        return fetch(`${this.host}/api/rooms/${roomId}/devices`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(r => {
            if (r.headers.get('content-type').includes('application/json'))
                return r.json();
            else return { error: "PARSING_ERROR" };

        });

    }
    // updateDevice(){

    // }

    getDeviceState(roomId, deviceId) {
        return fetch(`${this.host}/api/rooms/${roomId}/devices/${deviceId}/state`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(r => {
            if (r.headers.get('content-type').includes('application/json'))
                return r.json();
            return { error: "PARSING_ERROR" };
        });
    }

    setDeviceProperty(roomId, deviceId, propertyId, value) {
        return fetch(`${this.host}/api/rooms/${roomId}/devices/${deviceId}/state/${propertyId}`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ value: value })
        }).then(r => {
            if (r.headers.get('content-type').includes('application/json'))
                return r.json();
            return { error: "PARSING_ERROR" };
        });
    }
}
const api = new SHS('http://192.168.1.3:3000');

const zeroconf = new Zeroconf();
zeroconf.on('resolved', service => {
    if (service.host === 'shs-gateway') {
        console.log('found service!');
        api.host = 'http://' + service.addresses[0] + ':' + service.port;
        zeroconf.stop()
    }
    console.log(service)
})
zeroconf.scan('http', 'tcp');

setTimeout(() => {
    zeroconf.stop();
}, 30000)
export default api;