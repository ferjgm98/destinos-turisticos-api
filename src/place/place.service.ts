import { Injectable } from '@nestjs/common';

@Injectable()
export class PlaceService {
  private readonly places = [
    {
      id: 1,
      name: 'Joya de Ceren',
      address: 'San Juan Opico',
      description: 'Joya de ceren sitio arqueologico',
      imageUrl:
        'http://c.files.bbci.co.uk/2D1B/production/_101074511_gettyimages-500097506.jpg',
    },
  ];

  findAll(): any {
    return this.places;
  }

  create(place: any): any {
    this.places.push(place);

    return place;
  }
}
