import { parse } from "marked";
import { readdir, readFile, writeFile, mkdir, access, constants, copyFile, rm } from "fs/promises";
import { join } from "path";
import { argv } from "process";

async function forEachFileRecursive(path, filter, func) {
    const dir = join("dist", path)
    try {
        await access(dir, constants.F_OK)
    }
    catch {
        await mkdir(dir)
    }
    const entries = await readdir(path, { withFileTypes: true });
    for (const p of entries) {
        if (p.isDirectory()) {
            await forEachFileRecursive(join(path, p.name), filter, func)
        }
        else if (p.name.endsWith(filter)) {
            await func(join(path, p.name))
        }
    }
}

async function main(path, output) {
    const pages = join(output, path)
    try {
        await access(pages, constants.F_OK)
        await rm(pages, { recursive: true, force: true })
    }
    catch {
    }

    await forEachFileRecursive(path, ".md", async path => {
        const outputPath = join(output, path + ".html")
        console.log(`Converting ${path} to ${outputPath}`)
        const content = await readFile(path, "utf8")
        const html = await parse(content)
        await writeFile(outputPath, html)
    })
    await forEachFileRecursive(path, ".png", async path => {
        const outputPath = join(output, path)
        console.log(`Copying ${path} to ${outputPath}`)
        await copyFile(path, outputPath)
    })
    let dir = {}
    await forEachFileRecursive(path, ".md", async path => {
        const split = path.split('/')
        let tmp = dir
        for (let l of split) {
            if (l.endsWith(".md")) {
                tmp[l.split('.')[0]] = path + ".html"
            }
            else {
                if (!tmp[l]) {
                    tmp[l] = {}
                }
                tmp = tmp[l]
            }
        }
    })
    await writeFile(join(output, "dir.js"), "const dir = JSON.parse('" + JSON.stringify(dir.pages) + "')")
}


if (process.argv.length <= 3) {
    console.log("Recursively converts all markdown files in a directory to HTML. Usage: node build PATH_TO_PAGES OUTPUT")
}
else {
    await main(argv[2], argv[3])
}