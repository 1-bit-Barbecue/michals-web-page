async function openPage(path) {
    const response = await fetch(path)
    document.getElementById("content").innerHTML = await response.text();
}

async function trimNumbering(name) {
    return name.substring(name.indexOf('_') + 1).replace("_", " ")
}

async function generateSection(name, path, indent, sections) {
    let buttons = ""
    for (let section in sections) {
        if (typeof sections[section] === 'string') {
            buttons += `
                <div class="menu-button button" id="side-menu-${section}" style="margin-left: ${indent}em" onClick="openPage('${sections[section]}')">
                    <div class="side-menu-text">
                        ${await trimNumbering(section)}
                    </div>
                </div>
            `;
        }
        else {
            buttons += await generateSection(section, `${path}-${name}`, indent + 1, sections[section])
        }
    }
    const id = `side-menu-buttons-${path}-${name}`
    let res = ""
    if (name) {
        res = `
        <div class="side-menu-text" style="margin-left: ${indent - 1}em"  onclick="toggleSection('${id}')">
            <svg viewBox="0,0,40,20" xmlns="http://www.w3.org/2000/svg" id="${id}-arrow" class="menu-control">
                <path d="M3 3 L20 17 L37 3" class="menu-glyph" />
            </svg>
            <b>${await trimNumbering(name)}</b>
        </div>
    `;
    }
    return res + `
        <div class="side-menu-buttons" id="${id}">
            ${buttons}
        </div>
    `;
}

async function openSection(sections) {
    document.getElementById('side-menu-content').innerHTML = await generateSection("", "", 0, sections)
    if (Object.keys(sections).length < 2) {
        if (!(await isSideMenuHidden())) {
            toggleSideMenu()
        }
    }
    else {
        if (await isSideMenuHidden()) {
            toggleSideMenu()
        }
    }
    await openPage(sections[Object.keys(sections)[0]])
}

async function loadStructure() {
    let buttons = ""
    for (let section in dir) {
        buttons += `
                <div class="menu-button button" id="top-menu-${section}">
                    <div class="top-menu-text">
                        ${await trimNumbering(section)}
                    </div>
                </div>
                `;
    }
    document.getElementById('top-menu-buttons').style.gridTemplateColumns = `repeat(${Object.keys(dir).length}, 1fr)`
    document.getElementById('top-menu-buttons').innerHTML = buttons

    for (let section in dir) {
        document.getElementById(`top-menu-${section}`).addEventListener('click', async e => await openSection(dir[section]))
    }

    if (localStorage.getItem('privacy')) {
        document.getElementById('privacy-banner').classList.add('hidden')
    }

    if (Object.keys(dir).length > 0) {
        openSection(dir[Object.keys(dir)[0]])
    }
}

async function hidePrivacyBanner() {
    console.log("confirm")
    localStorage.setItem('privacy', 'Confirm')
    document.getElementById('privacy-banner').classList.add('hidden')
}

async function toggleSideMenu() {
    document.getElementById('side-menu').classList.toggle('hide-horizontal')
    document.getElementById('main').classList.toggle('expand-horizontal')
    document.getElementById('side-menu-control-arrow').classList.toggle('flip-horizontal')
}

async function isSideMenuHidden() {
    return document.getElementById('side-menu').classList.contains('hide-horizontal')
}

async function toggleTopMenu() {
    document.getElementById('side-menu').classList.toggle('extend-vertical')
    document.getElementById('top-menu').classList.toggle('hide-vertical')
    document.getElementById('main').classList.toggle('expand-vertical')
    document.getElementById('top-menu-control-arrow').classList.toggle('flip-vertical')
}

async function toggleSection(id) {
    document.getElementById(id).classList.toggle('collapse')
    document.getElementById(id + '-arrow').classList.toggle('rotate')
}

loadStructure()