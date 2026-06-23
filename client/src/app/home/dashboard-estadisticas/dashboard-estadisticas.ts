import { Component, inject, OnInit, signal, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstadisticasService } from '../../services/estadisticas.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard-estadisticas',
  imports: [FormsModule],
  templateUrl: './dashboard-estadisticas.html',
  styleUrl: './dashboard-estadisticas.css',
})
export class DashboardEstadisticas implements OnInit {

  estadisticasService = inject(EstadisticasService);

  fechaInicio = '';
  fechaFin = '';

  grafico1: any = null;
  grafico2: any = null;
  grafico3: any = null;

  @ViewChild('canvas1') canvas1!: ElementRef;
  @ViewChild('canvas2') canvas2!: ElementRef;
  @ViewChild('canvas3') canvas3!: ElementRef;

  ngOnInit() {
    const hoy = new Date();
    const hace30dias = new Date();
    hace30dias.setDate(hoy.getDate() - 30);
    this.fechaFin = hoy.toISOString().split('T')[0];
    this.fechaInicio = hace30dias.toISOString().split('T')[0];
  }

  buscar() {
    if(!this.fechaInicio || !this.fechaFin) return;
    this.cargarGrafico1();
    this.cargarGrafico2();
    this.cargarGrafico3();
  }

  cargarGrafico1() {
    this.estadisticasService.publicacionesPorUsuario(this.fechaInicio, this.fechaFin)
      .subscribe({
        next: (data: any) => {
          console.log('grafico1 data:', data);
          if(this.grafico1) this.grafico1.destroy();
          this.grafico1 = new Chart(this.canvas1.nativeElement, {
            type: 'bar',
            data: {
              labels: data.map((d: any) => d.nombre),
              datasets: [{
                label: 'Publicaciones por usuario',
                data: data.map((d: any) => d.cantidad),
                backgroundColor: '#3d7ab5',
              }]
            }
          });
        },
        error: (e) => console.log(e)
      });
  }

  cargarGrafico2() {
    this.estadisticasService.comentariosPorPeriodo(this.fechaInicio, this.fechaFin)
      .subscribe({
        next: (data: any) => {
          if(this.grafico2) this.grafico2.destroy();
          this.grafico2 = new Chart(this.canvas2.nativeElement, {
            type: 'line',
            data: {
              labels: data.map((d: any) => d._id),
              datasets: [{
                label: 'Comentarios por día',
                data: data.map((d: any) => d.cantidad),
                borderColor: '#3d7ab5',
                fill: false,
              }]
            }
          });
        },
        error: (e) => console.log(e)
      });
  }

  cargarGrafico3() {
    this.estadisticasService.comentariosPorPublicacion(this.fechaInicio, this.fechaFin)
      .subscribe({
        next: (data: any) => {
          if(this.grafico3) this.grafico3.destroy();
          this.grafico3 = new Chart(this.canvas3.nativeElement, {
            type: 'pie',
            data: {
              labels: data.map((d: any) => d.titulo),
              datasets: [{
                label: 'Comentarios por publicación',
                data: data.map((d: any) => d.cantidad),
                backgroundColor: ['#3d7ab5', '#8fa5b8', '#b8c9d9', '#cddae8', '#9ab0c4'],
              }]
            }
          });
        },
        error: (e) => console.log(e)
      });
  }
}