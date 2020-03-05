module.exports = {
  sourceMaps: true,
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
          actions: './src/actions',
          config: './config',
          extensions: './src/extensions',
          predicates: './src/predicates',
          types: './src/types'
        }
      }
    ]
  ]
};
