export interface ContainerChartOptions {
    width?: number;
    height?: number;
    padding?: number;
    data: ContainerChartLine[];
    reversed?: boolean;
    orientation?: 'horizontal' | 'vertical';
    select?: (data: any) => any;
    verticalTextTopDown?: boolean;
}

export interface ContainerChartLineData {
    color: string;
    label: string;
    value: number;
    tooltip?: string;
    styles?: any;
}

export interface ContainerChartLine {
    data: ContainerChartLineData[];
    label: string;
    color: string;
    styles?: any;
}