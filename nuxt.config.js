export default {
  generate: {
    fallback: true,
  },
  ssr: false,
  env: {
    baseUrl: process.env.API_URL || "http://localhost:3333",
    QAO_TOKEN_ADDRESS: process.env.QAO_TOKEN_ADDRESS,
    QAO_VOTING_ENGINE_ADDRESS: process.env.QAO_VOTING_ENGINE_ADDRESS,
    NETWORK: process.env.NETWORK,
    INFURA_PROJECT_ID: process.env.INFURA_PROJECT_ID,
  },
  server: {
    port: process.env.PORT || 3333,
    host: process.env.HOST || "localhost",
    timing: false,
  },
  head: {
    titleTemplate: "%s",
    title: "DAO",
    meta: [
      {
        charset: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        hid: "description",
        name: "description",
        content:
          "*** is the token of *** API. Voting/staking mechanisms to incentivise long term loyalty to the protocol.",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "DAO",
      },
      {
        hid: "og:description",
        property: "og:description",
        content:
          "Write your own content. Voting/staking mechanisms to incentivise long term loyalty to the protocol.",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800",
      },
      {
        rel: "stylesheet",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css",
      },
    ],
    bodyAttrs: {
      class: "sidebar-mini", // delete the class to have the sidebar expanded by default. Add `white-content` class here to enable "white" mode.
    },
  },
  router: {
    linkExactActiveClass: "active",
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [
    "assets/css/demo.css",
    "assets/css/nucleo-icons.css",
    "assets/sass/black-dashboard-pro.scss",
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    `~/plugins/dashboard-plugin.js`,
    "~/plugins/web3modal.js",
    "~/plugins/sweetalert2.js",
    "~/plugins/filters.js",
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/pwa", "@nuxtjs/svg", "@nuxtjs/axios", "nuxt-i18n"],
  i18n: {
    locales: [
      {
        code: "en",
        file: "en.js",
      },
    ],
    lazy: true,
    langDir: "lang/",
    defaultLocale: "en",
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL || "http://localhost:3000",
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: "DAO. Write your own project name",
      short_name: "Write your short name",
      lang: "en",
      theme_color: "#4c0060",
    },
    meta: {
      theme_color: "#4c0060",
    },
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [/^element-ui/],
    extend(config, ctx) {
      // eslint-disable-next-line no-unused-expressions
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
        },
      });
    },
    babel: {
      plugins: [
        [
          "component",
          {
            libraryName: "element-ui",
            styleLibraryName: "theme-chalk",
          },
        ],
      ],
    },
  },
};
