var ChaordicCharts = function () { return {

  main: function () {
    var state = ChaordicCharts.getState();
    ChaordicCharts.applyFormat(state);
    Format.replaceState(state, ChaordicCharts.stateToUrl(state));
    window.onpopstate = ChaordicCharts.onPopState;
  },

  applyFormat: function (state) {
    $('#indicator-selector li a').click(ChaordicCharts.onIndicatorSelect);
    $('#indicator2-selector li a').click(ChaordicCharts.onIndicator2Select);
    $('#client-selector li a').click(ChaordicCharts.onClientSelect);
    $('#service-selector li a').click(ChaordicCharts.onServiceSelect);
    $('#feature-selector li a').click(ChaordicCharts.onFeatureSelect);
    $('#base-selector li a').click(ChaordicCharts.onBaseSelect);
    $('#category-selector li a').click(ChaordicCharts.onCategorySelect);
    $('#save-button').click(ChaordicCharts.onSaveClick);
    $('#csv-button').click(ChaordicCharts.onCsvClick);
    $('.report-picker').click(ChaordicCharts.onReportClick);
    $('.delete-report').click(ChaordicCharts.onDeleteReportClick);
    Dates.applyFormat(state, ChaordicCharts);
    //asynchronously request chart data
    $('.ch-chart-container').each(function (index, element) {
      var id = '#' + this.getAttribute('id');
      $.ajax({
          url: $(id + ' .ch-chart-data').attr('url'),
          dataType: 'json',
          success: ChaordicCharts.updateChartCallback(id)
      });
    });

    $('#myModal').on('shown', function () {
      $('#chart-name').focus();
    });

    $('#myModal').on('hide', function () {
      $('#chart-name').val('');
    });

    $('#chart-name').keydown(function (e){
      if(e.keyCode == 13){
        ChaordicCharts.onSaveClick($('#chart-name'));
      }
    })
  },

  onCsvClick: function (eventObject) {
    var state = ChaordicCharts.getState();
    $.getJSON('v1/clients/'+state['client']+'/'+state['service']+'/charts/'+state['indicator']+'/'+state['indicator2']+'?feature='+state['feature']+'?category='+state['category']+'?base='+state['base'], function(data){
      console.log(data);
    });
    // var url = ChaordicCharts.stateToCsvUrl(state);
    // window.history.pushState(state, '', url);
  },

  onDeleteReportClick: function(eventObject) {
    //var id = JSON.parse(eventObject.target.getAttribute('id').replace(/=>/g, ":").replace(/:2013/g, ":\"2013").replace(/UTC/g, "UTC\"").replace(/nil/g, "\"nil\""))['id'];
    var id = $(eventObject.target).data("chart");

    $.ajax({
      type: "POST",
      url: '/v1/ChaordicCharts/delete?id='+id,
      data: {},
      success: ChaordicCharts.deleteChart(id),
      dataType: 'json'
    });

    var state = ChaordicCharts.getState();
    Format.ajax(ChaordicCharts.stateToUrl(state, true), ChaordicCharts.updateCallback);
  },

  onReportClick: function (eventObject) {
    var id = eventObject.target.getAttribute('id');
    var data = document.getElementById(id).getAttribute('tag').replace(/=>/g, ":").replace(/:2013/g, ":\"2013").replace(/UTC/g, "UTC\"").replace(/nil/g, "\"nil\"");
    var json = JSON.parse(data);
    
    $.getJSON('/v1/ChaordicCharts/charts', function(data){
      var position = 0;
      for(var i = 0; i < data.length; i++){
        if(data[i]['id'] == id){
          position = i;
        }
      }
      var state = ChaordicCharts.getState();
      state['service'] = data[position]['service_id'];
      state['indicator'] = data[position]['indicator1_id'];
      state['indicator2'] = data[position]['indicator2_id'];
      state['feature'] = data[position]['feature_id'];
      state['category'] = data[position]['category'];
      state['base'] = data[position]['base'];      
      Format.ajax(ChaordicCharts.stateToUrl(state, true), ChaordicCharts.updateCallback);
    });

  },

  onSaveClick: function (eventObject) {
    var state = ChaordicCharts.getState();
    var service = state['service'];
    var indicator = state['indicator'];
    var indicator2 = (state['indicator2'] ? state['indicator2'] : 'nenhum');
    var feature = state['feature'];
    var category = state['category'];
    var base = state['base'];

    $.ajax({
      type: "POST",
      url: '/v1/ChaordicCharts/save?name='+document.getElementById("chart-name").value,
      data: {'service':service,
             'indicator':indicator,
             'indicator2':indicator2,
             'feature':feature,
             'category':category,
             'base':base},
      success: ChaordicCharts.saveCharts(service, indicator, indicator2, feature, category, base),
      dataType: 'json'
    });

    Format.ajax(ChaordicCharts.stateToUrl(state, true), ChaordicCharts.updateCallback);
    $('#myModal').modal('hide');
  },

  onClientSelect: function (eventObject) {
    var state = ChaordicCharts.getState();
    state['client'] = $(eventObject.target).attr('tag');
    Format.ajax(ChaordicCharts.stateToUrl(state, true), ChaordicCharts.updateCallback);
  },

  onIndicatorSelect: function (eventObject) {
    var state = ChaordicCharts.getState();
    state['indicator'] = $(eventObject.target).attr('value');
    Format.ajax(ChaordicCharts.stateToUrl(state, true), ChaordicCharts.updateCallback);
  },

  onIndicator2Select: function (eventObject) {
    var state = ChaordicCharts.getState();
    state['indicator2'] = $(eventObject.target).attr('value');
    Format.ajax(ChaordicCharts.stateToUrl(state, true), ChaordicCharts.updateCallback);
  },

  onServiceSelect: function (eventObject) {
    var state = ChaordicCharts.getState();
    state['service'] = $(eventObject.target).attr('value');
    Format.ajax(ChaordicCharts.stateToUrl(state, true), ChaordicCharts.updateCallback);
  },

  onFeatureSelect: function (eventObject) {
    var state = ChaordicCharts.getState();
    state['feature'] = $(eventObject.target).attr('value');
    Format.ajax(ChaordicCharts.stateToUrl(state, true), ChaordicCharts.updateCallback);
  },

  onBaseSelect: function (eventObject) {
    var state = ChaordicCharts.getState();
    state['base'] = $(eventObject.target).attr('value');
    Format.ajax(ChaordicCharts.stateToUrl(state, true), ChaordicCharts.updateCallback);
  },

  onCategorySelect: function (eventObject) {
    var state = ChaordicCharts.getState();
    state['category'] = $(eventObject.target).attr('value');
    Format.ajax(ChaordicCharts.stateToUrl(state, true), ChaordicCharts.updateCallback);
  },

  // update callback for general events
  updateCallback: function (data, textStatus, jqXHR) {
    $('#placeholder').html(data);
    var state = ChaordicCharts.getState();
    ChaordicCharts.applyFormat(state);
    ChaordicCharts.pushState(state);
  },

  // update callback for chart requests
  updateChartCallback: function (id) {
    return function(data, textStatus, jqXHR) {
      var formattedData = Charts.flotChart(data['data'], id);
      var chartHolder = $(id + ' .ch-chart');
      var chart = $(id + ' .ch-chart-data').attr('chart');
      var base = $('#base-selector li a').attr('value');
      var isMean = $(id + ' .ch-chart-data').attr('isMean').split(',');
      if ((chart == 'pie' || chart == 'bars') && data['data'][0]['total'] == null) {
        // if pie or bar chart has no data, render nothing
        $(id + ' .ch-chart').html('');
        return;
      }
      if (chart == 'table') {
        $(id).css('height', '100%');
        $(id).css('width', '100%');
        $(id).html(formattedData);
        $(id + ' table').tablesorter({
          widgets: ['zebra'],
          sortList: [[0,0]],
          sortInitialOrder: 'desc'
        });
        var isFeatureTable = $(id).parent().attr("id") == "features-table";
        if (isFeatureTable) {
          var state = Reports.getState();
          if ($(window).width() > 1024) {
            Charts.add_csv_to_features_table(id, state['client'], state['service'], state['startDate'], state['endDate']);
          }
          Charts.help_widgets(state['service']);
        }
      }
      else if(Object.prototype.toString.call(formattedData) === '[object Array]' && chart == 'pie') {
        // draw two charts
        chartHolderInnerHtml = $(id).html();
        var types = chartHolderInnerHtml.match(/type="([^\"]*)"/)[1].split(',');
        var chartHolderInnerHtml1 = chartHolderInnerHtml;
        chartHolderInnerHtml1 = chartHolderInnerHtml1.replace(/type="[^\"]*"/, 'type="' + types[0] + '"');
        var chartHolderInnerHtml2 = chartHolderInnerHtml;
        chartHolderInnerHtml2 = chartHolderInnerHtml2.replace(/type="[^\"]*"/, 'type="' + types[1] + '"');
        $(id).html('<div style="width:33%; float:left" id="ch-chart-1-parent"><h5 align=center>' + data['data'][0]['label'] + '</h5>' + chartHolderInnerHtml1 + '</div><div style="width:33%; float:left" id="ch-chart-2-parent"><h5 align=center>' + data['data'][1]['label'] + '</h5>' + chartHolderInnerHtml2 + '</div>');
        var chartHolder1 = $('#ch-chart-1-parent .ch-chart');
        var chartHolder2 = $('#ch-chart-2-parent .ch-chart');
        $.plot(chartHolder1, formattedData[0]['data'], formattedData[0]['options']);
        $.plot(chartHolder2, formattedData[1]['data'], formattedData[1]['options']);
        chartHolder1.bind("plothover", Charts.onPlotHover('#ch-chart-1-parent'));
        chartHolder2.bind("plothover", Charts.onPlotHover('#ch-chart-2-parent'));
        var totalHolder1 = $('#ch-chart-1-parent .ch-total');
        var totalHolder2 = $('#ch-chart-2-parent .ch-total');
        var formattedTotals1 = Charts.chartTotals(data['data'][0], '#ch-chart-1-parent');
        var formattedTotals2 = Charts.chartTotals(data['data'][1], '#ch-chart-2-parent');
        totalHolder1.html(formattedTotals1);
        totalHolder2.html(formattedTotals2);
      }
      else {
        // draw one chart
        chartHolderInnerHtml = $(id).html();
        if (chart == 'pie') {
          $(id).html('<div style="width:33%; margin-left:400px; float:left" id="ch-chart-1-parent"><h5 align=center>' + data['data'][0]['label'] + '</h5>' + chartHolderInnerHtml + '</div>');
          chartHolder = $('#ch-chart-1-parent .ch-chart');
        }
        if (chart == 'bars') {
          // calculate bar chart height
          $(id + ' .ch-chart').css('height', formattedData['data'][0]['data'].length * 60 + 10);
        }
        if(chart == 'line,columns' && isMean[0] == 'true'){
          $.plot(chartHolder, formattedData['data'], formattedData['options']);
          var aux = formattedData['data'][0];
          formattedData['data'][0] = formattedData['data'][1];
          formattedData['data'][1] = aux;
        }else{
          $.plot(chartHolder, formattedData['data'], formattedData['options']);
        }
        chartHolder.bind("plothover", Charts.onPlotHover(id));
        var totalHolder = $(id + ' .ch-total');
        if(chart != 'pie'){
          var formattedTotals = Charts.chartTotals(data['data'], id);
        }else{
          var formattedTotals = Charts.chartTotals(data['data'], id, chart);
        }
        totalHolder.html(formattedTotals);
      }
    };
  },

  getState: function () {
    var dateState = Dates.getState();
    return {
      'indicator': $('#indicator-selector .active').attr('value'),
      'indicator2': $('#indicator2-selector .active').attr('value'),
      'client': $('#client-selector .active').attr('tag'),
      'service': $('#service-selector .active').attr('value'),
      'feature': $('#feature-selector .active').attr('value'),
      'base': $('#base-selector .active').attr('value'),
      'category': $('#category-selector .active').attr('value'),
      'start': dateState[0],
      'end': dateState[1],
    };
  },

  stateToUrl: function (state, async) {
    var url = '';
    url += (async === undefined) ? '' : '/async';
    url += '/ChaordicCharts?';
    url += 'indicator=' + state['indicator'];
    url += (state['indicator2'] === undefined) ? '' : '&indicator2=' + state['indicator2'];
    url += '&client=' + state['client'];
    url += '&service=' + state['service'];
    url += (state['feature'] === undefined) ? '' : '&feature=' + state['feature'];
    url += '&base=' + state['base'];
    url += (state['category'] === undefined) ? '' : '&category=' + state['category'];
    url += '&from=' + Format.dateToUrl(state['start']);
    url += '&to=' + Format.dateToUrl(state['end']);
    console.log(url);
    return url;
  },

  // stateToCsvUrl: function (state, async) {
  //   var url = '';
  //   url += (async === undefined) ? '' : '/async'; //v1/clients/saraiva/onsite/csv?from=2013-02-10&to=2013-02-28
  //   url += '/v1/clients/' + state['client'];
  //   url += '/' + state['service'] + '/csv?';
  //   url += 'from=' + Format.dateToUrl(state['start']);
  //   url += '&to=' + Format.dateToUrl(state['end']);
  //   return url;
  // },

  pushState: function (state) {
    var url = ChaordicCharts.stateToUrl(state);
    window.history.pushState(state, '', url);
    // var username = $('#user-short-name').attr('data-name');
    // _gaq.push(['_trackPageview', url]);
    // _gaq.push(['_trackEvent', 'userAcess', username]);
  },

  onPopState: function (target) {
    if (target.state) {
      Format.ajax(ChaordicCharts.stateToUrl(target.state, true), ChaordicCharts.onPopStateCallback(target.state));
    }
  },

  onPopStateCallback: function (state) {
    return function (data, textStatus, jqXHR) {
      $('#main').html(data);
      ChaordicCharts.applyFormat(state);
    };
  },

  saveCharts: function (msg){
    console.log(msg);
  },

  loadCharts: function (msg){
    console.log(msg);
  },

  deleteChart: function (msg){
    console.log(msg)
  }

};}();

