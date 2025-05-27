const winston = require('winston');
const nodecache = require('node-cache');
const cache = new nodecache({stdTTL: 30});

function cacheRoute(req, res, next) {
  const key = req.originalUrl;
  if((new RegExp('.*\\.(css|js|png)$')).test(key)){
    if(cache.has(key)){
      return res.set('Content-Type','application/json').send(JSON.parse(cache.get(key)));
    }else{
      const originalSend = res.send;
      res.send = (body) => {
        cache.set(key, JSON.stringify(body));
        originalSend.call(res, body);
      };
      next();
    }
  }else{
    next();
  }
}

module.exports = cacheRoute;