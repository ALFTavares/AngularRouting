import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from "@angular/router";
import {IProduct} from "./product";
import {Observable} from "rxjs/Observable";
import {ProductService} from "./product.service";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductResolver implements Resolve<IProduct> {
    constructor(private productService: ProductService,
                private router: Router) {
    }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<IProduct> | Promise<IProduct> | IProduct {
        let id = route.params['id'];
        if (isNaN(id)) {
            this.router.navigate(['/products']);
            return Observable.of(null);
        }
        return this.productService.getProduct(+id)
            .map(product => {
                if (product)
                    return product;
                console.log(`product was not found: ${id}`);
                this.router.navigate(['/products']);
                return product;
            })
            .catch(error => {
                console.log(`retrieval error: ${error}`);
                this.router.navigate(['/products']);
                return Observable.of(null);
            });
    }
}