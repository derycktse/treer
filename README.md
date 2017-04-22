## treer ##
Treer is a commandline tool to generate directory structure tree

## install ##

```
$ npm install treer -g
```

## usage ##

```
$ treer --help

  Usage: treer [options]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -d, --directory [dir]  Please specify a directory to generate structure tree
    -i, --ignore [ig]      You can ignore specific directory name
    -e, --export [epath]   export into file
```

## Available Options: ##
`-d` Specify a directory path to generate it's structure tree

`-i` or `--ignore` the directory name pattern to skip, it also support regex:

```
$ treer -i "/^regex$/"
```

`-e` or `--export` export into file

### example: ###
```
$ treer -e ./result.txt -i .git


treer
├─.DS_Store
├─.gitignore
├─README.md
├─package.json
├─result.txt
├─src
|  └index.js
├─node_modules
|      ├─graceful-readlink
|      |         ├─.npmignore
|      |         ├─.travis.yml
|      |         ├─LICENSE
|      |         ├─README.md
|      |         ├─index.js
|      |         └package.json
|      ├─commander
|      |     ├─History.md
|      |     ├─LICENSE
|      |     ├─Readme.md
|      |     ├─index.js
|      |     └package.json


The result has been saved into ./result.txt
```


