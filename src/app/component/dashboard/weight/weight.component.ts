import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { DatabaseService } from 'src/app/shared/service/database.service';

@Component({
    selector: 'app-weight',
    templateUrl: './weight.component.html',
    styleUrls: ['./weight.component.css'],
})
export class WeightComponent implements OnInit {
    hasRow: boolean = false;
    weights: any[];
    dataChart: any[];
    labelChartData: ChartDataSets[] = [{ data: [], label: 'Weight' }];
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
        this.dbService.getHealth('weight').subscribe((snapshot) => {
            this.weights = snapshot;
            this.hasRow = this.weights.length > 0;
            this.dataChart = [];
            this.lineChartLabels = [];
            this.weights.forEach((weight) => {
                this.lineChartLabels.push(weight.date);
                this.dataChart.push(weight.data);
            });
            this.labelChartData[0].data = this.dataChart;
        });
    }

    openPopup(): void {
        const dialogRef = this.dialog.open(DialogWeight);
        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                var dateObj = new Date();
                var currentDate = `${dateObj.getDate()}/${
                    dateObj.getMonth() + 1
                }/${dateObj.getFullYear()}`;

                this.dbService.setHealth(
                    { date: currentDate, data: res },
                    'weight'
                );
            }
        });
    }
}

@Component({
    selector: 'dialogWeight',
    templateUrl: 'dialogWeight.component.html',
})
export class DialogWeight {
    res: number;
    constructor(public dialogRef: MatDialogRef<DialogWeight>) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
