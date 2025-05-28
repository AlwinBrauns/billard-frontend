import {TestBed} from '@angular/core/testing';

import {AuthService, UserState} from './auth.service';
import {KeycloakInstance} from '../main';
import {KeycloakInitOptions, KeycloakProfile} from 'keycloak-js';
import {faker} from '@faker-js/faker/locale/de';
import Spy = jasmine.Spy;

let spyOnKeycloakInstanceInit: Spy;
let spyOnKeycloakInstanceLoadUserProfile: Spy;

beforeAll(() => {
    spyOnKeycloakInstanceInit = spyOn(KeycloakInstance, "init").and.callFake(
        function (options: KeycloakInitOptions) {
            return Promise.resolve(true);
        }
    )
    spyOnKeycloakInstanceLoadUserProfile = spyOn(KeycloakInstance, "loadUserProfile").and.callFake(
        function () {
            return Promise.resolve(<KeycloakProfile>{
                id: "0",
                username: faker.person.firstName()
            });
        }
    )
})
describe('AuthService', () => {
    let service: AuthService;

    it('should be created', () => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthService);
        expect(service).toBeTruthy();
    });

    it('should init keycloak', () => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthService);
        expect(spyOnKeycloakInstanceInit).toHaveBeenCalledWith(
            {
                onLoad: "check-sso",
                pkceMethod: "S256",
            }
        );
    })

    it('should set profile on authenticated', () => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthService);
        const spyOnLoadProfile = spyOn(service, "loadProfile").and.stub();
        expect(KeycloakInstance.onReady).toBeDefined();
        KeycloakInstance.onReady!(true);
        expect(spyOnLoadProfile).toHaveBeenCalled()
    })

    it('should load profile by keycloak', async () => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthService);
        const spyOnLoadProfile = spyOn(service, "loadProfile").and.callThrough();
        expect(KeycloakInstance.onReady).toBeDefined();
        await KeycloakInstance.onReady!(true);
        expect(spyOnLoadProfile).toHaveBeenCalled()
        expect(spyOnKeycloakInstanceLoadUserProfile).toHaveBeenCalled();
        expect(service.userState()).toEqual(UserState.LOGGED_IN_PAGE)
    })

    it('should not set profile and mark as not logged on', () => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(AuthService);
        const spyOnLoadProfile = spyOn(service, "loadProfile").and.stub();
        expect(KeycloakInstance.onReady).toBeDefined();
        KeycloakInstance.onReady!(false);
        expect(spyOnLoadProfile).not.toHaveBeenCalled();
        expect(service.userState()).toEqual(UserState.NOT_LOGGED_IN);
    })
});
