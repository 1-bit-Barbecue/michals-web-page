import { parse } from "marked";
import { readdir, readFile, writeFile, mkdir, access, constants, copyFile } from "fs/promises";
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
    entries
        .filter(entry => !entry.isDirectory() && entry.name.endsWith(filter))
        .forEach(f => func(join(path, f.name)))
    entries
        .filter(entry => entry.isDirectory())
        .forEach(async d => forEachFileRecursive(join(path, d.name), filter, func))
}

async function converMarkdownToHtml(path) {
    const outputPath = join("dist", path+".html")
    console.log(`Converting ${path} to ${outputPath}`)
    const content = await readFile(path, "utf8")
    const html = await parse(content)
    await writeFile(outputPath, html, )
}

if (process.argv.length <= 3) {
    console.log("Recursively converts all markdown files in a directory to HTML. Usage: node build PATH_TO_PAGES OUTPUT")
}
else {
    forEachFileRecursive(argv[2], ".md", async path => {
        const outputPath = join(argv[3], path+".html")
        console.log(`Converting ${path} to ${outputPath}`)
        const content = await readFile(path, "utf8")
        const html = await parse(content)
        await writeFile(outputPath, html)
    })
    forEachFileRecursive(argv[2], ".png", async path => {
        const outputPath = join(argv[3], path)
        console.log(`Copying ${path} to ${outputPath}`)
        await copyFile(path, outputPath)
    })
    await copyFile(join(argv[2], "dir.js"), join(argv[3], "dir.js"))
}