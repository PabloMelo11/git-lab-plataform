import { UseGuards } from '@nestjs/common';

import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Mutation,
  Args,
} from '@nestjs/graphql';

import { AuthorizationGuard } from '../../../http/auth/authorization.guard';

import { PurchasesService } from '../../../services/purchases.service';
import { ProductsService } from '../../../services/products.service';
import { CustomersService } from '../../../services/customers.service';

import { Purchase } from '../models/purchase';

import { CreatePurchaseInput } from '../inputs/create-purchase-input';

import { AuthUser, CurrentUser } from '../../auth/current-user';

@Resolver(() => Purchase)
export class PurchasesResolver {
  constructor(
    private purchasesService: PurchasesService,
    private productService: ProductsService,
    private customersService: CustomersService,
  ) {}

  @Query(() => [Purchase])
  @UseGuards(AuthorizationGuard)
  purchases() {
    return this.purchasesService.listAllPurchases();
  }

  @Mutation(() => Purchase)
  @UseGuards(AuthorizationGuard)
  async createPurchase(
    @CurrentUser() user: AuthUser,
    @Args('data') data: CreatePurchaseInput,
  ) {
    let customer = await this.customersService.getCustomerByAuthUserId(
      user.sub,
    );

    if (!customer) {
      customer = await this.customersService.createCustomer({
        authUserId: user.sub,
      });
    }

    return this.purchasesService.createPurchase({
      productId: data.productId,
      customerId: customer.id,
    });
  }

  @ResolveField()
  product(@Parent() purchase: Purchase) {
    return this.productService.getProductById(purchase.productId);
  }
}
