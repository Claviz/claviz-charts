import { generateContainerChart } from '../src/index';

const containerChartData = [
    {
        "data": [
            {
                "color": "#7bc043",
                "label": "Oracle 2 (1.5 t)",
                "value": 2
            }
        ],
        "label": "line 1"
    },
    {
        "data": [
            {
                "color": "#f37736",
                "label": "Claviz 4 (1.8 t)",
                "value": 4
            },
            {
                "color": "#000",
                "label": "Heisenbug 6 (4 t)",
                "value": 6
            },
            {
                "color": "#7bc043",
                "label": "Oracle 4 (3 t)",
                "value": 4
            }
        ],
        "label": "line 2"
    },
    {
        "data": [
            {
                "color": "#f37736",
                "label": "Claviz 10 (0 t)",
                "value": 10
            }
        ],
        "label": "line 3"
    },
    {
        "data": [
            {
                "color": "#0392cf",
                "label": "Microsoft 8 (3.5 t)",
                "value": 8
            }
        ],
        "label": "line 4"
    },
    {
        "data": [
            {
                "color": "#000",
                "label": "Heisenbug 20 (0 t)",
                "value": 20
            },
        ],
        "label": "line 5"
    }
];

generateContainerChart(document.getElementById('fixed-width') as HTMLElement, {
    width: 500,
    data: containerChartData,
});

generateContainerChart(document.getElementById('full-width') as HTMLElement, {
    data: containerChartData,
});

generateContainerChart(document.getElementById('reversed') as HTMLElement, {
    data: containerChartData,
    reversed: true
});

generateContainerChart(document.getElementById('vertical') as HTMLElement, {
    data: containerChartData,
    orientation: 'vertical',
});

generateContainerChart(document.getElementById('vertical-reversed') as HTMLElement, {
    data: containerChartData,
    reversed: true,
    orientation: 'vertical',
    select: (data) => alert(JSON.stringify(data)),
});