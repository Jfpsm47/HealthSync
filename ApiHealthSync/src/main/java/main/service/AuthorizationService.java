package main.service;

import main.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class AuthorizationService implements UserDetailsService{
	@Autowired
	private UsuarioRepository repository;
		@Override
		public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
			System.out.println(email);
			return repository.findByEmail(email);
		}
}