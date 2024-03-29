const redis = require('redis');
const keys = require('./keys');

const client = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort
});
const sub = client.duplicate();

const fib = index => {
    if(index < 2) return 1;
    return fib(index - 1) + fib(index - 2);
}

(async () => {
    await sub.subscribe('insert', async message => {
        await client.hSet('values', message, fib(parseInt(parseInt)));
    })
})()