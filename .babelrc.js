module.exports = {
  plugins: [
    require(`@babel/plugin-transform-runtime`),
    require(`@babel/plugin-proposal-class-properties`),
    require(`@babel/plugin-transform-object-assign`),
    require(`@babel/plugin-proposal-object-rest-spread`),
    require(`@babel/plugin-proposal-export-namespace-from`)
  ],
  presets: [
    require(`@babel/preset-typescript`),
    [
      require(`@babel/preset-env`),
      { targets: { node: true }, useBuiltIns: `usage`, corejs: 3 }
    ]
  ],
  env: {
    test: {
      sourceMaps: `inline`,
      plugins: [require(`@babel/plugin-transform-runtime`)],
      presets: [
        [
          require(`@babel/preset-env`),
          {
            targets: { node: true },
            modules: `commonjs`,
            useBuiltIns: `usage`,
            corejs: 3
          }
        ]
      ]
    }
  }
}
