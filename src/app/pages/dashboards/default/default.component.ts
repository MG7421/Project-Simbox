import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ChartType } from './dashboard.model';
import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
import { EventService } from '../../../core/services/event.service';
import { ConfigService } from '../../../core/services/config.service';
import { ApplicationChart, ApprovedChart, RejectedChart, emailSentBarChart, jobViewChart, receivedTimeChart, recentJobsData, vacancyData, pieChart } from './data';
import { OrdersService } from 'src/app/core/services/orders.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerDirective } from 'ngx-bootstrap/datepicker/bs-datepicker.component';
import { EChartsOption } from 'echarts';
import { visitorsOptions } from '../blog/data';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
activeOptionButton: any;
updateOptions(arg0: string) {
}
  modalRef?: BsModalRef;
  isVisible: string;
  isDropup: boolean = true;
  isCalendarOpen: boolean = false;
  transactions: any;
  statData: any;
  config: any = {
    backdrop: true,
    ignoreBackdropClick: true
  };
  isActive: string;
  date: NgbDate;
  focused: boolean;
  calendarConfig: any;

  // Date filter
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate | null = null;

  // Chart properties
  visitorsOptions: ChartType;
  jobViewChart: ChartType;
  ApplicationChart: ChartType;
  ApprovedChart: ChartType;
  RejectedChart: ChartType;
  emailSentBarChart: ChartType;
  showNavigationArrows: any;
  showNavigationIndicators: any;
  vacancyData: any;
  receivedTimeChart: ChartType;
  recentJobsData: any;
  chartOptions: ChartType;
  pieChart: EChartsOption;

  @ViewChild('content') content;
  @ViewChild('center', { static: false }) center?: ModalDirective;
  @ViewChild('dp') dp: BsDatepickerDirective;

  constructor(
    private modalService: BsModalService,
    public service: OrdersService,
    private configService: ConfigService,
    private eventService: EventService,
  ) {}

  ngOnInit() {
    const attribute = document.body.getAttribute('data-layout');
    this.isVisible = attribute;
    const vertical = document.getElementById('layout-vertical');
    if (vertical != null) {
      vertical.setAttribute('checked', 'true');
    }
    if (attribute == 'horizontal') {
      const horizontal = document.getElementById('layout-horizontal');
      if (horizontal != null) {
        horizontal.setAttribute('checked', 'true');
      }
    }

    this._fetchData();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.center?.show();
    }, 2000);
  }

   filterDates() {
        // Ajoutez votre logique de filtrage ici
        // this.fromDate = ...;

    }


  toggleCalendar() {
    this.isCalendarOpen = !this.isCalendarOpen;
  }
  opencenterModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  changeLayout(layout: string) {
    this.eventService.broadcast('changeLayout', layout);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }

    this.filterDates(); // Filter data when date selection changes
  }

  openCalendar() {
    if (this.dp) {
      this.dp.show(); // Show the calendar popup
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }



  private _fetchData() {
    this.jobViewChart = jobViewChart;
    this.ApplicationChart = ApplicationChart;
    this.ApprovedChart = ApprovedChart;
    this.RejectedChart = RejectedChart;
    this.emailSentBarChart = emailSentBarChart;
    this.vacancyData = vacancyData;
    this.receivedTimeChart = receivedTimeChart;
    this.recentJobsData = recentJobsData;
    this.pieChart = pieChart;
    this.visitorsOptions = visitorsOptions;


    this.isActive = 'year';
    this.configService.getConfig().subscribe((data) => {
      this.transactions = data.transactions;
      this.statData = data.statData;
    });
  }

  public dateValue: Date = new Date(2022, 4, 18);
  public minDate: Date = new Date(2022, 4, 7);
  public maxDate: Date = new Date(2022, 4, 23);
}


// import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
// import { ChartType } from './dashboard.model';
// import { BsModalService, BsModalRef, ModalDirective } from 'ngx-bootstrap/modal';
// import { EventService } from '../../../core/services/event.service';
// import { ConfigService } from '../../../core/services/config.service';
// import { ApplicationChart, ApprovedChart, RejectedChart, emailSentBarChart, jobViewChart, receivedTimeChart, recentJobsData, vacancyData, pieChart } from './data';
// import { OrdersService } from 'src/app/core/services/orders.service';
// import { EChartsOption } from 'echarts';
// import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
// import * as moment from 'moment';
// import { FilterService } from 'src/app/core/services/filter.service';

