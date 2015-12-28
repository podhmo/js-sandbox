FILE ?= "src/*"

default:
	for i in ${FILE}; do tsc -t es5 -m commonjs --noImplicitAny --noEmitOnError --moduleResolution node $$i/*.ts --outDir ./lib/`basename $$i`/; done
