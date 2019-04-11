import { ContainerChartOptions, ContainerChartLine } from './models/container-chart-options';
import { makeSVG, getBox } from './utils';
import { TinyColor } from '@ctrl/tinycolor';
import tippy from 'tippy.js';
import 'tippy.js/themes/light-border.css';
import './styles.css';

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
    let settings = {
        width: 0,
        height: 0,
        padding: 15,
        data: [] as ContainerChartLine[],
        reversed: false,
        orientation: 'horizontal',
        select: (data: any) => { }
    };

    const svg = makeSVG('svg', { class: 'chart' });
    parentElement.appendChild(svg);

    let parentDimensions = parentElement.getBoundingClientRect();
    const onResize = () => {
        const maxLine = getMaxLine(settings.data);
        const isHorizontal = settings.orientation === 'horizontal';
        const dimension = isHorizontal ? (settings.width || parentDimensions.width) : (settings.height || parentDimensions.height);
        const baseSize = getBaseSize(settings.data.map(x => x.label), isHorizontal ? 'width' : 'height', svg);
        const pxPerValue = ((dimension - (baseSize + settings.padding)) - maxLine.line.data.length * settings.padding) / (maxLine.sum);
        const barSize = ((isHorizontal ? (settings.height || parentDimensions.height) : (settings.width || parentDimensions.width)) - ((settings.data.length - 1) * settings.padding)) / settings.data.length;

        const newBlocks = makeSVG('g');
        for (let i = 0; i < settings.data.length; i++) {
            let pos = 0;

            const labelX = settings.reversed ? dimension - baseSize : 0;
            const labelY = i * (barSize + settings.padding);
            const lineLabelContainer = makeBar(
                isHorizontal ? labelX : labelY,
                isHorizontal ? labelY : labelX,
                'lightgrey',
                isHorizontal ? baseSize : barSize,
                isHorizontal ? barSize : baseSize,
                settings.data[i].label,
                svg,
                false,
            );
            newBlocks.appendChild(lineLabelContainer);

            for (let j = 0; j < settings.data[i].data.length; j++) {
                const color = settings.data[i].data[j].color;
                const barX = settings.reversed ?
                    dimension - (pos + baseSize + settings.padding + settings.data[i].data[j].value * pxPerValue) :
                    baseSize + settings.padding + pos;
                const barY = i * (barSize + settings.padding);
                const barWidth = settings.data[i].data[j].value * pxPerValue;
                const barHeight = barSize;
                const barContainer = makeBar(
                    isHorizontal ? barX : barY,
                    isHorizontal ? barY : barX,
                    color,
                    isHorizontal ? barWidth : barHeight,
                    isHorizontal ? barHeight : barWidth,
                    settings.data[i].data[j].label,
                    svg
                );
                barContainer.addEventListener('click', () => settings.select(settings.data[i].data[j]));
                newBlocks.appendChild(barContainer);

                pos += settings.data[i].data[j].value * pxPerValue + settings.padding;
            }
        }
        svg.setAttribute('height', parentDimensions.height.toString());
        while (svg.firstChild) {
            svg.firstChild.remove();
        }
        svg.appendChild(newBlocks);
    };

    window.addEventListener('resize', () => {
        parentDimensions = parentElement.getBoundingClientRect();
        if ((!settings.width || !settings.height) && parentDimensions.height && parentDimensions.width) {
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

function makeBar(x: number, y: number, color: string, width: number, height: number, label: string, svg: any, showTooltip: boolean = true) {
    const barContainer = makeSVG('g', {
        transform:
            `translate(${x},${y})`
    });
    barContainer.appendChild(makeSVG('rect', {
        width: width,
        height: height,
        style: `fill: ${color};`,
        class: 'bar',
        rx: 3,
        ry: 3,
    }));
    const fontColor = new TinyColor(color).isLight() ? 'black' : 'white';
    const barText = makeSVG('text', {
        x: width / 2,
        y: height / 2,
        class: 'bar-text',
        'dominant-baseline': 'middle',
        'text-anchor': 'middle',
        fill: fontColor
    });
    barText.innerHTML = `${label}`;
    const dimensions = getBox(barText, svg);
    if (dimensions.width < width) {
        barContainer.appendChild(barText);
    } else if (dimensions.width < height) {
        barText.setAttribute('transform', `rotate(-90, ${width / 2}, ${height / 2})`);
        barContainer.appendChild(barText);
    }
    if (showTooltip && label) {
        tippy(barContainer, {
            content: label,
            arrow: true,
            interactive: true,
            followCursor: 'horizontal',
            theme: 'light-border'
        });
    }

    return barContainer;
}

function getBaseSize(labels: string[], dimension: 'height' | 'width', svg: any): number {
    let baseSize = 0;
    for (let i = 0; i < labels.length; i++) {
        const box = makeSVG('text');
        box.innerHTML = labels[i];
        const dimensions = getBox(box, svg);
        if (dimensions[dimension] > baseSize) {
            baseSize = dimensions[dimension];
        }
    }
    baseSize += 10;
    return baseSize;
}
