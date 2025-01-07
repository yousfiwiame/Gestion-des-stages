package com.Mamda.Mamda.security.jwt;

import java.io.IOException;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.Mamda.Mamda.security.services.UserDetailsServiceImpl;

public class AuthTokenFilter extends OncePerRequestFilter {
  @Autowired
  private JwtUtils jwtUtils;

  @Autowired
  private UserDetailsServiceImpl userDetailsService;

  private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

  private String parseJwt(HttpServletRequest request) {
      String headerAuth = request.getHeader("Authorization");
  
      if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
          return headerAuth.substring(7);
      }
  
      return null;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
      try {
          // Log the request URL and headers
          logger.info("Processing request for URL: " + request.getRequestURI());
          logger.info("Authorization header: " + request.getHeader("Authorization"));
        
          String jwt = parseJwt(request);
          logger.info("Parsed JWT Token: " + jwt);
  
          if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
              String username = jwtUtils.getUserNameFromJwtToken(jwt);
              logger.info("JWT Token is valid. Username: " + username);
  
              UserDetails userDetails = userDetailsService.loadUserByUsername(username);
              logger.info("Loaded UserDetails: " + userDetails.getUsername());
              logger.info("User Authorities: " + userDetails.getAuthorities());
              
              UsernamePasswordAuthenticationToken authentication =
                  new UsernamePasswordAuthenticationToken(
                      userDetails,
                      null,
                      userDetails.getAuthorities());
              authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
  
              SecurityContextHolder.getContext().setAuthentication(authentication);
              logger.info("Authentication set in SecurityContext");
          } else {
              logger.info("JWT Token is null or invalid");
          }
      } catch (Exception e) {
          logger.error("Cannot set user authentication: {}", e.getMessage(), e);
      }
  
      filterChain.doFilter(request, response);
  }

}
