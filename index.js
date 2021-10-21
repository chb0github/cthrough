const days = (num) => (key, entry) => Date.now() - entry.last > (24 * 60 * 60 * 1000 * num);
const hours = (num) => (key, entry) => Date.now() - entry.last > (60 * 60 * 1000 * num);
const minutes = (num) => (key, entry) => Date.now() - entry.last > (60 * 1000 * num);
const seconds = (num) => (key, entry) => Date.now() - entry.last > (1000 * num);
const count = (num) => (key, entry) => entry.callCount >= num;

const copy = (o) => Object.freeze({ ...o });

const prune = (cache, evict) => Object.entries(cache)
    .filter(([args, entry]) => evict(copy(args), copy(entry), copy(cache)))
    .forEach(([args, _]) => delete cache[args]);

const cache = (f, evict = minutes(1), pruneInterval = 1000 * 60 * 5) => {
    const c = {};

    setInterval(prune, pruneInterval, c, evict);

    return (...args) => {
        const entry = c.hasOwnProperty(args) && c[args];

        if (!entry || evict(copy(args), copy(entry), copy(c))) {
            c[args] = {
                value: f(...args),
                first: Date.now(),
                last: Date.now(),
                callCount: 1,
            };
        } else {
            entry.last = Date.now();
            entry.callCount++;
        }
        return c[args].value;
    };
};

module.exports = {
    cache,
    days,
    hours,
    minutes,
    seconds,
    count,
};
