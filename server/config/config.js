/**
   * Config var for app
   **/
module.exports = {
  localMongoDBUrl: 'mongodb://localhost:27017/webstormtroopers',
  //localMongoDBUrl: 'mongodb://unluckygeniuses:password@ds137891.mlab.com:37891/unluckygeniuses',
  mongoLabUrl: 'mongodb://unluckygeniuses:password@ds137891.mlab.com:37891/unluckygeniuses',
  port: process.env.PORT || 8080,
  secret: process.env.SECRET || 'mysecret',
};
