import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { DatabaseService } from 'src/app/shared/service/database.service';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
    selector: 'app-temperature',
    templateUrl: './temperature.component.html',
    styleUrls: ['./temperature.component.css'],
})
export class TemperatureComponent implements OnInit {
    temperatures: any[];
    hasRow: boolean = false;

    dataChart: any[];
    labelChartData: ChartDataSets[] = [{ data: [], label: 'Temperatura' }];
    lineChartLabels: Label[];
    displayedCols: string[] = ['date', 'data'];
    lineChartOptions = {
        responsive: true,
    };
    lineChartColors: Color[] = [
        { borderColor: 'black', backgroundColor: 'rgba(255,0,0,0.3)' },
    ];
    lineChartLegend = true;
    lineChartPlugins = [];
    lineChartType = 'line';

    constructor(public dbService: DatabaseService, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.dbService.getHealth('temperature').subscribe((snapshot) => {
            this.temperatures = snapshot;
            this.hasRow = this.temperatures.length > 0;

            this.dataChart = [];
            this.lineChartLabels = [];
            this.temperatures.forEach((item) => {
                this.lineChartLabels.push(item.date);
                this.dataChart.push(item.data);
            });
            this.labelChartData[0].data = this.dataChart;
        });
    }

    openPopup(): void {
        const dialogRef = this.dialog.open(DialogTemperature);
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                var dateObj = new Date();
                var currentDate = `${dateObj.getDate()}/${
                    dateObj.getMonth() + 1
                }/${dateObj.getFullYear()}`;

                this.dbService.setHealth(
                    { date: currentDate, data: res },
                    'temperature'
                );
            }
        });
    }
}

@Component({
    selector: 'dialogTemperature',
    templateUrl: 'dialogTemperature.component.html',
})
export class DialogTemperature {
    res: number;
    constructor(public dialogRef: MatDialogRef<DialogTemperature>) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
