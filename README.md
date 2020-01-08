# Claviz Charts

### Container chart [DEMO](https://claviz-charts.netlify.com/)

```javascript
const parentElement = document.getElementById('chart');
const options = {
    data: [
        {
            "data": [
                {
                    "color": "#7bc043",
                    "label": "Apples",
                    "value": 2,
                    "tooltip": "Custom tooltip"
                }
            ],
            "label": "line 1"
        },
        {
            "data": [],
            "label": "line 2"
        },
        {
            "data": [
                {
                    "color": "#f37736",
                    "label": "Oranges",
                    "value": 10
                }
            ],
            "label": "line 3"
        },
    ]
};
generateContainerChart(parentElement, options);
```

#### Options
* **data** `object[]` `required`\
Array of data to display.
  * **label** `string`\
    Label of the line base.
  * **color** `string`\
    Color of the line base (default is `#d3d3d3`).    
  * **style** `string`\
    Custom CSS styles of the label.
  * **data** `object[]`\
    Array of line data.
    * **color** `string`
    * **label** `string`
    * **value** `number`
    * **tooltip** `string`
    * **style** `string`

* **width** `number`\
Width of the chart. By default it will be stretched to it's parent container's full width.

* **height** `number`\
Height of the chart. By default it will be stretched to it's parent container's full height.

* **padding** `number`\
Padding in `px` between chart elements. `15` by default.
    
* **orientation** `horizontal | vertical`\
`horizontal` by default.

* **reversed** `boolean`\
`false` by default. Determines location of the line base:
    
| reversed | horizontal | vertical |
|----------|------------|----------|
| `false`  | left       | top      |
| `true`   | right      | bottom   |

* **select** `function(data)`\
Function that will be executed when user clicks on chart element.

* **verticalTextTopDown** `boolean`\
`false` by default. Change text orientation to top-down when it is positioned vertically. 