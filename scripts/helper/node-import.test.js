const nodeImport = require('./node-import')

console.log(nodeImport === nodeImport.nodeImport)

nodeImport('imagemin')
  .then(async (imagemin) => {
    console.log(imagemin)
    await imagemin(['local/*.{jpg,png}'], {
      destination: 'build/local',
      plugins: [],
    })
    return
  })
  .catch((err) => {
    console.log(err)
  })
