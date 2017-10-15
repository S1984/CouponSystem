var module = angular.module("facade");

module.controller("CompanyCreateCoupon", CompanyCreateCouponCtrlCtor)

function CompanyCreateCouponCtrlCtor(CreateCouponSrvc,$scope) {
	
	
	this.newCoupon = CreateCouponSrvc.newCoupon;
	this.messageFromNewCoupon = CreateCouponSrvc.messageFromNewCoupon;
	this.createCouponSucceed = CreateCouponSrvc.createCouponSucceed;
	this.createCoupon = function() {
		CreateCouponSrvc.createCoupon();
	}
}