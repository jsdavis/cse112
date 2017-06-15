/**
   * Config var for app
   **/
module.exports = {
  mongoUri: process.env.NODE_ENV === 'test' ?
    // Test database
    'mongodb://unluckygeniuses:password@ds151951.mlab.com:51951/unluckygeniuses-test/' :

    // Production database
    'mongodb://unluckygeniuses:password@ds137891.mlab.com:37891/unluckygeniuses/',
  port: process.env.PORT || 8080,
  secret: process.env.SECRET || 'mysecret',
  mailer: {
    auth: {
      user: 'unluckygeniusesoneform',
      pass: 'wearegeniuses',
    },
    defaultFromAddress: 'Oneform <test@examle.com>',
  },
};
