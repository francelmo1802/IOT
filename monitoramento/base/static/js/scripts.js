const { Liquid, Line, measureTextWidth } = G2Plot;
const color = ['#F4664A', '#FAAD14', '#FFFF00','#5B8FF9'];

const url = "http://127.0.0.1:8000/reservatorio/liquid/"
fetch(url)
.then(res=>res.json()) // transforma a resposta em json
.then(data=>{
      console.log(data['data'])
      const liquidPlot = new Liquid('liquid', {
      percent: data.data[3].valor,
      shape:'rect',
      radius: 0.8,
      outline: {
      border: 2,
      distance: 4,
    },
      wave: {
        length: 120,
      },
      region: {
       start: { x: 0, y: 0 },
       end: { x: 10, y: 0.3 }
    },
      statistic: {
        title: {
          formatter: () => data.data[1].name,
          style: ({ percent }) => ({
            fontSize: 30,
            fill: percent > 0.58 ? 'rgba(44,53,66,0.85)':'white',
          }),
        },
        content: {
          style: ({ percent }) => ({
            fontSize: 60,
            lineHeight: 1,
            fill: percent > 0.45 ? 'rgba(44,53,66,0.85)':'white',
          }),
          customHtml: (liquid, view, { percent }) => {
            const { width, height } = liquid.getBoundingClientRect();
            const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
            const text = `${(percent * 100).toFixed(0)}%`;
            const textWidth = measureTextWidth(text, { fontSize: 60 });
            const scale = Math.min(d / textWidth, 1);
            return `<div style="width:${d}px;display:flex;align-items:center;justify-content:center;font-size:${scale}em;line-height:${
              scale <= 1 ? 1 : 'inherit'
            }">${text}</div>`;
          },
        },
      },
      liquidStyle: ({ percent }) => {
        return {
          fill: percent < 0.25 ? color[0] : percent < 0.5 ? color[1] :percent < 0.75 ? color[2]: color[3],
          stroke: percent < 0.25 ? color[0] : percent < 0.5 ? color[1] :percent < 0.75 ? color[2]: color[3]
        };
      },
    });
    liquidPlot.render();
    liquidPlot.update({ theme: 'dark' });
});

//----------------------------------------------------------------------------------------
const url2 = "http://127.0.0.1:8000/reservatorio/linha/"
fetch(url2)
  .then((res) => res.json()) // transforma a resposta em json
  .then((data) => {
    console.log(data)
    // Filtrar os dados para obter apenas a última data
    const lastDate = data[data.length - 1].date;
    const filteredData = data.filter(item => item.date === lastDate);

    const line = new Line('line', {
        data: filteredData,
        // data: data,
        padding: 'auto',
        xField: 'time',
        yField: 'value',
        seriesField: 'date',
        // customize line color
        color: '#ADFF2F',
        // customize point
        point: {
         size: 4,
         shape: 'diamond',
         style: {
           stroke: '#FE740C',
           lineWidth: 2,
           fillOpacity: 0.6,
        },
       },
       yAxis: {
         // format y axis label style
         label: {
           formatter: (v) => {
             return v + '%';
           },
           style: {
             fill: '#ADFF2F',
           },
         },
       },
       xAxis: {
        // type: 'timeCat',
        tickCount: 24,
        label: {
           style: {
             fill: '#ADFF2F',
           },
         },
      },
       // add label
       label: {
         fill: '#FE740C',
       },
       // add annotation and auxiliary line
       annotations: [
        //
        {
          type: 'regionFilter',
          start: ['min', 'median'],
          end: ['max', '0'],
          color: '#F4664A',
        },
        {
          type: 'text',
          position: ['min', 'median'],
          content: 'Mínimo',
          offsetY: -4,
          style: {
            textBaseline: 'bottom',
          },
        },
        {
          type: 'line',
          start: ['min', 'median'],
          end: ['max', 'median'],
          style: {
            stroke: '#F4664A',
            lineDash: [2, 2],
          },
        },
      ],
     });

     // add click event on element
     line.on('element:click', (e) => {
       console.log(e);
     });

     // add click event on annotation
     line.on('annotation:click', (e) => {
       console.log(e);
     });

     // add click event on axis-label
     line.on('axis-label:click', (e) => {
       console.log(e);
    });
    line.render();
    line.update({ theme: 'dark' });
});

