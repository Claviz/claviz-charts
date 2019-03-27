import { ContainerChartOptions, ContainerChartLine } from './models/container-chart-options';
import { makeSVG, getBox } from './utils';

function getMaxLine(data: ContainerChartLine[]): { line: ContainerChartLine, sum: number } {
    const lineData: { line: ContainerChartLine, sum: number }[] = [];
    for (let i = 0; i < data.length; i++) {
        let sum = 0;
        for (let j = 0; j < data[i].data.length; j++) {
            sum += Number(data[i].data[j].value);
        }
        lineData.push({ line: data[i], sum });
    }
    const sorted = lineData.sort((a, b) => a.sum - b.sum);
    return sorted[sorted.length - 1];
};

export function generateContainerChart(parentElement: HTMLElement, options: ContainerChartOptions) {
    let settings: ContainerChartOptions = {
        width: 0,
        barHeight: 60,
        padding: 15,
        data: [],
    };

    const svg = makeSVG('svg', { id: 'graph', style: `width:100%;` });
    parentElement.appendChild(svg);
    let blocks = makeSVG('g');
    svg.appendChild(blocks);

    let box2: (SVGElement | null);
    let width = svg.getBoundingClientRect().width;
    let height = 0;
    let labelWidth = 0;
    const onResize = () => {
        height = 0;
        labelWidth = 0;
        for (let i = 0; i < settings.data.length; i++) {
            const box = makeSVG('text', { x: 50, y: settings.barHeight / 2, 'dominant-baseline': 'middle', 'text-anchor': 'middle' });
            box.innerHTML = `${settings.data[i].label}`;
            const dimensions = getBox(box, svg);
            if (dimensions.width > labelWidth) {
                labelWidth = dimensions.width;
            }
        }
        labelWidth += 10;
        const maxLine = getMaxLine(settings.data);
        const step =
            (((settings.width || width) - (labelWidth + settings.padding)) - maxLine.line.data.length * settings.padding) / (maxLine.sum);

        const newBlocks = makeSVG('g');
        for (let i = 0; i < settings.data.length; i++) {
            let pos = 0;

            const barHeight = settings.barHeight + settings.padding;
            height += barHeight;
            const gg = makeSVG('g', { transform: `translate(${0},${i * barHeight})` });
            const lineRect = makeSVG('rect', {
                x: 0,
                y: 0,
                width: labelWidth,
                height: settings.barHeight,
                style: `fill: lightgrey;`,
            });
            const lineBox = makeSVG('text', {
                x: labelWidth / 2, y: settings.barHeight / 2, 'dominant-baseline': 'middle', 'text-anchor': 'middle'
            });
            lineBox.innerHTML = `${settings.data[i].label}`;
            gg.appendChild(lineRect);
            gg.appendChild(lineBox);
            newBlocks.appendChild(gg);

            for (let j = 0; j < settings.data[i].data.length; j++) {
                const g = makeSVG('g', {
                    transform:
                        `translate(${pos + labelWidth + settings.padding},${i * (settings.barHeight + settings.padding)})`
                });
                const rect = makeSVG('rect', {
                    x: 0,
                    y: 0,
                    width: settings.data[i].data[j].value * step,
                    height: settings.barHeight,
                    style: `fill: ${settings.data[i].data[j].color};`,
                });
                const labelBox = makeSVG('text', {
                    x: settings.data[i].data[j].value * step / 2, y: settings.barHeight / 2,
                    'dominant-baseline': 'middle',
                    'text-anchor': 'middle'
                });
                labelBox.innerHTML = `${settings.data[i].data[j].label}`;
                g.appendChild(rect);
                if (getBox(labelBox, svg).width < settings.data[i].data[j].value * step) {
                    g.appendChild(labelBox);
                }
                function onMouseMove(e: (MouseEvent | TouchEvent)) {
                    let x = 0;
                    if (e instanceof MouseEvent) {
                        x = e.clientX - svg.getBoundingClientRect().left;
                    } else {
                        x = (e.changedTouches ? e.changedTouches[0].pageX : 0) - svg.getBoundingClientRect().left;
                    }
                    let y = i * (settings.barHeight + settings.padding) + settings.barHeight;
                    const box = makeSVG('foreignObject', {
                        y,
                        style: `overflow: visible; width: 100%`,
                    });
                    box.innerHTML =
                        `<div style="background-color: white;display:inline-block;padding:2px 5px;box-shadow: 0 0 1px black;">
                                ${settings.data[i].data[j].label}
                        </div>`;
                    const dimensions = getBox(box.children[0]);
                    if (x + dimensions.width > svg.getBoundingClientRect().width) {
                        x = svg.getBoundingClientRect().width - dimensions.width;
                    }
                    if (y + dimensions.height > svg.getBoundingClientRect().height) {
                        y = svg.getBoundingClientRect().height - dimensions.height - settings.padding - settings.barHeight;
                    }
                    box.setAttribute('x', `${x}`);
                    box.setAttribute('y', `${y}`);
                    if (box2) {
                        svg.removeChild(box2);
                        box2 = null;
                    }
                    box2 = box;
                    svg.appendChild(box2);
                }
                function onMouseLeave() {
                    if (box2) {
                        svg.removeChild(box2);
                        box2 = null;
                    }
                }
                g.addEventListener('mousemove', onMouseMove);
                g.addEventListener('touchstart', function (e) {
                    e.preventDefault();
                    document.addEventListener('touchmove', onMouseMove, { passive: false });
                });
                g.addEventListener('mouseleave', onMouseLeave);
                g.addEventListener('touchend', () => {
                    onMouseLeave();
                    document.removeEventListener('touchmove', onMouseMove);
                });
                newBlocks.appendChild(g);
                pos += settings.data[i].data[j].value * step + settings.padding;
            }
        }
        svg.setAttribute('height', height.toString());
        svg.replaceChild(newBlocks, blocks);
        blocks = newBlocks;
    };

    window.addEventListener('resize', () => {
        if (!settings.width) {
            width = svg.getBoundingClientRect().width;
            onResize();
        }
    });

    function changeOptions(newOptions: ContainerChartOptions) {
        settings = {
            ...settings,
            ...newOptions,
        };
        onResize();
    }

    changeOptions(options);

    return changeOptions;
}