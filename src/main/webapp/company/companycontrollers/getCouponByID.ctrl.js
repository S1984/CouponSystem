var module = angular.module("facade");

module.controller("CompanyGetAllCouponsByID", CompanyGetAllCouponsByIDCtrlCtor)

function CompanyGetAllCouponsByIDCtrlCtor(GetCouponSrvc, GetAllCouponsSrvc,
		updateCouponSrvc, deleteCouponSrvc) {
	// get all
	this.coupons = GetAllCouponsSrvc.coupons;
	this.messageGetAllCoupons = GetAllCouponsSrvc.messageGetAllCoupons;
	this.getAllCouponsFailed = GetAllCouponsSrvc.getAllCouponsFailed;
	// byID
	this.coupon = GetCouponSrvc.coupon;
	this.messageGetCoupon = GetCouponSrvc.messageGetCoupon;
	this.getCouponSucceed = GetCouponSrvc.getCouponSucceed;
	// delete
	this.messageFromDeleteCoupon = deleteCouponSrvc.messageFromDeleteCoupon;
	this.deleteCouponSucceed = deleteCouponSrvc.deleteCouponSucceed;
	this.deleteCouponFailed = deleteCouponSrvc.deleteCouponFailed;
	//update
	 this.messageFromUpdateCoupon = updateCouponSrvc.messageFromUpdateCoupon;
     this.updateCouponSucceed = updateCouponSrvc.updateCouponSucceed;
     this.updateCouponFailed = updateCouponSrvc.updateCouponFailed;

	this.initDropList = function() {
		this.updateCouponFailed.flag = false;
		this.updateCouponSucceed.flag = false;
		this.deleteCouponSucceed.flag  = false;
		this.deleteCouponFailed.flag = false;
		GetAllCouponsSrvc.getAllCoupons("getallcoupons");
	}

	this.getById = function(id) {
		GetCouponSrvc.getCoupon(id);
	}

	this.updateCoupon = function(coup) {
		updateCouponSrvc.updateCoupon(coup);
	}
	this.deleteCoupon = function(coupId) {
		deleteCouponSrvc.deleteCoupon(coupId);

	}

}
