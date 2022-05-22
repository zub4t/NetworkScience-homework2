var d7_data_brute = {}
var d7_x_axis = Array.from(Array(14).keys())
d7_x_axis.shift()

d7_data_brute["circuit1"] = [1.50, -2.72, 0, 1.65, 0, 0, 0, 0, 8.58, 0, 0, 0, 0]
d7_data_brute["circuit2"] = [1.30, -4.66, 0, 1.86, 0, 0, 0, 0, 16.57, 0, 0, 0, 0]
d7_data_brute["english"] = [31.17, 30.49, -32.51, 23.85, 25.88, -27.94, -21.09, -15.22, 36.86, -32.77, -25.86, -40.95, -27.11]
d7_data_brute["french"] = [20.90, 18.94, -22.10, 17.13, 5.03, -23.17, -17.07, -8.10, 15.31, -41.91, -24.54, -23.60, -11.42]
d7_data_brute["highschool"] = [-18.77, -16.78, 3.95, -15.94, -5.06, 10.95, 5.59, 12.38, -5.18, 3.29, 17.67, 44.17, 238.97]
d7_data_brute["residence"] = [-49.07, -51.78, 17.08, -50.56, -26.81, 21.07, 17.41, 155.01, -26.81, -22.94, 33.95, 186.99, 744.24]
d7_data_brute["spanish"] = [25.79, 23.16, -28.69, 19.42, 25.42, -26.24, -18.94, -12.42, 24.89, -40.68, -32.48, -40.90, -23.35]
d7_data_brute["ecoli"] = [-15.04, -20.64, -6.95, 0, 0, 0, 41.72, 0, 0, 0, 0, 0, 0]
d7_data_brute["yeast"] = [-9.43, -13.56, -8.68, 0, 2.49, 0, 13.51, 0, 9.90, 0, 0, 0, 0]
d7_data_brute["unknow1"] = [1.47, -12.55, 0, 1.80, 0, 0, 0, 0, 37.60, 0, 0, 0, 0]
d7_data_brute["unknow2"] = [-4.58, -4.92, 1.11, -4.38, -2.14, 1.49, 2.69, 5.51, -1.76, 0.96, 3.16, 6.66, 31.59]
d7_data_brute["unknow3"] = [7.53, 8.08, -6.56, 8.79, 0.35, -9.47, -8.51, -3.37, 5.80, -15.95, -11.65, -12.25, -6.56]






/*

d7_data_brute["english"] = [29.80, 24.92, 29.36, -23.04, -31.50, -14.76, 20.90, 34.89, -25.60, -28.58, -30.24, -33.73, -18.13]
d7_data_brute["french"] = [22.28, 17.20, 19.43, -16.90, -23.60, -7.89, 4.34, 13.68, -26.78, -26.76, -43.63, -28.79, -12.57]
d7_data_brute["spanish"] = [24.92, 18.60, 22.18, -17.98, -27.87, -12.01, 23.85, 23.59, -30.37, -23.80, -39.50, -39.88, -21.51]
d7_data_brute["ecoli"] = [-15.04, -20.64, -6.95, 0, 0, 0, 41.72, 0, 0, 0, 0, 0, 0]
d7_data_brute["yeast"] = [-9.43, -13.56, -8.68, 0, 2.49, 0, 13.51, 0, 9.90, 0, 0, 0, 0]
d7_data_brute["residence"] = [-52.73, -57.72, -56.79, 19.18, 17.80, 155.45, -25.90, -21.84, 41.89, 18.23, 2.83, 205.64, 765.22]
d7_data_brute["highschool"] = [17.57, -16.54, -16.88, 5.79, 3.62, 13.39, -4.87, -5.69, 16.84, 10.35, 2.89, 41.38, 409.90]
d7_data_brute["circuit1"] = [1.46, 1.67, -2.73, 0, 0, 0, 0, 10.15, 0, 0, 0, 0, 0]
d7_data_brute["circuit2"] = [1.56, 2.82, -5.88, 0, 0, 0, 0, 17.10, 0, 0, 0, 0, 0]

*/


function formatData() {
    let r = ""
    for (let i = 0; i < 13; i++) {
        for (let j = 0; j < 9; j++) {
            console.log("indece " + (i + (j * 13)))
            r += xxx[i + (j * 13)] + "\t"

        }
        r += "\n"
    }
    return r;

}

let xxx = []
let xx = ""
window.onload = () => {
    var d7_data_refined = []
    Object.keys(d7_data_brute).forEach(function(k) {
        xx += `'${k}':` + "["
        d7_data_refined.push({
            x: d7_x_axis,
            y: d7_data_brute[k].map((zi) => {

                let result = Number((zi / Math.sqrt(sumArray(d7_data_brute[k].map((element) => {
                    return (element * element)
                }))))).toFixed(3)
                result = isNaN(result) ? Infinity : result
                xx += result + ","
                xxx.push(result)
                return result
            }),
            mode: 'markers',
            name: k,
            mode: 'lines+markers',


        })
        xx += "]\n"
    });


    Plotly.newPlot('7DPlot', d7_data_refined);
}