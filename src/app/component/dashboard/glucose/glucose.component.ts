import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/shared/service/database.service';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'glucose',
    templateUrl: './glucose.component.html',
    styleUrls: ['./glucose.component.css'],
})
export class GlucoseComponent implements OnInit {
    hasRow: boolean = false;
    glucoses: any[];
    dataChart: any[];
    labelChartData: ChartDataSets[] = [{ data: [], label: 'Glucosa' }];
    lineChartLabels: Label[];
    displayedCols: string[] = ['date', 'data'];
    lineChartOptions = {
        responsive: true,
    };
    lineChartColors: Color[] = [
        {
            borderColor: 'black',
            backgroundColor: 'rgba(255,255,0,0.28)',
        },
    ];
    lineChartLegend = true;
    lineChartPlugins = [];
    lineChartType = 'line';

    constructor(public dbService: DatabaseService, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.dbService.getHealth('glucose').subscribe((snapshot) => {
            this.glucoses = snapshot;
            this.hasRow = this.glucoses.length > 0;
            this.dataChart = [];
            this.lineChartLabels = [];
            this.glucoses.forEach((glucose) => {
                this.lineChartLabels.push(glucose.date);
                this.dataChart.push(glucose.data);
            });
            this.labelChartData[0].data = this.dataChart;
        });
    }

    openPopup(): void {
        const dialogRef = this.dialog.open(DialogGlucose);

        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                var dateObj = new Date();
                var currentDate = `${dateObj.getDate()}/${
                    dateObj.getMonth() + 1
                }/${dateObj.getFullYear()}`;

                this.dbService.setHealth(
                    { date: currentDate, data: res },
                    'glucose'
                );
            }
        });
    }
}

@Component({
    selector: 'dialogGlucose',
    templateUrl: 'dialogGlucose.component.html',
})
export class DialogGlucose {
    res: number;
    constructor(public dialogRef: MatDialogRef<DialogGlucose>) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    resultData() {
        this.dialogRef.close(this.res);
    }
}
