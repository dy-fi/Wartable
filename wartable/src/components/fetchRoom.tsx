// @ts-ignore
import React, { useEffect, useRef, useState } from 'react';
const axios = require('axios').default;
import ApexCharts from 'apexcharts';

const target = (url: string, xpath: string, name: string) => {
    const chart = useRef();
    const [loop, setLoop] = useState();
    const [value, setValue] = useState();
    const [graphData, setData] = useState([]);
    const [wait, setWait] = useState(3);
    const graphLength = useRef(10);
    
    useEffect(() => {
        // loop
        setLoop(setInterval(() => {
            var t = findTarget(url, xpath)
            var nl = graphData

            nl.append({
                x: getTimestamp(),
                y: t,
            });

            if (nl.length() > graphLength) {
                nl.shift();
            }
            
            setData(nl);
            chart.updateSeries(graphData);
           
        }, wait * 1000))
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

        if (result.resultType !== XPathResult.STRING_TYPE) {
            return -1
        } else {
            return result.stringValue;
        }
    }

    function getTimestamp() {
        var ts = Math.round((new Date()).getTime() / 1000);
        return ts
    }

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

    // generate and render chart
    var chartdiv = "#" + name;
    chart.current = new ApexCharts(document.querySelector(chartdiv), OPTIONS); 
    chart.current.render();

    // render
    return (
        <div id={name}></div>
    )
}

export default target; 