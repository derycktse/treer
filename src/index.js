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
		let dirName = path.replace(/.*\/(?!$)/g, '')
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


const drawDirTree = (data, placeholder) =>{

	let {
		border,
		contain,
		line,
		last
	} = characters
//     placeholder = placeholder.replace(new RegExp(`\\${contain}${line}`,"g"), border+ " ")
//     placeholder = placeholder.replace(new RegExp(`${line}`,"g"), "  ")
	for (let i in data) {

		if (typeof data[i] === 'string') {
			console.log(placeholder + data[i])
		} else if (Array.isArray(data[i])) {
// 			let pl = placeholder !== contain ? placeholder.replace(/\s+\|$/, "") + characters["line"] : ""
//             let pl = placeholder !== contain ? placeholder : ""
            
// 			console.log(placeholder.replace(new RegExp(` +${contain}${line}$`,""), "") + i)
            console.log(placeholder +i)
			placeholder = placeholder.replace(new RegExp(`${contain}`,"g"), border)
			placeholder = placeholder.replace(new RegExp(`${line}`,"g"), " ")

			placeholder = placeholder+ Array(Math.ceil(i.length/2)).join(" ")+ contain+line 

// 			console.log(placeholder + i)
			placeholder = placeholder.replace( new RegExp("^ +",'g'),"") 
			data[i].forEach((val, idx, arr) => {
                let pl = placeholder
                //if the idx is the last one, change the character
                if(idx === (arr.length-1) ){
                    let regex = new RegExp(`${contain}${line}$`,"g")
                     
                  pl =   placeholder.replace(regex, last)
                }

				if (typeof val === 'string') {
// 				    placeholder =  Array(i.length).join(" ") + placeholder + characters["line"]
//                     placeholder = placeholder.replace(new RegExp(``,"g"), "")
					console.log(pl + val)
				} else {
					// console.log(i)
//                     for(let j in val){
//                         console.log(placeholder + j)
//                     }
// 					let regx = new RegExp(`(${contain})|(${line})|${last}|\\${border}`, "g")
//                     let regx = new RegExp(``)
					let pl = placeholder
					drawDirTree(val, pl)

				}
			})
		}
	}
}


drawDirTree(result, "")
// console.log(characters["last"] + characters["line"])


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