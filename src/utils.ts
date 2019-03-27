export function makeSVG(tag: string, attrs: { [key: string]: any } = {}) {
    const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (const k in attrs) {
        if (attrs.hasOwnProperty(k)) {
            el.setAttribute(k, attrs[k]);
        }
    }
    return el;
}

export function getBox(elem: Element, parent: (Element | null) = null) {
    parent = parent || document.body;
    const copy = elem.cloneNode(true) as Element;
    parent.appendChild(copy);
    const box = copy.getBoundingClientRect();
    parent.removeChild(copy);
    return box;
}