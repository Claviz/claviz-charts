export interface ContainerChartOptions {
    width?: number;
    height?: number;
    padding?: number;
    data: ContainerChartLine[];
    reversed?: boolean;
    orientation?: 'horizontal' | 'vertical';
    select?: (data: any) => any;
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