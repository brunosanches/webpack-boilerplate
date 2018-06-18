const SVGSpriter = require('svg-sprite')
const mkdirp = require('mkdirp')
const glob = require('glob')

const fs = require('fs')
const path = require('path')
const cwd = path.resolve('./src/assets/images/svgs')

const spriter = new SVGSpriter({
  dest: path.resolve('./src/assets'),
  mode: {
    css: {
      dest: 'stylesheets/abstracts',
      sprite: path.resolve('./src/assets/images/sprite.svg'),
      bust: false,
      render: {
        scss: {
          dest: '_sprite.scss',
          template: path.resolve('./utils/svg-sprite/tmpl/template.scss')
        }
      },
      variables: {
        png: () => (spriter, render) => render(spriter).split('.svg').join('.png'),
        backgroundsize: () => (spriteAndPath, render) => {
          const paths = render(spriteAndPath).split(',');
          return (paths[0] / paths[1]) * 100
        }
      },
      example: {
        dest: path.resolve('./utils/svg-sprite/preview-sprite-svg-scss.html')
      }
    }
  }
})

// Find SVG files recursively via `glob`
glob.glob('**/*.svg', { cwd: cwd }, function (err, files) {
  if (err) {
    console.log(err)
  }

  files.forEach(function (file) {
    spriter.add(
      path.resolve(path.join(cwd, file)),
      file,
      fs.readFileSync(path.join(cwd, file), { encoding: 'utf-8' })
    )
  })

  spriter.compile(function (error, result, data) {
    if (error) {
      console.log(error)
    }
    for (var type in result.css) {
      mkdirp.sync(path.dirname(result.css[type].path))
      fs.writeFileSync(result.css[type].path, result.css[type].contents)
    }
  })
})
