var d7_data_brute = {}
var d7_x_axis = Array.from(Array(14).keys())
d7_x_axis.shift()

d7_data_brute["circuit1"] = [1.50, -2.72, 0, 1.65, 0, 0, 0, 0, 8.58, 0, 0, 0, 0]
d7_data_brute["circuit2"] = [1.30, -4.66, 0, 1.86, 0, 0, 0, 0, 16.57, 0, 0, 0, 0]
d7_data_brute["ecoli"] = [-15.86, -7.38, 32.95, -19.7, 0, 0, 0, 0, 0, 0, 0, 0, 0]
d7_data_brute["english"] = [31.17, 30.49, -32.51, 23.85, 25.88, -27.94, -21.09, -15.22, 36.86, -32.77, -25.86, -40.95, -27.11]
d7_data_brute["french"] = [20.90, 18.94, -22.10, 17.13, 5.03, -23.17, -17.07, -8.10, 15.31, -41.91, -24.54, -23.60, -11.42]
d7_data_brute["highschool"] = [-18.77, -16.78, 3.95, -15.94, -5.06, 10.95, 5.59, 12.38, -5.18, 3.29, 17.67, 44.17, 238.97]
d7_data_brute["residence"] = [-49.07, -51.78, 17.08, -50.56, -26.81, 21.07, 17.41, 155.01, -26.81, -22.94, 33.95, 186.99, 744.24]
d7_data_brute["spanish"] = [25.79, 23.16, -28.69, 19.42, 25.42, -26.24, -18.94, -12.42, 24.89, -40.68, -32.48, -40.90, -23.35]
d7_data_brute["yeast"] = [-13.41, -12.80, 4.11, -14.56, 13.91, 0, 0, 0, 0, 1, Infinity, 1, Infinity, 0, 0]

let xx = ""
window.onload = () => {
    var d7_data_refined = []
    Object.keys(d7_data_brute).forEach(function(k) {
        xx += k + "\t"
        d7_data_refined.push({
            x: d7_x_axis,
            y: d7_data_brute[k].map((zi) => {

                let result = Number((zi / Math.sqrt(sumArray(d7_data_brute[k].map((element) => {
                    console.log(element * element)
                    return (element * element)
                }))))).toFixed(3)
                result = isNaN(result) ? Infinity : result
                xx += result + "\t"
                return result
            }),
            mode: 'markers',
            name: k,
            mode: 'lines+markers',


        })
        xx += "\n"
    });


    Plotly.newPlot('7DPlot', d7_data_refined);
}