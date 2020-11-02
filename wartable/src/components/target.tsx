import React, { useEffect, useRef, useState } from 'react';
const axios = require('axios').default;
import ApexCharts from 'apexcharts';
import { createLoopVariable } from 'typescript';

const target = (url: string, xpath: string, name: string) => {
    const chart = useRef(new ApexCharts(null, null));
    const loop = useRef<any>();
    const graphData = useRef<any[]>([]);
    const [wait, setWait] = useState(3);
    const [graphLength, setGraphLength] = useState(10);
    
    useEffect(() => {
        // generate and render chart
        var chartdiv = "#" + name;
        chart.current = new ApexCharts(document.querySelector(chartdiv), OPTIONS); 
        chart.current.render();

        // loop
        loop.current = setInterval(() => {
            // find val
            var tar = findTarget(url, xpath)
            tar = Number(tar)
            console.log(tar);
            
            // push val with timestamp
            graphData.current.push({
                x: getTimestamp(),
                y: tar,
            });

            // shift if too long
            if (graphData.current.length > graphLength) {
                graphData.current.shift();
            }
            // update chart 
            chart.current.updateSeries(graphData.current)
           
        }, wait * 1000)

    })

    // helper to request url
    function getHTML(url: string) {
        axios.get(url)
            .then((res:string) => {
                console.log(res);
                return res
            });
    }
    
    // parse html and find target with xpath
    function findTarget(url: string, path: string) {
        var html = getHTML(url);
        const result = document.evaluate(path, document, null, XPathResult.STRING_TYPE, null)
        // should be string
        if (result.resultType !== XPathResult.STRING_TYPE) {
            return -1
        } else {
            return result.stringValue;
        }
    }

    // timestamp helper
    function getTimestamp() {
        var ts = Math.round((new Date()).getTime() / 1000);
        return ts
    }

    // CHART OPTIONS
    const OPTIONS = useRef({
        chart: {
            height: 350,
            width: 400,
            type: "line",
            animations: {
                enabled: true,
                easing: "linear",
                dynamicAnimation: {
                    speed: 1050,
                }
            }
        },
        xaxis: {
            type: "datetime",
        },
        series: {
            name: "y axis",
            data: graphData,
        },
        title: {
            text: name,
            align: "left",
        },
        stroke: {
            curve: "left",
        },
        legend: {
            show: false,
        },
        markers: {
            size: 1,
        }
    });

    // render
    return (
        <div id={name}></div>
    )
}

export default target; 