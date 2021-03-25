module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
      '@babel/plugin-proposal-object-rest-spread',
      [
        '@babel/plugin-transform-spread',
        {
          loose: true
        }
      ]
    ]
  };
};
