import { ActivatedRoute } from '@angular/router';
import { ShopService } from './../../shop/shop.service';
import { IType } from './../../shared/models/productType';
import { IBrand } from './../../shared/models/brand';
import { IProduct, ProductFormValues } from './../../shared/models/product';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: IProduct;
  productFormValues: ProductFormValues;
  brands: IBrand[];
  types: IType[];

  constructor(private shopeService: ShopService,
    private route: ActivatedRoute) {
    this.productFormValues = new ProductFormValues();
    }

  ngOnInit(): void {
    const brands = this.getBrands();
    const types = this.getTypes();

    forkJoin([types, brands]).subscribe(
      (results) => {
        this.types = results[0];
        this.brands = results[1];
      },
      (error) => { console.log(error); },
      () => {
        if (this.route.snapshot.url[0].path === 'edit') {
          this.loadProduct();
        }
      }
    );
  }
  loadProduct() {
    this.shopeService.getProduct(+this.route.snapshot.paramMap.get('id')).subscribe(
      (response: any) => {
        const productBrandId = this.brands && this.brands.find(x => x.name === response.productBrand).id;
        const productTypeId = this.types && this.types.find(x => x.name === response.productType).id;
        this.product = response;
        this.productFormValues = { ...response, productBrandId, productTypeId };
      },
      (error) => { console.log(error); }
    );
  }

  getBrands() {
    return this.shopeService.getBrands();
  }

  getTypes() {
    return this.shopeService.getTypes();
  }

  
}

