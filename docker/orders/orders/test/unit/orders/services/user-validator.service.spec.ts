import { HttpModule, HttpService } from "@nestjs/axios";
import { Test, TestingModule } from "@nestjs/testing";
import { UserValidatorService } from "../../../../src/orders/services/user-validator.service";
import { of } from 'rxjs';
import { AxiosError } from "axios";
import { INVALID_USER_ID, mockResponse, VALID_USER_ID } from "./mock/user-validator.mock";


describe("UserValidatorService", () => {
    let service: UserValidatorService;
    let httpService: HttpService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [
                UserValidatorService,
            ],
        }).compile();

        service = app.get<UserValidatorService>(UserValidatorService);
        httpService = app.get<HttpService>(HttpService);
    });

    describe("validateByUserId", () => {
        it('should not to throw an error if user exists', () => {
            jest.spyOn(httpService, 'get').mockImplementation(() => of(mockResponse));

            expect(async () => await service.validateByUserId(VALID_USER_ID)).not.toThrowError();
        });

        it('should throw an error if user does not exists', () => {
            jest.spyOn(httpService, 'get').mockReturnValueOnce(new AxiosError() as any);

            expect(async () => await service.validateByUserId(INVALID_USER_ID)).rejects.toThrowError();
        });
    });
});


