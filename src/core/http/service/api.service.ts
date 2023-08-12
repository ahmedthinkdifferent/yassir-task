import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ApiService {
  async get<TRes>(data: { url: string; queryParams?: Record<string, any> }) {
    try {
      const res = await axios.get(data.url, {
        params: data.queryParams,
      });
      return res.data as TRes;
    } catch (e) {
      throw e;
    }
  }
}
