package main.model.user;

import java.io.Serializable;
import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Usuario implements UserDetails, Serializable{
@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
private long idUser;
private String login;
private String senha;
private String email;

public Usuario() {
	super();
}

public String getEmail() {
	return email;
}

public void setEmail(String email) {
	this.email = email;
}

public long getIdUser() {
	return idUser;
}

public void setIdUser(long idUser) {
	this.idUser = idUser;
}

public String getLogin() {
	return login;
}

public void setLogin(String login) {
	this.login = login;
}

public String getSenha() {
	return senha;
}

public void setSenha(String senha) {
	this.senha = senha;
}

@Override
public Collection<? extends GrantedAuthority> getAuthorities() {
	// TODO Auto-generated method stub
	return null;
}

@Override
public String getPassword() {
	// TODO Auto-generated method stub
	return senha;
}

@Override
public String getUsername() {
	// TODO Auto-generated method stub
	return email;
}

@Override
public boolean isAccountNonExpired() {
	// TODO Auto-generated method stub
	return true;
}

@Override
public boolean isAccountNonLocked() {
	// TODO Auto-generated method stub
	return true;
}

@Override
public boolean isCredentialsNonExpired() {
	// TODO Auto-generated method stub
	return true;
}

@Override
public boolean isEnabled() {
	// TODO Auto-generated method stub
	return true;
}
}
