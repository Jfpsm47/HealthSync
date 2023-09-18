package main.controller;

import java.util.List;

import main.model.user.Usuario;
import main.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import main.service.TokenService;

@RestController
@RequestMapping("/auth/")
public class AutenticationController {

	@Autowired
	private UsuarioRepository repository;

	//É necessário que haja um bean (bean é de nível método) com essa interface abaixo
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private TokenService tokenService;

	@PostMapping("register")
	public ResponseEntity register(@RequestBody Usuario user) {
		if (this.repository.findByEmail(user.getUsername()) != null) {
			return ResponseEntity.badRequest().body("Esse email já está sendo usado");
		}
		String encrypPassword = new BCryptPasswordEncoder().encode(user.getPassword());
		System.out.println("Email: "+user.getEmail());
		user.setSenha(encrypPassword);
		repository.save(user);
		System.out.println("Login: "+user.getUsername());
		System.out.println("Senha: "+user.getPassword());
		return ResponseEntity.ok().build();
	}

	@PostMapping("login")
	public ResponseEntity login(@RequestBody Usuario user) {
		var password = new BCryptPasswordEncoder().encode(user.getPassword());
		System.out.println("Usuário recebido:");
		System.out.println("Login: "+user.getUsername());
		System.out.println("Senha: "+password);
		var usernamePassword = new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword());
		var auth = authenticationManager.authenticate(usernamePassword);
		String token = tokenService.generateToken(user);
		return ResponseEntity.ok(token);
	}
	@GetMapping()
	public List<?> getUsers(){
		return repository.findAll();
	}

}