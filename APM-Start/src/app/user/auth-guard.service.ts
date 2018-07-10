import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
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
}