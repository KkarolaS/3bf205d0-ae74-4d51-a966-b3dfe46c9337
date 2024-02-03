export class EventParty {
  public title: string;
  public date: string;
  public city: string;
  public imgUrl: string;
  public directionUrl: string;
  public directionName: string;
  public startTime: string;
  public endTime: string;

  constructor(
    title: string,
    date: string,
    city: string,
    imgUrl: string,
    directUrl: string,
    directName: string,
    startTime: string,
    endTime: string
  ) {
    this.title = title;
    this.date = date;
    this.city = city;
    this.imgUrl = imgUrl;
    this.directionUrl = directUrl;
    this.directionName = directName;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
