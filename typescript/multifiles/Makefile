FILE ?= "src/*"

default:
	for i in src/*; do echo $$i; python ./gen.py ./tsconfig.json $$i > $$i/tsconfig.json && tsc -p $$i; done

oldFashioned:
	for i in ${FILE}; do tsc -t es5 -m commonjs --noImplicitAny --noEmitOnError --moduleResolution node $$i/*.ts --outDir ./lib/`basename $$i`/; done
