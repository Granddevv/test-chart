import { Component, OnInit, Output } from '@angular/core';
import { Analyze, AnalyzeData } from 'src/app/core/models/analyze';
import { AnalyzeService } from "src/app/core/services/analyze.service";
import * as Highcharts from 'highcharts';
import { ActivatedRoute } from '@angular/router';

declare module 'highcharts' {
  interface Point {
    highlight: (event: Highcharts.PointerEventObject) => void;
  }
}

Highcharts.Pointer.prototype.reset = function() {
  return undefined;
};

Highcharts.Point.prototype.highlight = function(event) {
  event = this.series.chart.pointer.normalize(event);
  this.onMouseOver();
  this.series.chart.tooltip.refresh(this);
  this.series.chart.xAxis[0].drawCrosshair(event, this);
};

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})

export class AnalyzeComponent implements OnInit {
  isLoading = false;
  isFetched = false;
  coverageData: number[];
  elevationData: number[];
  coverageOption: any;
  elevationOption: any;
  analyzeOption: any;
  method: string;
  Highcharts = Highcharts;

  bgColor ='transparent'

  constructor(
    private analyzeService: AnalyzeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadDataObservable();
    // this.loadData();
    this.method = this.route.snapshot.params.id;
  }

  loadDataObservable = () => {
    this.analyzeService.getAnalyzeData().subscribe(
      data => {
        this.coverageData = data.results.map(item => item.datacoverage);
        this.elevationData = data.results.map(item => item.elevation);
        this.isFetched = true;
        this.syncData();
      },
      error => {
        console.log("error occurred", error)
      },
      () => {
        this.isLoading = true;
      }
    )
  }

  colorChange() {
    this.bgColor = 'red';
  }

  async loadData() {
    try {
      this.isLoading = true;
      const responseData: Analyze = await this.analyzeService.getAnalyzeData().toPromise();
      this.coverageData = responseData.results.map(item => item.datacoverage);
      this.elevationData = responseData.results.map(item => item.elevation);
      this.isFetched = true;
      this.syncData();
    } catch (e) {

    } finally {
      this.isLoading = false;
    }
  }

  synchronizeTooltips = e => {
    var chart,
      point,
      i,
      event,
      charts = Highcharts.charts,
      sourceChart = charts[(Highcharts as any).hoverChartIndex];

    for (i = 0; i < charts.length; i = i + 1) {
      chart = charts[i];

      if (chart && chart.options.chart.className === sourceChart.options.chart.className) {
        event = chart.pointer.normalize(e);
        point = chart.series[0].searchPoint(event, true);
        if (point) {
          point.highlight(e);
        }
      }
    }
  };

  syncData = () => {

    this.coverageOption = {
      chart: {
        marginLeft: 40,
        spacingTop: 20,
        spacingBottom: 20,
        className: "chart-sync-a"
      },
      title: {
        text: "Coverage Data",
        align: "left",
        margin: 0,
        x: 30
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      xAxis: {
        crosshair: true,
        events: {
          setExtremes: function(e) {
            var thisChart = this.chart;

            if (e.trigger !== "syncExtremes") {
              Highcharts.each(Highcharts.charts, function(chart) {
                if (chart !== thisChart && chart.options.chart.className === thisChart.options.chart.className) {
                  if (chart.xAxis[0].setExtremes) {
                    chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
                      trigger: "syncExtremes"
                    });
                  }
                }
              });
            }
          }
        },
        labels: {
          format: "{value}"
        }
      },
      yAxis: {
        title: {
          text: null
        }
      },
      tooltip: {
        positioner: function() {
          return {
            x: this.chart.chartWidth - this.label.width,
            y: 10
          };
        },
        borderWidth: 0,
        backgroundColor: "none",
        pointFormat: "{point.y}",
        headerFormat: "",
        shadow: false,
        style: {
          fontSize: "18px"
        }
      },
      series: [
        {
          data: this.coverageData,
          name: "Sync group A"
        }
      ]
    };

    this.elevationOption = {
      chart: {
        marginLeft: 40,
        spacingTop: 20,
        spacingBottom: 20,
        className: "chart-sync-a"
      },
      title: {
        text: "Elevation Data",
        align: "left",
        margin: 0,
        x: 30
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      xAxis: {
        crosshair: true,
        events: {
          setExtremes: function(e) {
            var thisChart = this.chart;

            if (e.trigger !== "syncExtremes") {
              Highcharts.each(Highcharts.charts, function(chart) {
                if (chart !== thisChart && chart.options.chart.className === thisChart.options.chart.className) {
                  if (chart.xAxis[0].setExtremes) {
                    chart.xAxis[0].setExtremes(e.min, e.max, undefined, false, {
                      trigger: "syncExtremes"
                    });
                  }
                }
              });
            }
          }
        },
        labels: {
          format: "{value}"
        }
      },
      yAxis: {
        title: {
          text: null
        }
      },
      tooltip: {
        positioner: function() {
          return {
            x: this.chart.chartWidth - this.label.width,
            y: 10
          };
        },
        borderWidth: 0,
        backgroundColor: "none",
        pointFormat: "{point.y}",
        headerFormat: "",
        shadow: false,
        style: {
          fontSize: "18px"
        }
      },
      series: [
        {
          data: this.elevationData,
          name: "Elevation Data"
        }
      ]
    };

    this.analyzeOption = {
      title : { text : 'Analyze' },
      tooltip: {
        shared: true
      },
      yAxis: [{
        title: {
          text: 'Elevation'
        },
        labels: ['Elevation'],
        height: 200,
        lineWidth: 2
      }, {
        title: {
          text: 'Coverage'
        },
        labels: ['Elevation'],
        top: 300,
        height: 200,
        offset: 0,
        lineWidth: 2
      }],
      series: [{
        data: this.elevationData,
        yAxis : 0,
      }, {
        data : this.coverageData,
        yAxis : 1
      }]
    }
  }
}
