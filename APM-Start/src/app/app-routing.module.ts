import {NgModule} from "@angular/core";
import {CanActivate, RouterModule} from "@angular/router";
import {WelcomeComponent} from "./home/welcome.component";
import {PageNotFoundComponent} from "./page-not-found.component";
import {AuthGuard} from "./user/auth-guard.service";

const ROUTES = [
    { path: "products", loadChildren: "./products/products.module#ProductModule", CanActivate: [AuthGuard] },
    { path: "welcome", component: WelcomeComponent },
    { path: "", redirectTo: "welcome", pathMatch: "full" },
    { path: "**", component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(ROUTES)
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {

}