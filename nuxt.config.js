const pkg = require('./package')


const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: "Ekko Matchup Wiki",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
      {
        rel: 'stylesheet',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'
      }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    '~/assets/style/app.styl'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    ['nuxt-fire', {
      useOnly: ['firestore', 'auth'],
      config: {
        development: {
          apiKey: "AIzaSyBQpnSI_WtiXXHRrm0r1x5HF2io3RtNIyE",
          authDomain: "ekkowiki.firebaseapp.com",
          databaseURL: "https://ekkowiki.firebaseio.com",
          projectId: "ekkowiki",
          storageBucket: "ekkowiki.appspot.com",
          messagingSenderId: "375565092375"
        },
        production: {
          apiKey: "AIzaSyBQpnSI_WtiXXHRrm0r1x5HF2io3RtNIyE",
          authDomain: "ekkowiki.firebaseapp.com",
          databaseURL: "https://ekkowiki.firebaseio.com",
          projectId: "ekkowiki",
          storageBucket: "ekkowiki.appspot.com",
          messagingSenderId: "375565092375"
        }
      }
    }],
    '@nuxtjs/toast'
  ],
  toast: {
    position: 'top-center'
  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    transpile: ['vuetify/lib'],
    plugins: [new VuetifyLoaderPlugin()],
    loaders: {
      stylus: {
        import: ["~assets/style/variables.styl"]
      }
    },
    
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      
    }
  }
}
