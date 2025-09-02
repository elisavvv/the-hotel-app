import { Component, AfterViewInit } from '@angular/core';

declare const ymaps: any; 

@Component({
  selector: 'app-contacts',
  standalone: true,
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements AfterViewInit {
  private apiKey = '365f5c07-2456-4938-a81c-b04acec14b9a'; 
  private hotelCoords = [25.113424, 55.192661]; 

  ngAfterViewInit(): void {
    this.loadYandexMap();
  }

  private loadYandexMap(): void {
    // Проверяем, не загружен ли API уже
    if (typeof ymaps !== 'undefined') {
      this.initMap();

      return;
    }

    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${this.apiKey}&lang=ru_RU`;
    script.onload = (): void => this.initMap();
    document.body.appendChild(script);
  }

  private initMap(): void {
    ymaps.ready(() => {
      const map = new ymaps.Map('map', {
        center: this.hotelCoords,
        zoom: 15,
        controls: ['zoomControl']
      });

      const placemark = new ymaps.Placemark(
        this.hotelCoords,
        {
          hintContent: 'Отель Grand Cosmopolitan',
          balloonContent: `
            <strong>Grand Cosmopolitan</strong><br>
            <em>Роскошный отель в центре города</em>
          `
        },
        {
          preset: 'islands#redHotelIcon'
        }
      );

      map.geoObjects.add(placemark);
    });
  }
}