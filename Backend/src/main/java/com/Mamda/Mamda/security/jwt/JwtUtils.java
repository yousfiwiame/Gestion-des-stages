package com.Mamda.Mamda.security.jwt;

import java.security.Key;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import com.Mamda.Mamda.security.services.UserDetailsImpl;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtils {
    private static final Logger logger = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${mamdamcma.app.jwtSecret}")
    private String jwtSecret;

    @Value("${mamdamcma.app.jwtExpirationMs}")
    private int jwtExpirationMs;

    public String generateJwtToken(Authentication authentication) {
      UserDetailsImpl userPrincipal = (UserDetailsImpl) authentication.getPrincipal();

      List<String> roles = userPrincipal.getAuthorities().stream()
              .map(GrantedAuthority::getAuthority)
              .collect(Collectors.toList());

      logger.info("Generating token for user: {}", userPrincipal.getEmail());
      logger.info("User roles: {}", roles);

      String token = Jwts.builder()
              .setSubject(userPrincipal.getEmail())
              .claim("roles", roles)
              .setIssuedAt(new Date())
              .setExpiration(new Date((new Date()).getTime() + jwtExpirationMs))
              .signWith(key(), SignatureAlgorithm.HS256)
              .compact();

      logger.info("Token generated successfully");
      return token;
  }

  private Key key() {
      return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
  }

  public String getUserNameFromJwtToken(String token) {
      return Jwts.parserBuilder()
              .setSigningKey(key())
              .build()
              .parseClaimsJws(token)
              .getBody()
              .getSubject();
  }

    public boolean validateJwtToken(String authToken) {
        try {
            // Use parseClaimsJws instead of parse
            Jwts.parserBuilder()
                .setSigningKey(key())
                .build()
                .parseClaimsJws(authToken);
            logger.info("JWT token validation successful");
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        } catch (Exception e) {
            logger.error("JWT validation error: {}", e.getMessage());
        }
        return false;
    }

    // Add method to extract roles from token
    public List<String> getRolesFromJwtToken(String token) {
        Claims claims = Jwts.parserBuilder()
                           .setSigningKey(key())
                           .build()
                           .parseClaimsJws(token)
                           .getBody();
        
        @SuppressWarnings("unchecked")
        List<String> roles = (List<String>) claims.get("roles");
        return roles;
    }
}