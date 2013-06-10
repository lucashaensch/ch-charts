var Chart = function(element, series, config) {
	this.$element = $(element)
	this.series   = series
	this.config   = config
}

Chart.prototype = {
	constructor: Chart

	, show: function () {
		this.$element.plot(this.series, this.config)
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////

var LineChart = function(element, series) {
	this.$element = $(element)
	this.$element.data("chart", this)
	this.series = series
	this.config = {
		series: {
			lines: { 
				show: true
			},
			points: { show: false }
		}
	}
}

LineChart.prototype = new Chart()



$.fn.lineChart = function(series, option) {
	var $this = $(this)
	var line_chart = new LineChart(this, series)

	line_chart.show()
	// if options["series"] == undefined { line_chart.series = [] } 
	$this.data("chart", new LineChart("#placeholder"))
}

/////////////////////////////////////////////////////////////////////////////////////////////////////

var ColumnChart = function(element, data) {
	this.$element = $(element)
	this.$element.data("chart", this)
	this.series = data
	this.config = {
		series: {
			bars: { 
				show: true,
				barWidth: this.$element[0].clientWidth - (0.9993 * this.$element[0].clientWidth),
				align: "center",
				lineWidth: 0.8
			}
		}
	}
}

ColumnChart.prototype = new Chart()

$.fn.columnChart = function(data) {
	var $this = $(this)
	var column_chart = new ColumnChart(this, data)

	column_chart.show()
	// if options["series"] == undefined { line_chart.series = [] } 
	$this.data("chart", new ColumnChart("#placeholder"))
}

// /////////////////////////////////////////////////////////////////////////////////////////////////////

// var PieChart = function(element, data) {
// 	this.$element = $(element)
// 	this.$element.data("chart", this)
// 	this.series = data
// 	this.config = {
// 		series: {
// 			pie: { 
// 				show: true
// 			}
// 		}
// 	}
// }

// PieChart.prototype = {

// 	constructor: PieChart

// 	, show: function () {
// 		this.$element.plot(this.series,this.config)
// 	}
// }

// $.fn.pieChart = function(data) {
// 	var $this = $(this)
// 	var pie_chart = new PieChart(this, data)

// 	pie_chart.show()
// 	// if options["series"] == undefined { line_chart.series = [] } 
// 	$this.data("chart", new PieChart("#placeholder"))
// }

// /////////////////////////////////////////////////////////////////////////////////////////////////////

// var BarChart = function(element, data) {
// 	this.$element = $(element)
// 	this.$element.data("chart", this)
// 	this.series = data
// 	this.config = {
// 		series: {
// 			bars: { 
// 				show: true,
// 				horizontal: true,
// 				barWidth: this.$element[0].clientWidth - (0.9993 * this.$element[0].clientWidth),
// 				align: "center",
// 				lineWidth: 0.8
// 			}
// 		}
// 	}
// }

// BarChart.prototype = {

// 	constructor: BarChart

// 	, show: function () {
// 		this.$element.plot(this.series,this.config)
// 	}
// }

// $.fn.barChart = function(data) {
// 	var $this = $(this)
// 	var bar_chart = new BarChart(this, data)

// 	bar_chart.show()
// 	// if options["series"] == undefined { line_chart.series = [] } 
// 	$this.data("chart", new BarChart("#placeholder"))
// }