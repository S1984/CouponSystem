//alert("alart from customer getallpurchasedcoupons ctrl");

var module = angular.module("facade");

module.controller("getallpurchasedcoupons", getallpurchasedcouponsCtrlCtor);

function getallpurchasedcouponsCtrlCtor(GetAllPurchasedCouponsSrvc, $state) {
	this.coupons = [];
	var self = this;

	
    this.coupons = GetAllPurchasedCouponsSrvc.coupons;
    this.messageGetAllCoupons = GetAllPurchasedCouponsSrvc.messageGetAllCoupons;
    this.getAllCouponsFailed = GetAllPurchasedCouponsSrvc.getAllCouponsFailed;
    
    
    this.getallpurchasedcoupons = function () {
    	GetAllPurchasedCouponsSrvc.getallpurchasedcoupons();
		
	}
	
}
