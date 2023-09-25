import { Injectable } from "@nestjs/common";
import { lastValueFrom } from "rxjs";
import { HttpService } from '@nestjs/axios';

@Injectable()
export class UserValidatorService {
    constructor(private readonly httpService: HttpService) { }

    async validateByUserId(id: number) {
        return await lastValueFrom(
            this.httpService.get(`http://api_gateway/users/${id}`),
        );
    }
}