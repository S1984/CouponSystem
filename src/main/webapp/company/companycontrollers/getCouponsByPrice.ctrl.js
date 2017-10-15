var module = angular.module("facade");

module.controller("CompanyGetByPrice", CompanyGetByPriceCtrlCtor)

function CompanyGetByPriceCtrlCtor(GetCouponByPriceSrvc, updateCouponSrvc,GetAllCouponsSrvc,
		deleteCouponSrvc) {

	//getall
	this.coupDropList = GetAllCouponsSrvc.coupons;
	this.messageGetAllCoupons = GetAllCouponsSrvc.messageGetAllCoupons;
	this.getAllCouponsFailed = GetAllCouponsSrvc.getAllCouponsFailed;
	//byprice
	this.coupons = GetCouponByPriceSrvc.coupons;
	this.edits = GetCouponByPriceSrvc.edits;
	this.messageGetByPrice = GetCouponByPriceSrvc.messageGetByPrice;
	this.getByPriceSucceed = GetCouponByPriceSrvc.getByPriceSucceed;
	// delete
	this.messageFromDeleteCoupon = deleteCouponSrvc.messageFromDeleteCoupon;
	this.deleteCouponSucceed = deleteCouponSrvc.deleteCouponSucceed;
	this.deleteCouponFailed = deleteCouponSrvc.deleteCouponFailed;
	//update
	this.messageFromUpdateCoupon = updateCouponSrvc.messageFromUpdateCoupon;
    this.updateCouponSucceed = updateCouponSrvc.updateCouponSucceed;
    this.updateCouponFailed = updateCouponSrvc.updateCouponFailed;
    //byprice
    this.getCoupons = function(plimit) {
    	this.initDropList();
    	GetCouponByPriceSrvc.getCoupons(plimit);
    }
    
    // delete
    this.deleteCoupon = function(coupId) {
    	deleteCouponSrvc.deleteCoupon(coupId);
    }
    
    //update
    this.editFunc = function(coup, index) {
		if (this.edits[index]) {
			updateCouponSrvc.updateCoupon(coup);
		}
		this.edits[index] = !this.edits[index];
	}
	
	
	this.initDropList = function() {
		this.updateCouponFailed.flag = false;
		this.updateCouponSucceed.flag = false;
		this.deleteCouponSucceed.flag  = false;
		this.deleteCouponFailed.flag = false;
		GetAllCouponsSrvc.getAllCoupons("getallcoupons");
	}

	

}