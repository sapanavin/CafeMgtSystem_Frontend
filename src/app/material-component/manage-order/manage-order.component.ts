import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category.service';
import { ProductComponent } from '../dialog/product/product.component';
import { ProductService } from 'src/app/services/product.service';
import { BillService } from 'src/app/services/bill.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { saveAs } from 'file-saver';
import { MatTableDataSource } from '@angular/material/table';
 
@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit{
    displayedColumns: string[] =['name','category','price','quantity','total','edit'];
    dataSource: any=[];
    manageOrderForm:any = FormGroup;
    categorys: any =[];
    products: any =[];
    price :any;
    totalAmount:number = 0;
    responseMessage: any;

    constructor(private formBuilder: FormBuilder,
      private categoryService: CategoryService,
      private productService: ProductService,
      private billService: BillService,
      private ngxService: NgxUiLoaderService,
      private snackbarService: SnackbarService,
       ){}
      ngOnInit(): void {
        console.log("From manage order component ng onit");
        this.ngxService.start();
        this.getCategorys();
        this.manageOrderForm = this.formBuilder.group({
          name:[null,[Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
          email:[null,[Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
          contactNumber:[null,[Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
          paymentMethod:[null,[Validators.required]],
          product:[null,[Validators.required]],
          category:[null,[Validators.required]],
          quantity:[null,[Validators.required]],
          price:[null,[Validators.required]],
          total:[0,[Validators.required]],
        })
       
      }

      getCategorys(){
        this.categoryService.getFilterdCategorys().subscribe((response:any)=>{
          this.ngxService.stop();
          this.categorys= response;
          console.log("getCategorys()",response);
        },(error:any)=>{
          this.ngxService.stop();
          console.log(error);
          if(error.error?.messge){
            this.responseMessage = error.error?.message;
          }
          else{
            this.responseMessage = GlobalConstants.genericError;
          }
          this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
        })

      }
      getProductByCategory(value: any){
        this.productService.getProductsByCategory(value.id).subscribe((response:any)=>{
          this.products = response;
          console.log("from getProductByCategory products = ",this.products);
          this.manageOrderForm.controls['price'].setValue('');
          this.manageOrderForm.controls['quantity'].setValue('');
          this.manageOrderForm.controls['total'].setValue(0);
        },(error:any)=>{
          this.ngxService.stop();
          console.log(error);
          if(error.error?.messge){
            this.responseMessage = error.error?.message;
          }
          else{
            this.responseMessage = GlobalConstants.genericError;
          }
          this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
        })
      }
      getProductDetails(value: any){
        this.productService.getById(value.id).subscribe((response:any)=>{
          this.price = response.price;
          this.manageOrderForm.controls['price'].setValue(response.price);
          this.manageOrderForm.controls['quantity'].setValue('1');
          this.manageOrderForm.controls['total'].setValue(this.price * 1);
        },(error:any)=>{
          this.ngxService.stop();
          console.log(error);
          if(error.error?.messge){
            this.responseMessage = error.error?.message;
          }
          else{
            this.responseMessage = GlobalConstants.genericError;
          }
          this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
        })
      }

      setQuantity(value: any){
        var temp = this.manageOrderForm.controls['quantity'].value;
        if(temp > 0){
          this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
        }
        else if(temp != ''){
          this.manageOrderForm.controls['quantity'].setValue('1');
          this.manageOrderForm.controls['total'].setValue(this.manageOrderForm.controls['quantity'].value * this.manageOrderForm.controls['price'].value);
        
        }
      }
      
      validateProductAdd(){
          if(this.manageOrderForm.controls['total'].value === 0 || this.manageOrderForm.controls['total'].value === null ||
           this.manageOrderForm.controls['quantity'].value <= 0){
         return true;
          }
          else{
            return false;
          }
        }
        validateSubmit(){
          if(this.totalAmount === 0 || this.manageOrderForm.controls['name'].value === null ||this.manageOrderForm.controls['email'].value === null ||
              this.manageOrderForm.controls['contactNumber'].value === null ||this.manageOrderForm.controls['paymentMethod'].value === null ){
                           
               return true;
           }
           else{
            return false;
           }
        }

        add(){
          
              var formData = this.manageOrderForm.value;
              //this.dataSource=new MatTableDataSource(formData);;
              //this.dataSource = new MatTableDataSource(response);
              console.log("from add formData is ====",formData);
              console.log("from add this.dataSource is ====",this.dataSource);
              var productName = this.dataSource.find((e:{ id : number})  => e.id === formData.product.id);
              
              if(productName === undefined){
                this.totalAmount = this.totalAmount + formData.total;
                this.dataSource.push({id: formData.product.id,
                                      name: formData.product.name,
                                      category:  formData.category.name,
                                      quantity: formData.quantity,
                                      price: formData.price,
                                      total: formData.total});
                this.dataSource = [...this.dataSource];
                this.snackbarService.openSnackBar(GlobalConstants.productAdded, "success");
              }
              else{
                this.snackbarService.openSnackBar(GlobalConstants.productExistError,GlobalConstants.error);
              }
        }
        
        handleDeleteAction(value: any, element:any){
          this.totalAmount = this.totalAmount =element.total;
          this.dataSource.splice(value,1);
          this.dataSource = [...this.dataSource];
        }
        submitAction(){
          var formData = this.manageOrderForm.value;

          console.log("From submit action",formData);
          var data={
            name: formData.name,
            email: formData.email,
            contactNumber: formData.contactNumber,
            paymentMethod: formData.paymentMethod,
            totalAmount: formData.total,
            productDetails : JSON.stringify(this.dataSource)

          }
          console.log("From submit action  DAta=====>",data);
          this.ngxService.start();
          this.billService.generateReport(data).subscribe((response:any)=>{
              this.downloadFile(response?.uuid);
              this.manageOrderForm.reset();
              this.dataSource =[];
              this.totalAmount = 0;
          },(error:any)=>{
            this.ngxService.stop();
            console.log(error);
            if(error.error?.messge){
              this.responseMessage = error.error?.message;
            }
            else{
              this.responseMessage = GlobalConstants.genericError;
            }
            this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
          })
        }
  downloadFile(fileName: any) {
      var data={
        uuid:fileName
      }

      this.billService.getPdf(data).subscribe((response: any)=>{
        saveAs(response, fileName + '.pdf');
        this.ngxService.stop();
      })
  }
    

}
