const bunyan = require('bunyan');
const jaeger = require('jaeger-client');
const UDPSender = require('jaeger-client/dist/src/reporters/udp_sender').default;

module.exports = (appCfg) => {
  const logger = bunyan.createLogger({
    name: 'yaw',
    stream: process.stdout,
    level: appCfg.logger.level,
  });

  // const sampler = new jaeger.RateLimitingSampler(1);
  const reporter = new jaeger.RemoteReporter(new UDPSender({ host: '10.8.0.2', logger }));
  /*
    const tracer = new jaeger.Tracer('yaw', reporter, sampler, {
      tags: { 'yaw.version': '1.0.0' },
      logger,
    });
  */
  const tracer = jaeger.initTracer({
    serviceName: 'yaw',
    sampler: {
      type: 'ratelimiting',
      param: 10,
      host: '10.8.0.2',
      port: 5778,
    },
    reporter: {
      agentHost: '10.8.0.2',
    },
  }, {
    tags: { 'yaw.version': '1.0.0' },
    reporter,
    logger,
  });

  return {
    logger,
    tracer,
  };
};
