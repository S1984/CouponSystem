//(function() {
//
//	var module = angular.module("facade");
//
//	// alert("alart from customer getallpurchasedcouponsbyprice ctrl");
//
//	module.controller("getallpurchasedcouponsbyprice",
//			getallpurchasedcouponsbyprice);
//
//	function getallpurchasedcouponsbyprice(customerServices, $state) {
//		this.couponsByPrice = [];
//		var self = this;
//		this.pprice = undefined
//
//		this.getprice = function() {
//
//			var promise = customerServices
//					.getallpurchasedcouponsbyprice(this.pprice)
//			promise.then(function(resp) {
//
//				self.couponsByPrice = resp.data;
//				self.pprice = undefined;
//			}, function(err) {
//				alert('failed to get all purchased coupons by price')
//			});
//
//		}
//
//	}
//
//})();


var module = angular.module("facade");

module.controller("getallpurchasedcouponsbyprice", getallpurchasedcouponsCtrlCtor);

function getallpurchasedcouponsCtrlCtor(GetAllPurchasedCouponsByPriceSrvc, $state) {

	var self = this;
	this.pprice = undefined;

	
    this.coupons = GetAllPurchasedCouponsByPriceSrvc.coupons;
    this.messageGetAllCoupons = GetAllPurchasedCouponsByPriceSrvc.messageGetAllCoupons;
    this.getAllCouponsFailed = GetAllPurchasedCouponsByPriceSrvc.getAllCouponsFailed;
    
    
    this.getprice = function () {
    	GetAllPurchasedCouponsByPriceSrvc.getallpurchasedcouponsbyprice(this.pprice);
		
	}
	
}
