async function openPage(path) {
    const { origin } = URL.parse(document.URL)
    const response = await fetch(`./pages/${path}`)
    const md = await response.text()
    document.getElementById("content").innerHTML = parse(md, {});
}

async function generateSection(name, indent, sections) {
    let buttons = ""
    for (let section in sections) {
        if (typeof sections[section] === 'string') {
            buttons += `
                <div class="menu-button button" id="side-menu-${section}" style="margin-left: ${indent}em" onClick="openPage('${sections[section]}')">
                    <div class="side-menu-text">
                        ${section}
                    </div>
                </div>
            `;
        }
        else {
            buttons += await generateSection(section, indent + 1, sections[section])
        }
    }
    return `
        <div class="side-menu-buttons" id="side-menu-buttons">
            <div style="margin-left: ${indent-1}em">${name}</div>
            ${buttons}
        </div>
    `;
}

async function openSection(sections) {
    document.getElementById('side-menu-content').innerHTML = await generateSection("", 0, sections)
    if(document.getElementById('side-menu').classList.contains('hide-horizontal')) {
        toggleSideMenu()
    }
    await openPage(sections['Home'])
}

async function loadStructure() {
    const response = await fetch(`./pages/dir.json`)
    const dir = JSON.parse(await response.text())

    let buttons = ""
    for (let section in dir) {
        buttons += `
                <div class="menu-button button" id="top-menu-${section}">
                    <div class="top-menu-text">
                        ${section}
                    </div>
                </div>
                `;
    }
    document.getElementById('top-menu-buttons').style.gridTemplateColumns=`repeat(${Object.keys(dir).length}, 1fr)`
    document.getElementById('top-menu-buttons').innerHTML = buttons

    for (let section in dir) {
        document.getElementById(`top-menu-${section}`).addEventListener('click', async e => await openSection(dir[section]))
    }

    openSection(dir.Home)
}

function toggleSideMenu() {
    document.getElementById('side-menu').classList.toggle('hide-horizontal')
    document.getElementById('main').classList.toggle('expand-horizontal')
    document.getElementById('side-menu-control-arrow').classList.toggle('flip-horizontal')
}

function toggleTopMenu() {
    document.getElementById('side-menu').classList.toggle('extend-vertical')
    document.getElementById('top-menu').classList.toggle('hide-vertical')
    document.getElementById('main').classList.toggle('expand-vertical')
    document.getElementById('top-menu-control-arrow').classList.toggle('flip-vertical')
}

async function main() {
    await loadStructure()

    {
        document.getElementById('side-menu-control')?.addEventListener('click', toggleSideMenu)
    }
    {
        document.getElementById('top-menu-control')?.addEventListener('click', toggleTopMenu)
    }
}

main()