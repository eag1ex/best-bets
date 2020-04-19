/**
	* {SportsBooksService}
	* Here we declare all our our RESt/Api calls
	* We use `config` a dynamic variable generated from webpack, `{config.apiUrl}` holds our base api
	*/
import config from 'config'
/// authorize to bypass access restrictions for local development with  `useServerInDev = 'REAL'; `
function isLocalDevelopment(requestOptions) {
    if (config.NODE_ENV === 'development') {
        requestOptions.headers.Authorization = 'localhost 234667788987334'
        return requestOptions
    } else {
        return requestOptions
    }
}

function getAll() {
    let requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }
    requestOptions = isLocalDevelopment(requestOptions)
    return fetch(`${config.apiUrl}/allSportsBooks`, requestOptions).then(handleResponse)
}

function handleResponse(data) {
    return data
        .json()
        .then(
            (d) => {
                if (d.msg) {
                    if (d.msg.indexOf('No token provided') !== -1) {
                        window.alert('session expired, please login in again.. ./login')
                    }
                }
                console.log(`-- handleResponse`)
                //		console.log(`--`, JSON.stringify(d, false, 1));
                console.log(`-- END`)
                const resp = d.response
                if (!d.success) {
                    if (d.status === 401) {
                        window.location.reload(true)
                    }
                    const error = (d && d.message) || d.statusText
                    return Promise.reject(error)
                }
                return resp
            },
            (err) => {
                return Promise.reject(err)
            }
        )
        .catch((err) => {
            console.log('handleResponse error->', err)
            return Promise.reject(err)
        })
}

export const SportsBooksService = {
    getAll
}
