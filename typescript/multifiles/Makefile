default:
	for i in src/*; do tsc -t es5 -m commonjs --noEmitOnError --moduleResolution node $$i/*.ts --outDir ./lib/`basename $$i`/; done
