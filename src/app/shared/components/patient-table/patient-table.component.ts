import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Store } from "@ngrx/store";
import {
  addFavoritePatientView,
  removeFavoritePatientView,
} from "../../../features/favorite/store";
import { PatientTableView } from "../../models/patient.model";

@Component({
  selector: "st-patient-table",
  templateUrl: "./patient-table.component.html",
  styleUrls: ["./patient-table.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientTableComponent implements AfterViewInit, OnChanges {
  displayedColumns: string[] = [
    "id",
    "patientName",
    "age",
    "searchedBy",
    "phone",
    "isFavorite",
  ];
  dataSource: MatTableDataSource<PatientTableView>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() patients: PatientTableView[] = [];

  constructor(private store: Store, private cdRef: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.updateTableData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.patients) {
      this.cdRef.markForCheck();

      this.updateTableData();
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addToFavorite(patient: PatientTableView) {
    this.store.dispatch(addFavoritePatientView({ patient }));
  }

  removeFromFavorite(patient: PatientTableView) {
    this.store.dispatch(removeFavoritePatientView({ patient }));
  }

  updateTableData() {
    this.dataSource = new MatTableDataSource(this.patients);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
