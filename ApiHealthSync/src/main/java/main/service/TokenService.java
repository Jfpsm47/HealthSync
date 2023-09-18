package main.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import main.model.user.Usuario;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;


@Service
public class TokenService {

@Value("${api.security.token.secret}")
private String chave;

public String generateToken(Usuario user) {
	try {
		Algorithm algoritmo = Algorithm.HMAC256(chave);
		return JWT.create()
				.withIssuer("TokenGerenciador")
				.withSubject(user.getLogin())
				.withExpiresAt(ExpirationToken())
				.sign(algoritmo);
	}catch(JWTCreationException e) {
		throw new RuntimeException("Erro ao gerar o token", e);
	}
}

public String validarToken(String token) {
//	System.out.println("O token chegou em TokenService.validarToken()");
//	if(token == null) {
//		System.out.println("O token chegou nulo");
//	}
	try {
		Algorithm algoritmo = Algorithm.HMAC256(chave);
		//System.out.println("Token em TokenService.ValidarToken() : " +token);
		return JWT.require(algoritmo)
				.withIssuer("TokenGerenciador")
				.build()
				.verify(token)
				.getSubject();
	}catch (JWTVerificationException e) {
		System.out.println("Ocorreu exception em validar o token");
		return "";
	}
}

public Instant ExpirationToken() {
	return LocalDateTime.now().plusHours(2).toInstant(ZoneOffset.of("-04:00"));
}
}