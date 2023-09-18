package main.securityConfig;

import java.io.IOException;

import main.repository.UsuarioRepository;
import main.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SecurityFilter extends OncePerRequestFilter{
@Autowired
private TokenService tokenService;
@Autowired
private UsuarioRepository usuarioRepository;

@Override
protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {
    var token = recoverToken(request);
    System.out.println(token);
    if(token != null) {
        var login = tokenService.validarToken(token);
        UserDetails user = usuarioRepository.findByEmail(login);
        var authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
    filterChain.doFilter(request, response);
}

	private String recoverToken(HttpServletRequest httpServletRequest) {
		var authHeader = "";
		 authHeader = httpServletRequest.getHeader("Authorization");
		System.out.println(authHeader);
		if(authHeader == null) return null;
		return authHeader.replace("Bearer ", "");
	}
}
