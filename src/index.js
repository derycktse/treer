#!/usr/bin/env node

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
		let dirName = path.replace(/.*\//g, '')
		structure[dirName] = sortDir(dir)
	} else {
		let fileName = path.replace(/.*\//g, '')
		return fileName
	}
	return structure
}

// const characters = ['|', '|--', '├', '──','└─']


const result = dirToJson(program.directory)
console.log(JSON.stringify(result))
	// console.log(result)
const characters = {
	border: '|',
	contain: '├',
	line: '─',
	last: '└'
}


const drawDirTree = (data, placeholder) => {

	let {
		border,
		contain,
		line,
		last
	} = characters

	for (let i in data) {
		if (typeof data[i] === 'string') {
			console.log(placeholder + data[i])
		} else if (Array.isArray(data[i])) {
			let pl = placeholder !== "|" ? placeholder.replace(/\s+\|$/, "") + characters["line"] : ""
			console.log(pl + i)
			data[i].forEach((val, idx, arr) => {

				//if the idx is the last one, change the character
				if (idx === (arr.length - 1)) {
					let regex = new RegExp(`${contain}$`, "g")
					placeholder = placeholder.replace(regex, last)
				}

				if (typeof val === 'string') {
					console.log(placeholder + characters["line"] + val)
				} else {
					// console.log(i)

					let regx = new RegExp(`(${contain})|(${line})|${last}`, "g")
					drawDirTree(val, placeholder.replace(regx, " ") + Array(i.length).join(" ") + characters["contain"])

				}
			})
		}
	}
}


drawDirTree(result, characters['border'])
console.log(characters["last"] + characters["line"])


function sortDir(arr) {
	let i = arr.length - 1
	while (i >= 0) {
		if (typeof arr[i] === 'object') {
			let obj = arr.splice(i, 1)
			arr.push(obj[0])

		}
		i--
	}
	return arr
}