export interface ContainerChartOptions {
    /**
     * Padding in `px` between chart elements. `15` by default.
     */
    padding?: number;
    /**
     * Array of data to display.
     */
    data: ContainerChartLine[];
    /**
     * `false` by default. Determines location of the line base
     */
    reversed?: boolean;
    /**
     * `horizontal` by default.
     */
    orientation?: 'horizontal' | 'vertical';
    /**
     * Function that will be executed when user clicks on chart element.
     */
    select?: (data: any) => any;
    /**
     * `false` by default. Change text orientation to top-down when it is positioned vertically.
     */
    verticalTextTopDown?: boolean;
}

export interface ContainerChartLineData {
    /**
    * Color of the line item.
    */
    color: string;
    /**
    * Label of the line item.
    */
    label: string;
    /**
    * Value of the line item.
    */
    value: number;
    /**
    * Tooltip of the line item.
    */
    tooltip?: string;
    /**
    * Custom CSS styles of the label.
    */
    style?: string;
}

export interface ContainerChartLine {
    /**
     * Array of line items.
     */
    data: ContainerChartLineData[];
    /**
    * Label of the line base.
    */
    label: string;
    /**
    * Color of the line base (default is `#d3d3d3`).
    */
    color: string;
    /**
    * Custom CSS styles of the label.
    */
    style?: string;
}