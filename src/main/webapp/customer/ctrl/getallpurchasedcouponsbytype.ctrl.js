
var module = angular.module("facade");

module.controller("getallpurchasedcouponsbytype", getallpurchasedcouponsByTypeCtrlCtor);

function getallpurchasedcouponsByTypeCtrlCtor(GetAllPurchasedCouponsByTypeSrvc, $state) {
	
	this.pcoupontype;
	
    this.coupons = GetAllPurchasedCouponsByTypeSrvc.coupons;
    this.messageGetAllCoupons = GetAllPurchasedCouponsByTypeSrvc.messageGetAllCoupons;
    this.getAllCouponsFailed = GetAllPurchasedCouponsByTypeSrvc.getAllCouponsFailed;
    
    
    this.getType = function () {
    	GetAllPurchasedCouponsByTypeSrvc.getallpurchasedcouponsbytype(this.pcoupontype);
		
	}
	
}
