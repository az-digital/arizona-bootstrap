'use strict'

/* eslint-disable-next-line unicorn/no-anonymous-default-export */
module.exports = ctx => {
  return {
    map: ctx.file.dirname.includes('examples') ?
      false :
      {
        inline: false,
        annotation: true,
        sourcesContent: true
      },
    plugins: {
      autoprefixer: {
        cascade: false
      }
    }
  }
}
