export interface ContainerChartOptions {
    width: number;
    barHeight: number;
    padding: number;
    data: ContainerChartLine[];
}

export interface ContainerChartLineData {
    color: string;
    label: string;
    value: number;
}

export interface ContainerChartLine {
    data: ContainerChartLineData[];
    label: string;
}