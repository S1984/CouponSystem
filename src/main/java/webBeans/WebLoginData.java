package webBeans;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
//WebLoginData - holds the path to forward and the login state(success or fail)
public class WebLoginData implements Serializable {
	private static final long serialVersionUID = 1L;
	private String path;
	private boolean loginSuccessful;

	public WebLoginData(String path, boolean loginSuccessful) {
		super();
		this.path = path;
		this.loginSuccessful = loginSuccessful;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public boolean isLoginSuccessful() {
		return loginSuccessful;
	}

	public void setLoginSuccessful(boolean loginSuccessful) {
		this.loginSuccessful = loginSuccessful;
	}

}
