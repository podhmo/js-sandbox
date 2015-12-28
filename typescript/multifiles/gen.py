# -*- coding:utf-8 -*-
import argparse
import glob
import json
import os.path


def main(args):
    data = json.load(args.base)
    data["files"] = map(os.path.basename, glob.glob(os.path.join(args.root, "*.ts")))
    data["compilerOptions"]["outDir"] = os.path.join("../../lib", os.path.basename(args.root))
    print(json.dumps(data, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("base", type=argparse.FileType("r"), default="./tsconfig.json")
    parser.add_argument("root")
    args = parser.parse_args()
    main(args)
