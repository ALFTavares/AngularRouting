import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanLoad {
    constructor(private auth: AuthService,
                private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLoggedIn(state.url);
    }

    private checkLoggedIn(url: string): boolean {
        if (this.auth.isLoggedIn())
            return true;

        this.auth.redirectUrl = url
        this.router.navigate(['/login']);
        return false;
    }

    canLoad(route: Route): boolean {
        return this.checkLoggedIn(route.path);
    }
}