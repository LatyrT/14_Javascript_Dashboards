function loadData(ld) {
    d3.json("./Sample/samples.json").then (rawData =>{

        // Create useful datasets
        var allData = rawData;
        console.log(allData);

        var metaData = rawData.metadata;
        console.log(metaData);

        var samplesData = rawData.samples;
        console.log(samplesData);

        var nameId = rawData.names;
        console.log(nameId);

            // Select the dropdown list
            var selectDataset = d3.select("#selDataset");
            console.log(selectDataset);

            // Populate the drowpdown/selection list
            nameId.forEach(function(i) {
                selectDataset.append('option').attr("value", i).text(i);
            });
            


        // Apply filters to datasets
        function applyFilterRenderHtml() {

            // Apply filters to datasets
            var otuIdValue = selectDataset.property('value');
            console.log(otuIdValue);

            // Pull the value of the dropdown list (otu_id) after it's been populated
            var nameIdFiltered = nameId.filter(ndf => ndf == otuIdValue);
            console.log(nameIdFiltered);

            var metaDataFiltered = metaData.filter(mdf => mdf.id == otuIdValue);
            console.log(metaDataFiltered);
    
            var samplesDataFiltered = samplesData.filter(sdf => sdf.id == otuIdValue);
            console.log(samplesDataFiltered);

            // Create demographics
            var demographicInfo = d3.select("#sample-metadata"); // select demographic panel to put data
            demographicInfo.html(""); // empty the demographic info panel each time before getting new id info
            metaDataFiltered.forEach((m) => {
                console.log(m);
                Object.entries(m).forEach(([key, value]) => {
                    var demographMeta = `${key.toUpperCase()} : ${value}`;
                    console.log(demographMeta);
                    demographicInfo.append("h5").text(demographMeta);
                });


            });

            
            //////// Data for charts
            var otuId = samplesDataFiltered[0].otu_ids.slice(0,10).map(d => "OTU: " + d + ' ').reverse();
            console.log('****   otuId  *****');
            console.log(otuId);

            var otuIdInt = samplesDataFiltered[0].otu_ids;
            console.log('****   otuIdInt  *****');
            console.log(otuIdInt);

            var sampleValues = samplesDataFiltered[0].sample_values.slice(0,10).reverse();
            console.log('****   sample values  *****');
            console.log(sampleValues);

            var sampleValuesAll = samplesDataFiltered[0].sample_values;
            console.log('****   sample values all  *****');
            console.log(sampleValuesAll);

            var labels = samplesDataFiltered[0].otu_labels.slice(0,10).reverse();
            console.log('****   labels  *****');
            console.log(labels);

            var wfreqValues = metaDataFiltered[0].wfreq;
            console.log('****   wfreq  *****');
            console.log(wfreqValues);

            var otuLabels = samplesDataFiltered[0].otu_labels.reverse();
            console.log('****   labels  *****');
            console.log(otuLabels);



            /////==========================
            //////// Create bar chart
            /////==========================
            var trace = {
                x: sampleValues,
                y: otuId,
                text: labels,
                marker: {
                color: 'crimson'},
                type:"bar",
                orientation: "h",
            };
            
            var data = [trace];             // create data variable
    
            
            var layout = {                  // create layout variable to set plots layout
                title: "OTU - Top 10", 
            };
    
            Plotly.newPlot("bar-chart", data, layout); // create the bar plot


            
            /////==========================
            ////// Gauge chart
            /////==========================
            var gaugeData = [{
                domain: {
                    x: otuId, 
                    y: wfreqValues
                }, 
                value: wfreqValues,
                title: {
                    text: "Washing Frequency Scrubs Per Week",
                    font: {size: 14}
                },
                type: "indicator", 
                mode: "gauge+number+delta",
                delta: {reference: 5, increasing: {color: "green"}},
                gauge: {
                    axis: {range: [0, 10]}, 
                    steps: [
                        { range: [0, 1], color: "EEF7E8" },
                        { range: [1, 2], color: "D2EAC2" },
                        { range: [2, 3], color: "BCE0A4" },
                        { range: [3, 4], color: "AED991" },
                        { range: [4, 5], color: "95CE6F" },
                        { range: [5, 6], color: "87C75C" },
                        { range: [6, 7], color: "6EB63E" },
                        { range: [7, 8], color: "61A037" },
                        { range: [8, 9], color: "#5C9834" },
                        { range: [9, 10], color: "528F28" }
                    ], 
                    threshold: {line: {color: "red", width: 4},
                    thickness: 0.75, value: 5}
                }
            }];

            
            var gaugeLayout = {
                width: 300, 
                height: 600,  
                margin: {t:0, b:200, r:0, l:0}
            };

            Plotly.newPlot("gauge-chart", gaugeData, gaugeLayout);


            /////==========================
            ///// Create bubble chart
            /////==========================
            var trace1 = {
                x: otuIdInt,
                y: sampleValuesAll,
                mode: "markers",
                marker: {
                    size: sampleValuesAll,
                    color: otuIdInt
                },
                text: otuLabels
    
            };
    
            
            var layout_2 = {                // set the layout for the bubble plot
                xaxis:{title: "OTU ID"},
                title:{
                    text: "Bubble Chart - OTU Sample Values "
                },
                height:800,
                //width: 700 //,
                //margin: {
                     //t: 50//, 
                     //b: -300,
                     //l: 300
                //}

            };
    
             
            var data1 = [trace1];           // creating data variable
    
            // create the bubble plot
            Plotly.newPlot("bubble-chart", data1, layout_2); 


        }

        applyFilterRenderHtml(); // calls the filter function
        selectDataset.on('change', applyFilterRenderHtml); // handles the changes to the dropdown value


    })
}


function initialDisplay () {
    loadData();

}

initialDisplay();





