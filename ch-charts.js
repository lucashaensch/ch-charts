var Chart = function(element, series, option) {
	this.$element = $(element)
	this.series   = series
	this.options  = option
}

Chart.prototype = {
	constructor: Chart

	, show: function () {
		this.$element.plot(this.series, this.options)
	}

	, formatTicks: function (data) {
		var dados = data.series[0]['data']
		//for (i in dados)
			
	}

}

$.fn.chart = function(series, option) {
	return this.each(function() {
		var $this = $(this)
		  , data = $this.data('chart')
		  , options = typeof option == 'object' && option
		if (!data) $this.data('chart', (data = new Chart(this, series, options)))
		data.show()
	})
}

