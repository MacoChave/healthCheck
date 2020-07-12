import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { BloodPressure } from 'src/app/models/health';
import { ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { DatabaseService } from 'src/app/shared/service/database.service';

@Component({
    selector: 'blood-pressure',
    templateUrl: './blood-pressure.component.html',
    styleUrls: ['./blood-pressure.component.css'],
})
export class BloodPressureComponent implements OnInit {
    hasRow: boolean = false;
    bloodPressures: any[];
    minChart: any[];
    maxChart: any[];
    labelChartData: ChartDataSets[] = [
        { data: [], label: 'Mínima' },
        { data: [], label: 'Máxima' },
    ];
    lineChartLabels: Label[];
    displayedCols: string[] = ['min', 'max', 'date'];
    lineChartOptions = { responsive: true };
    lineChartColors: Color[] = [
        { borderColor: 'black', backgroundColor: 'rgba(255,0,0,0.3)' },
    ];
    lineChartLegend: true;
    lineChartPlugins = [];
    lineChartType = 'line';

    constructor(public dbService: DatabaseService, public dialog: MatDialog) {}

    ngOnInit(): void {
        this.dbService.getHealth('bloodPressure').subscribe((snapshot) => {
            this.bloodPressures = snapshot;
            this.hasRow = this.bloodPressures.length > 0;
            this.minChart = [];
            this.maxChart = [];
            this.lineChartLabels = [];
            this.bloodPressures.forEach((bloodPress: BloodPressure) => {
                this.minChart.push(bloodPress.min);
                this.maxChart.push(bloodPress.max);
                this.lineChartLabels.push(bloodPress.date);
            });
            this.labelChartData[0].data = this.minChart;
            this.labelChartData[1].data = this.maxChart;
        });
    }

    openPopup(): void {
        const dialogRef = this.dialog.open(DialogBloodPress);

        dialogRef.afterClosed().subscribe((res) => {
            if (res) {
                var dateObj = new Date();
                var currentDate = `${dateObj.getDate()}/${
                    dateObj.getMonth() + 1
                }/${dateObj.getFullYear()}`;

                this.dbService.setHealth(
                    { date: currentDate, min: res.min, max: res.max },
                    'bloodPressure'
                );
            }
        });
    }
}

@Component({
    selector: 'bloodPressure',
    templateUrl: 'dialogBloodPress.component.html',
})
export class DialogBloodPress {
    res: BloodPressure = {
        date: '',
        max: 0,
        min: 0,
    };
    constructor(public dialogRef: MatDialogRef<DialogBloodPress>) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
