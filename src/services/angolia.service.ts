import axios from 'axios';

export default class TrackerService {
  private url = 'https://hn.algolia.com/api/v1/';

  search(keyword: string) {
    const endPoint = `search?query=${keyword}`;
    return axios.get(this.url + endPoint);
  }
}