// @Component({
//   selector: 'app-default',
//   templateUrl: './default.component.html',
//   styleUrls: ['./default.component.scss'],
// })
// export class DefaultComponent implements OnInit {
//   modalRef?: BsModalRef;
//   isVisible: string;
//   isDropup: boolean = true;
//   isCalendarOpen: boolean = false;
//   isActiveDate: boolean = false;

//   transactions: any;
//   statData: any;
//   config: any = {
//     backdrop: true,
//     ignoreBackdropClick: true
//   };
//   isActive: string;
//   defaultRange: string;
//   date: NgbDate;
//   focused: boolean;
//   calendarConfig: any;
//   searchData: any = {
//     start: '',
//     end: '',
//   };

//   fromDate: NgbDate;
//   toDate: NgbDate;
//   hoveredDate: NgbDate | null = null;

//   jobViewChart: ChartType;
//   ApplicationChart: ChartType;
//   ApprovedChart: ChartType;
//   RejectedChart: ChartType;
//   emailSentBarChart: ChartType;
//   showNavigationArrows: any;
//   showNavigationIndicators: any;
//   vacancyData: any;
//   receivedTimeChart: ChartType;
//   recentJobsData: any;
//   chartOptions: ChartType;
//   pieChart: EChartsOption;

//   @ViewChild('content') content;
//   @ViewChild('center', { static: false }) center?: ModalDirective;

//   constructor(
//     private modalService: BsModalService,
//     public service: OrdersService,
//     private configService: ConfigService,
//     private eventService: EventService,
//     private filterService: FilterService
//   ) {}

//   ngOnInit() {
//     const attribute = document.body.getAttribute('data-layout');
//     this.isVisible = attribute;
//     const vertical = document.getElementById('layout-vertical');
//     if (vertical != null) {
//       vertical.setAttribute('checked', 'true');
//     }
//     if (attribute == 'horizontal') {
//       const horizontal = document.getElementById('layout-horizontal');
//       if (horizontal != null) {
//         horizontal.setAttribute('checked', 'true');
//       }
//       console.log('ngOnInit');
//       if (this.defaultRange) {
//         console.log('Default Range:', this.defaultRange);
//       }
//     }

//     this._fetchData();
//   }

//   ngAfterViewInit() {
//     setTimeout(() => {
//       this.center?.show();
//     }, 2000);
//   }

//   toggleCalendar() {
//     this.isCalendarOpen = !this.isCalendarOpen;
//   }

//   opencenterModal(template: TemplateRef<any>) {
//     this.modalRef = this.modalService.show(template);
//   }

//   changeLayout(layout: string) {
//     this.eventService.broadcast('changeLayout', layout);
//   }

//   onDateSelection(date: NgbDate) {
//     if (!this.fromDate && !this.toDate) {
//       this.fromDate = date;
//     } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
//       this.toDate = date;
//     } else {
//       this.toDate = null;
//       this.fromDate = date;
//     }
//   }

//   openCalendar() {
//     this.isActiveDate = true;
//   }

//   onPeriodeEmitted(event) {
//     console.log('event', event);
//     this.searchData.start = moment(event.start).format('DD/MM/YYYY');
//     this.searchData.end = moment(event.end).format('DD/MM/YYYY');
//     console.log('start', this.searchData.start);
//     console.log('end', this.searchData.end);

//     const selectedMonth = this.calculateSelectedMonth();
//     this.filterService.setSelectedMonth(selectedMonth);

//     const selectedDays = this.calculateSelectedDays();
//     this.filterService.setDays(selectedDays);

//     if (this.isActiveDate) {
//       this.getItems(this.searchData);
//     }
//   }

//   private calculateSelectedMonth(): number | null {
//     const startDate = moment(this.searchData.start, 'DD/MM/YYYY');
//     return startDate.month() + 1;
//   }

//   private calculateSelectedDays(): number[] {
//     // Implement the logic to calculate selected days based on the date range
//     return [];
//   }

//   private _fetchData() {
//     this.jobViewChart = jobViewChart;
//     this.ApplicationChart = ApplicationChart;
//     this.ApprovedChart = ApprovedChart;
//     this.RejectedChart = RejectedChart;
//     this.emailSentBarChart = emailSentBarChart;
//     this.vacancyData = vacancyData;
//     this.receivedTimeChart = receivedTimeChart;
//     this.recentJobsData = recentJobsData;
//     this.pieChart = pieChart;

//     this.isActive = 'year';
//     this.configService.getConfig().subscribe((data) => {
//       this.transactions = data.transactions;
//       this.statData = data.statData;
//     });
//   }

//   getItems(searchData: any) {
//     console.log('Fetching items for date range:', searchData);
//     // Implement the logic to fetch items based on the date range
//   }
// }
