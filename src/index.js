const program = require('commander')
const package = require('../package.json')
const fs = require('fs')

program
	.version(package.version)
	.option('-d, --directory [dir]', 'Please specify a directory to generate structure tree', '.')
	.parse(process.argv);


console.log(program.directory)


const dirToJson = (path) => {
	let stats = fs.lstatSync(path),

		structure = []

	if (stats.isDirectory()) {

		let dir = fs.readdirSync(path).map((child) => {
			return dirToJson(path + '/' + child)
		})
		let dirObj = {},
			dirName = path.replace(/.*\//g, '')
		dirObj[dirName] = dir
		structure.push(dirObj)
	} else {
		let fileName = path.replace(/.*\//g,'')
		structure.push(fileName.toString())
	}
	// console.log(structure)
	return structure
}

const characters = ['|', '|--']

const result = dirToJson(program.directory)
// console.log(JSON.stringify(result))
// console.log(result)


const drawDirTree = (data)=>{
	data.forEach((val,idx)=>{
		console.log( typeof val + ` ` + idx)
	})
}

drawDirTree(result)