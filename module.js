class messageModule {
    constructor(timer, count) {
        this.timer = timer;
        this.count = count;
        this._flagTime = false;
        this._timeoutId = null,
        this.store = [];
    }

    isQuantityOver() {
        return !!(this.store.length > this.count)
    }

    createTimer() {
        if (!this._flagTime) {
            this._timeoutId = setTimeout(() => this.sendMessage('TIMER'), this.timer)
        }
    }

    sendMessage(place) {
        this.store = []
        this._flagTime = false;
        clearTimeout(this._timeoutId);
        this._timeoutId = null;
        console.log(`======= Сообщения удалены из ${place}========>`, this.store)
    }

    pushMessage(message) {
        console.log('======= Сообщение получено ! ========>', message);
        if (!this.store.length) this.createTimer();
        if (this.isQuantityOver()) {
            this.sendMessage('COUNT');
            return
        }

        this.store = [...this.store, message]
    }

}


const timer = 5 * 1000;
const count = 10;
const testMessage = () => ({
    id: Math.random(),
    title: `Тестовое Сообщение`,
    text: 'Привет МИР!',
});

const testModule = new messageModule(timer, count);

setInterval(() => testModule.pushMessage(testMessage()), 1000);

