module.exports = (api) => {
    return {
        plugins: [
            // '@babel/plugin-proposal-nullish-coalescing-operator',
            // '@babel/plugin-proposal-optional-chaining',
        ],
        presets: [
            [
                '@babel/preset-env',
            {
            useBuiltIns: "entry",
            "corejs": "3.1.3",
            targets: api.caller(caller => caller && caller.target === "node")
              ? { node: "current" }
              : { chrome: "58", ie: "11" }
          }
        ]
      ]
    }
}
