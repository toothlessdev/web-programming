import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  public getAccessTime() {
    const date: Date = new Date();

    return {
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
      day: date.getDay(),
      hour: date.getHours(),
      minute: date.getMinutes(),
      second: date.getSeconds(),
    };
  }
}
