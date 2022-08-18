const redis = require('redis');

const client = redis.createClient({
    host: 'redis-server',
    port: 6379
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