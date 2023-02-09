class Server {
    #app
    #server
    constructor(app) {
        this.#app = app
    }

    async conectar({ puerto = 0 }) {
        return new Promise((resolve, reject) => {
            this.#server = this.#app.listen(puerto, () => {
                resolve({ puerto })
            })
            this.#server.on('error', error => {
                reject(error)
            })
        })
    }

    async desconectar() {
        return new Promise((resolve, reject) => {
            this.#server.close(error => {
                if (error) {
                    reject(error)
                } else {
                    resolve(true)
                }
            })

        })
    }
}

exports.Server = Server;