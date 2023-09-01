import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class HttpService {
  async makeHttpRequest(
    url: string,
    method: string = 'get',
    data?: any,
  ): Promise<any> {
    const response = await axios({
      method,
      url,
      data,
    });
    return response.data;
  }
}
