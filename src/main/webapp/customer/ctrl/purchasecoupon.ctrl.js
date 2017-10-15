var module = angular.module("facade");

module.controller("purchasecoupon", purchasecouponCtrlCtor)

function purchasecouponCtrlCtor(GetAllCouponsSrvc, PurchaseCouponSrvc) {
   
    this.coupons = GetAllCouponsSrvc.coupons;
    this.messageGetAllCoupons = GetAllCouponsSrvc.messageGetAllCoupons;
    this.getAllCouponsFailed = GetAllCouponsSrvc.getAllCouponsFailed;
    this.messagePurchaseCoupon = PurchaseCouponSrvc.messagePurchaseCoupon;
    this.purchaseCouponFailed =  PurchaseCouponSrvc.purchaseCouponFailed;
    this.purchaseCouponSucceed =  PurchaseCouponSrvc.purchaseCouponSucceed;


    this.getAllCoupons = function () {
    	GetAllCouponsSrvc.getallcoupons();
    }

    this.buyCoupon = function (coup) {
    	//rest flag here
    	PurchaseCouponSrvc.purchasecoupon(coup);

    }
    this.getAllCoupons();
}
