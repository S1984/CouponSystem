package webFacade;

import java.util.Collection;
import java.util.HashSet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.GenericEntity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import core.Facade.AdminFacade;
import core.Facade.CompanyFacade;
import core.Facade.CouponClientFacade;
import core.Facade.CustomerFacade;
import core.beans.ClientType;
import core.beans.Coupon;
import core.beans.CouponType;
import core.exceptions.CouponSystemException;
import login.LoginCheck;
import system.CouponSystem;
import webBeans.WebCoupon;

@Path("customer")
public class CustomerResource {

	@Context
	private HttpServletRequest request;
	@Context
	private HttpServletResponse response;

	/**
	 * this method returns a facade if the session is alive,
	 * if the session is invalid it try's to do an auto login with the cookies data.
	 * if the login failed(auto login), it returns null
	 * or if your not with an customer facade, it returns null 
	 * @return
	 */
	private CustomerFacade getFacade() {
		if (request.getSession().isNew()) {
			if (LoginCheck.login(request, response).isLoginSuccessful() != true) {
				return null;
			}
		}
		Object facade = (CouponClientFacade) request.getSession().getAttribute("facade");
		if ((facade instanceof CustomerFacade))
			return (CustomerFacade) facade;
		else
			return null;
	}

	@POST
	@Path("purchasecoupon")
	public Response purchaseCoupon(WebCoupon webCoupon) {
		CustomerFacade facade = getFacade();
		if (facade == null) {
			return Response.ok("press 'Switch User' to login").status(550).build();
		}
		Coupon coupon = webCoupon.convertToCoupon();
		try {
			facade.purchaseCoupon(coupon);

		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		}
		return Response.ok(coupon.getTitle() + ", was purchased").status(200).build();

	}

	@GET
	@Path("getallpurchasedcoupons")
	public Response getAllPurchasedCoupons() {
		CustomerFacade facade = getFacade();
		if (facade == null) {
			return Response.ok("press 'Switch User' to login").status(550).build();
		}
		Collection<Coupon> allCoupons = null;
		Collection<WebCoupon> allWebCoupon = null;
		GenericEntity<Collection<WebCoupon>> entity;
		try {
			allCoupons = facade.getAllPurchasedCoupons();
			allWebCoupon = new HashSet<>();
			for (Coupon currntCoupon : allCoupons) {
				allWebCoupon.add(new WebCoupon(currntCoupon));
			}
			entity = new GenericEntity<Collection<WebCoupon>>(allWebCoupon) {
			};
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		} catch (NullPointerException e) {
			return Response.ok("No coupons were purchased").status(500).build();
		}
		return Response.ok(entity).status(200).build();
		// return Response.ok("check").status(500).build();
	}

	@GET
	@Path("getallpurchasedcouponsbytype/{pcoupontype}")
	public Response getAllPurchasedCouponsByType(@PathParam("pcoupontype") String strCoupontype) {
		CouponType coupontype = CouponType.valueOf(strCoupontype);
		CustomerFacade facade = getFacade();
		if (facade == null) {
			return Response.ok("press 'Switch User' to login").status(550).build();
		}
		Collection<Coupon> allCoupons = null;
		Collection<WebCoupon> allWebCoupon = null;
		GenericEntity<Collection<WebCoupon>> entity;

		try {
			allCoupons = facade.getAllPurchasedCouponsByType(coupontype);
			allWebCoupon = new HashSet<>();
			for (Coupon currntCoupon : allCoupons) {
				allWebCoupon.add(new WebCoupon(currntCoupon));
			}
			entity = new GenericEntity<Collection<WebCoupon>>(allWebCoupon) {
			};
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		} catch (NullPointerException e) {
			return Response.ok("No coupons under the type specified were purchased ").status(500).build();
		}
		return Response.ok(entity).status(200).build();
	}

	@GET
	@Path("getallpurchasedcouponsbyprice/{pprice}")
	public Response getAllPurchasedCouponsByPrice(@PathParam("pprice") double price) {
		CustomerFacade facade = getFacade();
		if (facade == null) {
			return Response.ok("press 'Switch User' to login").status(550).build();
		}
		Collection<Coupon> allCoupons = null;
		Collection<WebCoupon> allWebCoupon = null;
		GenericEntity<Collection<WebCoupon>> entity;

		try {
			allCoupons = facade.getAllPurchasedCouponsByPrice(price);
			allWebCoupon = new HashSet<>();
			for (Coupon currntCoupon : allCoupons) {
				allWebCoupon.add(new WebCoupon(currntCoupon));
			}
			entity = new GenericEntity<Collection<WebCoupon>>(allWebCoupon) {
			};
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		} catch (NullPointerException e) {
			return Response.ok("No coupons below the price specified were purchased ").status(500).build();
		}
		return Response.ok(entity).status(200).build();
	}

	@GET
	@Path("getAvailableCouponToPurchase")
	public Response getAvailableCouponToPurchase() {
		CustomerFacade facade = getFacade();
		if (facade == null) {
			return Response.ok("press 'Switch User' to login").status(550).build();
		}
		Collection<Coupon> allCoupons = null;
		Collection<WebCoupon> allWebCoupon = null;
		GenericEntity<Collection<WebCoupon>> entity;

		try {
			allCoupons = facade.getAvailableCouponToPurchase();
			allWebCoupon = new HashSet<>();
			for (Coupon currntCoupon : allCoupons) {
				allWebCoupon.add(new WebCoupon(currntCoupon));
			}
			entity = new GenericEntity<Collection<WebCoupon>>(allWebCoupon) {
			};
		} catch (CouponSystemException e) {
			return Response.ok(e.getMessage()).status(500).build();
		} catch (NullPointerException e) {
			return Response.ok("There are no coupons avilable for purchase at this time").status(500).build();
		}
		return Response.ok(entity).status(200).build();
	}

	@GET
	@Path("getcustomername")
	public Response getCustomerName() {

		CustomerFacade facade = getFacade();
		if (facade == null) {
			return Response.ok("press 'Switch User' to login").status(550).build();
		}

		return Response.ok(facade.getCustomerName()).status(200).build();
	}
}
