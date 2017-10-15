var module = angular.module("facade");

module.controller("CompanyGetAllCoupons", CompanyGetAllCouponsCtrlCtor)

function CompanyGetAllCouponsCtrlCtor(GetAllCouponsSrvc, updateCouponSrvc,
		deleteCouponSrvc) {

	this.coupp = {};
	this.path;
	this.coupons = GetAllCouponsSrvc.coupons;
	this.edits = GetAllCouponsSrvc.edits;
	this.messageGetAllCoupons = GetAllCouponsSrvc.messageGetAllCoupons;
	this.getAllCouponsFailed = GetAllCouponsSrvc.getAllCouponsFailed;
	// delete
	this.messageFromDeleteCoupon = deleteCouponSrvc.messageFromDeleteCoupon;
	this.deleteCouponSucceed = deleteCouponSrvc.deleteCouponSucceed;
	this.deleteCouponFailed = deleteCouponSrvc.deleteCouponFailed;
	// update
	this.messageFromUpdateCoupon = updateCouponSrvc.messageFromUpdateCoupon;
	this.updateCouponSucceed = updateCouponSrvc.updateCouponSucceed;
	this.updateCouponFailed = updateCouponSrvc.updateCouponFailed;

	/** ********update*************** */
	//this function manages show/edit at the html page by index 
    //and calls the update service
	this.editFunc = function(coup, index) {
		if (this.edits[index]) {
			updateCouponSrvc.updateCoupon(coup);
		}
		this.edits[index] = !this.edits[index];
	}
	this.deleteCoupon = function(coupId) {
		deleteCouponSrvc.deleteCoupon(coupId);
	}
	this.getMethod = function(method) {

		switch (method) {
		case "all":
			this.path = "getallcoupons";
			break;
		case "type":
			this.path = "getcouponbytype/" + this.coupp.type;
			break;
		case "date":
			this.path = "getcouponbydatelimit/" + this.coupp.date.getTime();
			break;
		default:
			this.path = "getallcoupons";
			break;
		}

		this.resetFlag();
		GetAllCouponsSrvc.getAllCoupons(this.path);
	}
    //we call this function in order to show the relative error or success 

	this.resetFlag = function() {
		this.updateCouponFailed.flag = false;
		this.updateCouponSucceed.flag = false;
		this.deleteCouponSucceed.flag = false;
		this.deleteCouponFailed.flag = false;
	}

}