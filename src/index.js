const program = require('commander')
const package = require('../package.json')
const fs = require('fs')

program
	.version(package.version)
	.option('-d, --directory [dir]', 'Please specify a directory to generate structure tree', process.cwd())
	.parse(process.argv);


console.log(program.directory)


const dirToJson = (path) => {
	let stats = fs.lstatSync(path),

		structure = {}

	if (stats.isDirectory()) {
		let dir = fs.readdirSync(path).map((child) => {
			let childStats = fs.lstatSync(path + '/' + child)
			return childStats.isDirectory() ? dirToJson(path + '/' + child) : child
		})
		let dirObj = {},
			dirName = path.replace(/.*\//g, '')
		structure[dirName] = dir
	} else {
		let fileName = path.replace(/.*\//g, '')
		return fileName
	}
	return structure
}

const characters = ['|', '|--']

const result = dirToJson(program.directory)
	// console.log(JSON.stringify(result))
	// console.log(result)


const drawDirTree = (data, placeholder) => {
	for (let i in data) {
		if (typeof data[i] === 'string') {
			console.log(placeholder + data[i])
		} else if (Array.isArray(data[i])) {
			data[i].forEach((val) => {
				if (typeof val === 'string') {
					console.log(placeholder+"--" + val)
				} else {
					drawDirTree(val, placeholder.replace("--", "  ") + Array(i.length).join(" ") + "|--")

				}
			})
		}
	}
}

drawDirTree(result, "|")