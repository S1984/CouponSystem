package login;

import java.io.IOException;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class Logout extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getSession().invalidate();
		this.removeCookies(response);
		String path = "/CouponSystemPart2B/";
		response.sendRedirect(path);
	}
	
	public void removeCookies(HttpServletResponse response){
		Cookie ckType = new Cookie("userType", "");
		Cookie ckUser = new Cookie("userName", "");
		Cookie ckPass = new Cookie("userPassword", "");
		Cookie ckJSESSIONID = new Cookie("JSESSIONID", "");
		ckType.setMaxAge(0);
		ckUser.setMaxAge(0);
		ckPass.setMaxAge(0);
		ckJSESSIONID.setMaxAge(0);
		response.addCookie(ckType);  
		response.addCookie(ckUser);  
		response.addCookie(ckPass); 
		response.addCookie(ckJSESSIONID); 
	}

}
