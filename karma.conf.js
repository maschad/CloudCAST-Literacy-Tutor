module.exports = config => {
  config.set({
    frameworks: ['jasmine'],

    files: ['karma.entry.js'],

    preprocessors: {
      'karma.entry.js': ['webpack', 'sourcemap']
    },

    webpack: require('./webpack.config'),

    webpackServer: {
      noInfo: true
    },

    reporters: ['mocha'],

    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: false,

    browser: ['PhantomJS'],
    hostname: process.env.IP,
    port: process.env.PORT,
    runnerPort: 0
  });
};
