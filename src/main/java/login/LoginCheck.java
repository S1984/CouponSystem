package login;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import core.Facade.AdminFacade;
import core.Facade.CompanyFacade;
import core.Facade.CouponClientFacade;
import core.Facade.CustomerFacade;
import core.beans.ClientType;
import core.exceptions.CouponSystemException;
import system.CouponSystem;
import webBeans.WebLoginData;

@WebServlet(name = "LoginCheck", urlPatterns = { "/LoginCheck" })
public class LoginCheck extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private final static int maxAge = 60 * 60 * 24 * 14;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		WebLoginData loginData  = login(request, response);
		String encodedPath;
		encodedPath = response.encodeRedirectURL(loginData.getPath());
		RequestDispatcher rd = getServletContext().getRequestDispatcher(encodedPath);
		rd.forward(request, response);

	}

	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	public static void createCookies(HttpServletResponse response, String userType, String userName, String userPassword) {
		Cookie ckType = new Cookie("userType", userType);
		Cookie ckUser = new Cookie("userName", userName);
		Cookie ckPass = new Cookie("userPassword", userPassword);
		ckType.setMaxAge(maxAge);
		ckUser.setMaxAge(maxAge);
		ckPass.setMaxAge(maxAge);
		response.addCookie(ckType);
		response.addCookie(ckUser);
		response.addCookie(ckPass);
	}

	public  static String getCookieValue(HttpServletRequest request, String name) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (name.equals(cookie.getName())) {
					return cookie.getValue();
				}
			}
		}
		return null;
	}
	/**
	 * 
	 * @param request
	 * @param response
	 * @return WebLoginData - holds the path to forward and the login state(success or fail)
	 */
	public static WebLoginData login(HttpServletRequest request , HttpServletResponse response) {
		WebLoginData loginData = new WebLoginData("/failedLogin.html", false);
		
		String userName = request.getParameter("userName");
		String userPassword = request.getParameter("userPassword");
		String userType = request.getParameter("userType");
		
		if(userType==null&&userName==null&&userPassword==null)
		{
			 userName = getCookieValue(request, "userName");
			 userPassword = getCookieValue(request, "userPassword");
			 userType = getCookieValue(request, "userType");
		}
		if(userType==null&&userName==null&&userPassword==null)
		{
			return loginData;
		}
		
		CouponClientFacade facade = null;
		switch (userType) {
		case "customer":
			try {
				facade = CouponSystem.getInstance().login(userName, userPassword, ClientType.CUSTOMER);
				loginData.setPath("/customer");
				loginData.setLoginSuccessful(true);
			} catch (CouponSystemException e) {
				// TODO: send to logger
			}
			break;
		case "company":
			try {
				facade = CouponSystem.getInstance().login(userName, userPassword, ClientType.COMPANY);
				loginData.setPath("/company");
				loginData.setLoginSuccessful(true);
			} catch (CouponSystemException e) {
				// TODO: send to logger
			}
			break;
		case "admin":
			try {
				facade = CouponSystem.getInstance().login(userName, userPassword, ClientType.ADMINISTRATOR);
				loginData.setPath("/admin");
				loginData.setLoginSuccessful(true);
			} catch (CouponSystemException e) {
				// TODO: send to logger
			}
			break;
		}
		if (loginData.isLoginSuccessful()) {
			request.getSession().setAttribute("facade", facade);
			createCookies(response, userType, userName, userPassword);
		}
		return loginData;
	}

}
